package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.capstonenewri.Entity.Type.DietType;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class ResponseCalendarDietDto {
    private DietType dietType;
    private LocalDateTime intakeTime;
    private String food;
    private List<String> ingredients;
    private Integer amount;

    @Builder
    public ResponseCalendarDietDto(DietType dietType, LocalDateTime intakeTime,
                                   String food, List<String> ingredients, Integer amount){
        this.dietType = dietType;
        this.intakeTime = intakeTime;
        this.food = food;
        this.ingredients = ingredients;
        this.amount = amount;
    }
}
