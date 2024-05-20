package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.capstonenewri.Dto.ComprehensiveInfo.UserDiseaseInfoDto;

@Getter
@Setter
@NoArgsConstructor
public class RequestRecipeRecommendationToLLMDto {
    private String feedback; // 하루 누적 피드백
    private String disease_instruction; // instruction for llm
    private UserDiseaseInfoDto diseaseInfo; // 사용자 질환 정보
    // 일주일 누적 영양정보? -> 성능 문제로 인해 보류

    @Builder
    public RequestRecipeRecommendationToLLMDto(String feedback, String disease_instruction, UserDiseaseInfoDto diseaseInfo){
        this.feedback = feedback;
        this.disease_instruction = disease_instruction;
        this.diseaseInfo = diseaseInfo;
    }
}
