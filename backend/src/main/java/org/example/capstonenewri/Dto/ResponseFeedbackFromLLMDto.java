package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResponseFeedbackFromLLMDto {
    private String feedback;
    private String disease_instruction;

    @Builder
    public ResponseFeedbackFromLLMDto(String feedback, String disease_instruction){
        this.feedback = feedback;
        this.disease_instruction = disease_instruction;
    }
}



