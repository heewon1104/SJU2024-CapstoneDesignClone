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
                .ingredients(requestSaveRecordDto.getIngredients().toString()) // 재료
                .amount(requestSaveRecordDto.getAmount())
                .member(member).build();

        dietRepository.save(diet);
        System.out.println("savediet = " + diet);
        return diet;
    }

    @Override
    public DietDiary saveDietDiary(Diet diet) {

        String food = diet.getFood();
        System.out.println("saveDietDiaryfood = " + food);
        FoodNutritionDto dtoByFoodName = foodRepository.findFoodByName(food);

        DietDiary dietDiary = DietDiary.builder()
                .energy_kcal(dtoByFoodName.getEnergy_kcal())
                .water_gram(dtoByFoodName.getWater_gram())
                .protein_gram(dtoByFoodName.getProtein_gram())
                .fat_gram(dtoByFoodName.getFat_gram())
                .ashcontent_gram(dtoByFoodName.getAshcontent_gram())
                .carbohydrate_gram(dtoByFoodName.getCarbohydrate_gram())
                .sugars_gram(dtoByFoodName.getSugars_gram())
                .dietary_fiber_gram(dtoByFoodName.getDietary_fiber_gram())
                .calcium_miligram(dtoByFoodName.getCalcium_miligram())
                .iron_miligram(dtoByFoodName.getIron_miligram())
                .phosphorus_miligram(dtoByFoodName.getPhosphorus_miligram())
                .potassium_miligram(dtoByFoodName.getPotassium_miligram())
                .sodium_miligram(dtoByFoodName.getSodium_miligram())
                .vitaminA_microgram(dtoByFoodName.getVitaminA_microgram())
                .retinol_microgram(dtoByFoodName.getRetinol_microgram())
                .betaCarotene_microgram(dtoByFoodName.getBetaCarotene_microgram())
                .thiamin_miligram(dtoByFoodName.getThiamin_miligram())
                .riboflavin_miligram(dtoByFoodName.getRiboflavin_miligram())
                .niacin_miligram(dtoByFoodName.getNiacin_miligram())
                .vitaminC_miligram(dtoByFoodName.getVitaminC_miligram())
                .vitaminD_microgram(dtoByFoodName.getVitaminD_microgram())
                .cholesterol_miligram(dtoByFoodName.getCholesterol_miligram())
                .saturated_fatty_acids_gram(dtoByFoodName.getSaturated_fatty_acids_gram())
                .trans_fatty_acids_gram(dtoByFoodName.getTrans_fatty_acids_gram())
                .diet(diet)
                .build();

        dietDiaryRepository.save(dietDiary);
        return dietDiary;
    }
}
