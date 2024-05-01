package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
public class FoodNutrtionDto {
    private BigDecimal energy_kcal;
    private BigDecimal water_gram;
    private BigDecimal protein_gram;
    private BigDecimal fat_gram;
    private BigDecimal ashcontent_gram;
    private BigDecimal carbohydrate_gram;
    private BigDecimal sugars_gram;
    private BigDecimal dietary_fiber_gram;
    private BigDecimal calcium_miligram;
    private BigDecimal iron_miligram;
    private BigDecimal phosphorus_miligram;
    private BigDecimal potassium_miligram;
    private BigDecimal sodium_miligram;
    private BigDecimal vitaminA_microgram;
    private BigDecimal retinol_microgram;
    private BigDecimal betaCarotene_microgram;
    private BigDecimal thiamin_miligram;
    private BigDecimal riboflavin_miligram;
    private BigDecimal niacin_miligram;
    private BigDecimal vitaminC_miligram;
    private BigDecimal vitaminD_microgram;
    private BigDecimal cholesterol_miligram;
    private BigDecimal saturated_fatty_acids_gram;
    private BigDecimal trans_fatty_acids_gram;

    @Builder
    public FoodNutrtionDto(BigDecimal energy_kcal, BigDecimal water_gram, BigDecimal protein_gram,
                           BigDecimal fat_gram, BigDecimal ashcontent_gram, BigDecimal carbohydrate_gram,
                           BigDecimal sugars_gram, BigDecimal dietary_fiber_gram, BigDecimal calcium_miligram,
                           BigDecimal iron_miligram, BigDecimal phosphorus_miligram, BigDecimal potassium_miligram,
                           BigDecimal sodium_miligram, BigDecimal vitaminA_microgram, BigDecimal retinol_microgram,
                           BigDecimal betaCarotene_microgram, BigDecimal thiamin_miligram, BigDecimal riboflavin_miligram,
                           BigDecimal niacin_miligram, BigDecimal vitaminC_miligram, BigDecimal vitaminD_microgram,
                           BigDecimal cholesterol_miligram, BigDecimal saturated_fatty_acids_gram, BigDecimal trans_fatty_acids_gram){
        this.energy_kcal = energy_kcal;
        this.water_gram = water_gram;
        this.protein_gram = protein_gram;
        this.fat_gram = fat_gram;
        this.ashcontent_gram = ashcontent_gram;
        this.carbohydrate_gram = carbohydrate_gram;
        this.sugars_gram = sugars_gram;
        this.dietary_fiber_gram = dietary_fiber_gram;
        this.calcium_miligram = calcium_miligram;
        this.iron_miligram = iron_miligram;
        this.phosphorus_miligram = phosphorus_miligram;
        this.potassium_miligram = potassium_miligram;
        this.sodium_miligram = sodium_miligram;
        this.vitaminA_microgram = vitaminA_microgram;
        this.retinol_microgram = retinol_microgram;
        this.betaCarotene_microgram = betaCarotene_microgram;
        this.thiamin_miligram = thiamin_miligram;
        this.riboflavin_miligram = riboflavin_miligram;
        this.niacin_miligram = niacin_miligram;
        this.vitaminC_miligram = vitaminC_miligram;
        this.vitaminD_microgram = vitaminD_microgram;
        this.cholesterol_miligram = cholesterol_miligram;
        this.saturated_fatty_acids_gram = saturated_fatty_acids_gram;
        this.trans_fatty_acids_gram = trans_fatty_acids_gram;
    }

}
