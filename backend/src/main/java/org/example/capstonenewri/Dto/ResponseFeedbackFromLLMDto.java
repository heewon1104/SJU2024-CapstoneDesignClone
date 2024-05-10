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

    @Builder
    public ResponseFeedbackFromLLMDto(String feedback){
        this.feedback = feedback;
    }
}



