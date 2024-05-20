package org.example.capstonenewri.Dto.ComprehensiveInfo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.capstonenewri.Dto.FoodNutritionDto;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RequestFeedbackToLLMDto {
    private List<DietDto> diets;
    private List<FoodNutritionDto> dietDiaries;
    private UserDiseaseInfoDto diseaseInfo;
    private UserDRIDto dri;
    private FoodNutritionDto dayDiary; // llm에 피드백을 받고 업데이트할 예정

    @Builder
    public RequestFeedbackToLLMDto(List<DietDto> diets, List<FoodNutritionDto> dietDiaries, UserDiseaseInfoDto diseaseInfo,
            UserDRIDto dri, FoodNutritionDto dayDiary){
        this.diets = diets;
        this.dietDiaries = dietDiaries;
        this.diseaseInfo = diseaseInfo;
        this.dri = dri;
        this.dayDiary = dayDiary;
    }
}
