package org.example.capstonenewri.Dto.ComprehensiveInfo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class DietDto {
    private String food;
    private List<String> ingredients;

    @Builder
    public DietDto(String food, List<String> ingredients){
        this.food = food;
        this.ingredients = ingredients;
    }
}
