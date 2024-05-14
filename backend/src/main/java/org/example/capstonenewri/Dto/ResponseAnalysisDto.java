package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.capstonenewri.Entity.Type.DietType;
import org.example.capstonenewri.Entity.Type.KoreanOrAll;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class ResponseAnalysisDto {
    private DietType dietType;
    private KoreanOrAll koreanOrAll;
    private LocalDateTime intakeTime;
    private String food;
    private String food_be;
    private List<String> ingredients;
    private Integer amount;

    @Builder
    public ResponseAnalysisDto(DietType dietType, KoreanOrAll koreanOrAll, LocalDateTime intakeTime,
                               String food, String food_be, List<String> ingredients, Integer amount){
        this.dietType = dietType;
        this.koreanOrAll = koreanOrAll;
        this.intakeTime = intakeTime;
        this.food = food;
        this.food_be = food_be;
        this.ingredients = ingredients;
        this.amount = amount;
    }
}
