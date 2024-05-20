package org.example.capstonenewri.Dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ResponseRecipeRecommendationDto {
    private List<Long> recipes;
}
