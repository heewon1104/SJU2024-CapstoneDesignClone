package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class ResponseIntakeDto {
    private BigDecimal total_carbohydrate_g;
    private BigDecimal total_protein_g;
    private BigDecimal total_fat_g;
    private BigDecimal total_energy_kcal;

    @Builder
    public ResponseIntakeDto(BigDecimal total_carbohydrate_g, BigDecimal total_protein_g, BigDecimal total_fat_g, BigDecimal total_energy_kcal){
        this.total_carbohydrate_g = total_carbohydrate_g;
        this.total_protein_g = total_protein_g;
        this.total_fat_g = total_fat_g;
        this.total_energy_kcal = total_energy_kcal;
    }
}
