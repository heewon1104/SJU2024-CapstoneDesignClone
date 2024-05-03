package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class ResponseUserDRIDto {
    private BigDecimal carbohydrate_g;
    private BigDecimal protein_g;
    private BigDecimal fat_g;
    private BigDecimal energy_kcal;

    @Builder
    public ResponseUserDRIDto(BigDecimal carbohydrate_g, BigDecimal protein_g, BigDecimal fat_g, BigDecimal energy_kcal){
        this.carbohydrate_g = carbohydrate_g;
        this.protein_g = protein_g;
        this.fat_g = fat_g;
        this.energy_kcal = energy_kcal;
    }
}
