package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

// ai 서버 -> 백으로 받을 응답 데이터 형식

@Getter
@Setter
@NoArgsConstructor
public class ResponseAIAnalysisDto {
    private String food;
    private String food_be;
    private List<String> ingredients;
    private Integer amount;

    @Builder
    public ResponseAIAnalysisDto(String food, String food_be, List<String> ingredients, Integer amount){
        this.food = food;
        this.food_be = food_be;
        this.ingredients = ingredients;
        this.amount = amount;
    }

}
