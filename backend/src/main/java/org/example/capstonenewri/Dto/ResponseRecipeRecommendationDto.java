package org.example.capstonenewri.Dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ResponseRecipeRecommendationDto {
    private List<RecipeDetail> recipes;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class RecipeDetail{
        private Long row;
        private String recipe_parts_dtls;
        private String recipe_na_tip;

    }
}
