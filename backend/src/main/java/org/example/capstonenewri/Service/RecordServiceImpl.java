package org.example.capstonenewri.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.FoodNutritionDto;
import org.example.capstonenewri.Dto.RequestSaveRecordDto;
import org.example.capstonenewri.Entity.Diet;
import org.example.capstonenewri.Entity.DietDiary;
import org.example.capstonenewri.Entity.Member;
import org.example.capstonenewri.Repository.DietDiaryRepository;
import org.example.capstonenewri.Repository.DietRepository;
import org.example.capstonenewri.Repository.FoodRepository;
import org.example.capstonenewri.Repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
@Transactional
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService{

    private final DietRepository dietRepository;
    private final MemberRepository memberRepository;
    private final FoodRepository foodRepository;
    private final DietDiaryRepository dietDiaryRepository;

    @Override
    public Diet saveDiet(RequestSaveRecordDto requestSaveRecordDto) {
        Member member = memberRepository.findByEmail(requestSaveRecordDto.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("Member not found with email: " + requestSaveRecordDto.getEmail()));

        Diet diet = Diet.builder()
                .diettype(requestSaveRecordDto.getDietType())
                .koreanOrAll(requestSaveRecordDto.getKoreanOrAll())
                .intakeTime(requestSaveRecordDto.getIntakeTime())
                .food(requestSaveRecordDto.getFood()) // 음식
                .food_be(requestSaveRecordDto.getFood_be()) // db 매칭 음식이름
                .ingredients(requestSaveRecordDto.getIngredients().toString()) // 재료
                .amount(requestSaveRecordDto.getAmount())
                .member(member).build();

        DietDiary dietDiary = saveDietDiary(diet);
        diet.setDietDiary(dietDiary);

        dietRepository.save(diet);
        //System.out.println("savediet = " + diet); // 디버깅 문구
        return diet;
    }

    @Override
    public DietDiary saveDietDiary(Diet diet) {
        String food_be = diet.getFood_be();
        Integer amount = diet.getAmount();
        System.out.println("saveDietDiaryfood = " + food_be); // debugging

        FoodNutritionDto dtoByFoodName = foodRepository.findFoodByName(food_be);

        DietDiary dietDiary = DietDiary.builder()
                .energy_kcal(dtoByFoodName.getEnergy_kcal().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .water_gram(dtoByFoodName.getWater_gram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .protein_gram(dtoByFoodName.getProtein_gram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .fat_gram(dtoByFoodName.getFat_gram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .ashcontent_gram(dtoByFoodName.getAshcontent_gram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .carbohydrate_gram(dtoByFoodName.getCarbohydrate_gram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .sugars_gram(dtoByFoodName.getSugars_gram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .dietary_fiber_gram(dtoByFoodName.getDietary_fiber_gram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .calcium_miligram(dtoByFoodName.getCalcium_miligram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .iron_miligram(dtoByFoodName.getIron_miligram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .phosphorus_miligram(dtoByFoodName.getPhosphorus_miligram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .potassium_miligram(dtoByFoodName.getPotassium_miligram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .sodium_miligram(dtoByFoodName.getSodium_miligram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .vitaminA_microgram(dtoByFoodName.getVitaminA_microgram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .retinol_microgram(dtoByFoodName.getRetinol_microgram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .betaCarotene_microgram(dtoByFoodName.getBetaCarotene_microgram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .thiamin_miligram(dtoByFoodName.getThiamin_miligram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .riboflavin_miligram(dtoByFoodName.getRiboflavin_miligram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .niacin_miligram(dtoByFoodName.getNiacin_miligram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .vitaminC_miligram(dtoByFoodName.getVitaminC_miligram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .vitaminD_microgram(dtoByFoodName.getVitaminD_microgram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .cholesterol_miligram(dtoByFoodName.getCholesterol_miligram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .saturated_fatty_acids_gram(dtoByFoodName.getSaturated_fatty_acids_gram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .trans_fatty_acids_gram(dtoByFoodName.getTrans_fatty_acids_gram().divide(BigDecimal.valueOf(100),2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(amount)))
                .diet(diet)
                .build();

        dietDiaryRepository.save(dietDiary);
        return dietDiary;
    }
}
