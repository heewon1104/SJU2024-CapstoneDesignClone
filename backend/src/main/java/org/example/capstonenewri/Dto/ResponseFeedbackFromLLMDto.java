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
    private String instruction;

    @Builder
    public ResponseFeedbackFromLLMDto(String feedback, String instruction){
        this.feedback = feedback;
        this.instruction = instruction;
    }
}



