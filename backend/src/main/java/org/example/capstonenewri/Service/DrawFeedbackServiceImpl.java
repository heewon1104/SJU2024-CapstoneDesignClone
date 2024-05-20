package org.example.capstonenewri.Service;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.ComprehensiveInfo.RequestFeedbackToLLMDto;
import org.example.capstonenewri.Dto.ComprehensiveInfo.DietDto;
import org.example.capstonenewri.Dto.ComprehensiveInfo.UserDRIDto;
import org.example.capstonenewri.Dto.ComprehensiveInfo.UserDiseaseInfoDto;
import org.example.capstonenewri.Dto.FoodNutritionDto;
import org.example.capstonenewri.Dto.RequestRecipeRecommendationToLLMDto;
import org.example.capstonenewri.Dto.ResponseFeedbackFromLLMDto;
import org.example.capstonenewri.Dto.ResponseRecipeRecommendationDto;
import org.example.capstonenewri.Entity.DayDiary;
import org.example.capstonenewri.Entity.Diet;
import org.example.capstonenewri.Entity.DietDiary;
import org.example.capstonenewri.Entity.Member;
import org.example.capstonenewri.Repository.DayDiaryRepository;
import org.example.capstonenewri.Repository.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class DrawFeedbackServiceImpl implements DrawFeedbackService {

    private final RestTemplate restTemplate;
    private final MemberRepository memberRepository;
    private final DayDiaryRepository dayDiaryRepository;

    @Value("${flask.url}")  // AI 서버 주소
    private String url;
    private final String endPoint1 = "/feedback"; // URI
    private final String endPoint2 = "/recipe_recommendation"; // URI

    @Override
    public void drawFeedback(List<Diet> dietList, String email) {
        // dietList가 비어 있는지 확인
        if (dietList.isEmpty()) {
            throw new IllegalArgumentException("식단 리스트는 비어 있을 수 없습니다.");
        }

        // dietList 에서 음식과 재료만 추출해 List<DietDto> 로 변환
        List<DietDto> diets = convertToDietDtoList(dietList);
        // List<Diet>를 이용해 레포지토리에서 List<DietDiary>에서 List<FoodNutritionDto>를 뽑아야 함
        List<FoodNutritionDto> dietDiaries = extractDietDiariesFromDiets(dietList);
        // email로 Member 객체 가져오기
        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        if (!memberOptional.isPresent()) { // 오류처리
            throw new IllegalStateException("해당 이메일을 가진 회원을 찾을 수 없습니다: " + email);
        }

        Member member = memberOptional.get();
        UserDiseaseInfoDto diseaseInfo = getDiseaseInfoBy(member); // member 객체로 질병 정보
        UserDRIDto dri = getDRIInfoBy(member); // member 객체로 dri 정보

        LocalDate dateOfDiet = dietList.get(0).getIntakeTime().toLocalDate();

        // DayDiary 업데이트 또는 생성 후 FoodNutritionDto 변환
        DayDiary updatedDayDiary = updateOrCreateDayDiary(member, dateOfDiet, dietDiaries);
        FoodNutritionDto foodNutritionDto = convertDayDiaryToFoodNutritionDto(updatedDayDiary);

        RequestFeedbackToLLMDto feeback_Dto = RequestFeedbackToLLMDto.builder() // dto for post request to LLM server point
                .diets(diets)
                .dietDiaries(dietDiaries)
                .diseaseInfo(diseaseInfo)
                .dri(dri)
                .dayDiary(foodNutritionDto).build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<RequestFeedbackToLLMDto> entity1 = new HttpEntity<>(feeback_Dto, headers);

        ResponseEntity<ResponseFeedbackFromLLMDto> feedback_response = restTemplate.exchange( // restTemplate -> 요청
                url + endPoint1,
                HttpMethod.POST, // 요청 타입
                entity1,
                ResponseFeedbackFromLLMDto.class);

        updatedDayDiary.setFeedback(feedback_response.getBody().getFeedback());

        System.out.println("feedback_response = " + feedback_response.getBody().getFeedback());

        dayDiaryRepository.save(updatedDayDiary); // dayDiary 저장

        RequestRecipeRecommendationToLLMDto recommendation_dto = RequestRecipeRecommendationToLLMDto.builder()
                .feedback(feedback_response.getBody().getFeedback())
                .dietary_guideline(member.getDietary_guideline())
                .diseaseInfo(diseaseInfo)
                .build();

        HttpEntity<RequestRecipeRecommendationToLLMDto> entity2 = new HttpEntity<>(recommendation_dto, headers);

        ResponseEntity<ResponseRecipeRecommendationDto> recipes = restTemplate.exchange(
                url + endPoint2,
                HttpMethod.POST,
                entity2,
                ResponseRecipeRecommendationDto.class);

        System.out.println("recipes = " + recipes.getBody().getRecipes());

    }

    public List<DietDto> convertToDietDtoList(List<Diet> dietList) {
        return dietList.stream()
                .map(diet -> {
                    // 대괄호를 제거하고 쉼표로 구분된 재료 문자열을 List<String>으로 변환
                    String ingredients = diet.getIngredients().replaceAll("[\\[\\]]", ""); // 대괄호 제거
                    List<String> ingredientsList = Arrays.asList(ingredients.split(",\\s*"));
                    return DietDto.builder()
                            .food(diet.getFood())
                            .ingredients(ingredientsList)
                            .build();
                })
                .collect(Collectors.toList());
    }

    public List<FoodNutritionDto> extractDietDiariesFromDiets(List<Diet> dietList) {
        return dietList.stream()
                .map(diet -> {
                    DietDiary dietDiary = diet.getDietDiary();
                    return FoodNutritionDto.builder()
                            .energy_kcal(dietDiary.getEnergy_kcal())
                            .water_gram(dietDiary.getWater_gram())
                            .protein_gram(dietDiary.getProtein_gram())
                            .fat_gram(dietDiary.getFat_gram())
                            .ashcontent_gram(dietDiary.getAshcontent_gram())
                            .carbohydrate_gram(dietDiary.getCarbohydrate_gram())
                            .sugars_gram(dietDiary.getSugars_gram())
                            .dietary_fiber_gram(dietDiary.getDietary_fiber_gram())
                            .calcium_miligram(dietDiary.getCalcium_miligram())
                            .iron_miligram(dietDiary.getIron_miligram())
                            .phosphorus_miligram(dietDiary.getPhosphorus_miligram())
                            .potassium_miligram(dietDiary.getPotassium_miligram())
                            .sodium_miligram(dietDiary.getSodium_miligram())
                            .vitaminA_microgram(dietDiary.getVitaminA_microgram())
                            .retinol_microgram(dietDiary.getRetinol_microgram())
                            .betaCarotene_microgram(dietDiary.getBetaCarotene_microgram())
                            .thiamin_miligram(dietDiary.getThiamin_miligram())
                            .riboflavin_miligram(dietDiary.getRiboflavin_miligram())
                            .niacin_miligram(dietDiary.getNiacin_miligram())
                            .vitaminC_miligram(dietDiary.getVitaminC_miligram())
                            .vitaminD_microgram(dietDiary.getVitaminD_microgram())
                            .cholesterol_miligram(dietDiary.getCholesterol_miligram())
                            .saturated_fatty_acids_gram(dietDiary.getSaturated_fatty_acids_gram())
                            .trans_fatty_acids_gram(dietDiary.getTrans_fatty_acids_gram())
                            .build();
                }).collect(Collectors.toList());
    }

    public UserDiseaseInfoDto getDiseaseInfoBy(Member member) {
        UserDiseaseInfoDto userDiseaseInfoDto = UserDiseaseInfoDto.builder()
                .dietary_guideline(member.getDietary_guideline())
                .build();
        return userDiseaseInfoDto;
    }

    public UserDRIDto getDRIInfoBy(Member member) {
        UserDRIDto userDRIDto = UserDRIDto.builder()
                .energy_kcal(member.getDri().getEnergy_kcal())
                .water_gram(member.getDri().getWater_gram())
                .protein_gram(member.getDri().getProtein_gram())
                .fat_gram(member.getDri().getFat_gram())
                .ashcontent_gram(member.getDri().getAshcontent_gram())
                .carbohydrate_gram(member.getDri().getCarbohydrate_gram())
                .sugars_gram(member.getDri().getSugars_gram())
                .dietary_fiber_gram(member.getDri().getDietary_fiber_gram())
                .calcium_miligram(member.getDri().getCalcium_miligram())
                .iron_miligram(member.getDri().getIron_miligram())
                .phosphorus_miligram(member.getDri().getPhosphorus_miligram())
                .potassium_miligram(member.getDri().getPotassium_miligram())
                .sodium_miligram(member.getDri().getSodium_miligram())
                .vitaminA_microgram(member.getDri().getVitaminA_microgram())
                .retinol_microgram(member.getDri().getRetinol_microgram())
                .betaCarotene_microgram(member.getDri().getBetaCarotene_microgram())
                .thiamin_miligram(member.getDri().getThiamin_miligram())
                .riboflavin_miligram(member.getDri().getRiboflavin_miligram())
                .niacin_miligram(member.getDri().getNiacin_miligram())
                .vitaminC_miligram(member.getDri().getVitaminC_miligram())
                .vitaminD_microgram(member.getDri().getVitaminD_microgram())
                .cholesterol_miligram(member.getDri().getCholesterol_miligram())
                .saturated_fatty_acids_gram(member.getDri().getSaturated_fatty_acids_gram())
                .trans_fatty_acids_gram(member.getDri().getTrans_fatty_acids_gram())
                .build();
        return userDRIDto;
    }

    public FoodNutritionDto convertDayDiaryToFoodNutritionDto(DayDiary dayDiary) {
        return FoodNutritionDto.builder()
                .energy_kcal(dayDiary.getEnergy_kcal())
                .water_gram(dayDiary.getWater_gram())
                .protein_gram(dayDiary.getProtein_gram())
                .fat_gram(dayDiary.getFat_gram())
                .ashcontent_gram(dayDiary.getAshcontent_gram())
                .carbohydrate_gram(dayDiary.getCarbohydrate_gram())
                .sugars_gram(dayDiary.getSugars_gram())
                .dietary_fiber_gram(dayDiary.getDietary_fiber_gram())
                .calcium_miligram(dayDiary.getCalcium_miligram())
                .iron_miligram(dayDiary.getIron_miligram())
                .phosphorus_miligram(dayDiary.getPhosphorus_miligram())
                .potassium_miligram(dayDiary.getPotassium_miligram())
                .sodium_miligram(dayDiary.getSodium_miligram())
                .vitaminA_microgram(dayDiary.getVitaminA_microgram())
                .retinol_microgram(dayDiary.getRetinol_microgram())
                .betaCarotene_microgram(dayDiary.getBetaCarotene_microgram())
                .thiamin_miligram(dayDiary.getThiamin_miligram())
                .riboflavin_miligram(dayDiary.getRiboflavin_miligram())
                .niacin_miligram(dayDiary.getNiacin_miligram())
                .vitaminC_miligram(dayDiary.getVitaminC_miligram())
                .vitaminD_microgram(dayDiary.getVitaminD_microgram())
                .cholesterol_miligram(dayDiary.getCholesterol_miligram())
                .saturated_fatty_acids_gram(dayDiary.getSaturated_fatty_acids_gram())
                .trans_fatty_acids_gram(dayDiary.getTrans_fatty_acids_gram())
                .build();
    }

    private DayDiary updateOrCreateDayDiary(Member member, LocalDate date, List<FoodNutritionDto> dietDiaries) {
        Optional<DayDiary> dayDiaryOptional = dayDiaryRepository.findByMemberAndDate(member, date);

        DayDiary dayDiary = dayDiaryOptional.orElseGet(() -> DayDiary.builder() // 생성된 dayDiary가 없을때 (Optional.empty()) orElseGet 메서드로 dayDiary생성
                .energy_kcal(BigDecimal.ZERO)
                .water_gram(BigDecimal.ZERO)
                .protein_gram(BigDecimal.ZERO)
                .fat_gram(BigDecimal.ZERO)
                .ashcontent_gram(BigDecimal.ZERO)
                .carbohydrate_gram(BigDecimal.ZERO)
                .sugars_gram(BigDecimal.ZERO)
                .dietary_fiber_gram(BigDecimal.ZERO)
                .calcium_miligram(BigDecimal.ZERO)
                .iron_miligram(BigDecimal.ZERO)
                .phosphorus_miligram(BigDecimal.ZERO)
                .potassium_miligram(BigDecimal.ZERO)
                .sodium_miligram(BigDecimal.ZERO)
                .vitaminA_microgram(BigDecimal.ZERO)
                .retinol_microgram(BigDecimal.ZERO)
                .betaCarotene_microgram(BigDecimal.ZERO)
                .thiamin_miligram(BigDecimal.ZERO)
                .riboflavin_miligram(BigDecimal.ZERO)
                .niacin_miligram(BigDecimal.ZERO)
                .vitaminC_miligram(BigDecimal.ZERO)
                .vitaminD_microgram(BigDecimal.ZERO)
                .cholesterol_miligram(BigDecimal.ZERO)
                .saturated_fatty_acids_gram(BigDecimal.ZERO)
                .trans_fatty_acids_gram(BigDecimal.ZERO)
                .date(date)
                .member(member)
                .build());

        dietDiaries.forEach(dietDiary -> {
            dayDiary.addEnergy_kcal(dietDiary.getEnergy_kcal());
            dayDiary.addWater_gram(dietDiary.getWater_gram());
            dayDiary.addProtein_gram(dietDiary.getProtein_gram());
            dayDiary.addFat_gram(dietDiary.getFat_gram());
            dayDiary.addAshcontent_gram(dietDiary.getAshcontent_gram());
            dayDiary.addCarbohydrate_gram(dietDiary.getCarbohydrate_gram());
            dayDiary.addSugars_gram(dietDiary.getSugars_gram());
            dayDiary.addDietary_fiber_gram(dietDiary.getDietary_fiber_gram());
            dayDiary.addCalcium_miligram(dietDiary.getCalcium_miligram());
            dayDiary.addIron_miligram(dietDiary.getIron_miligram());
            dayDiary.addPhosphorus_miligram(dietDiary.getPhosphorus_miligram());
            dayDiary.addPotassium_miligram(dietDiary.getPotassium_miligram());
            dayDiary.addSodium_miligram(dietDiary.getSodium_miligram());
            dayDiary.addVitaminA_microgram(dietDiary.getVitaminA_microgram());
            dayDiary.addRetinol_microgram(dietDiary.getRetinol_microgram());
            dayDiary.addBetaCarotene_microgram(dietDiary.getBetaCarotene_microgram());
            dayDiary.addThiamin_miligram(dietDiary.getThiamin_miligram());
            dayDiary.addRiboflavin_miligram(dietDiary.getRiboflavin_miligram());
            dayDiary.addNiacin_miligram(dietDiary.getNiacin_miligram());
            dayDiary.addVitaminC_miligram(dietDiary.getVitaminC_miligram());
            dayDiary.addVitaminD_microgram(dietDiary.getVitaminD_microgram());
            dayDiary.addCholesterol_miligram(dietDiary.getCholesterol_miligram());
            dayDiary.addSaturated_fatty_acids_gram(dietDiary.getSaturated_fatty_acids_gram());
            dayDiary.addTrans_fatty_acids_gram(dietDiary.getTrans_fatty_acids_gram());
        });

        dayDiaryRepository.save(dayDiary);

        return dayDiary;
    }

}



