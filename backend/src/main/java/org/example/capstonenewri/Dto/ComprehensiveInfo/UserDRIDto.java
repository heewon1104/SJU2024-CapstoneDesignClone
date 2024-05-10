package org.example.capstonenewri.Dto.ComprehensiveInfo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class UserDRIDto {
    private BigDecimal carbohydrate_g;
    private BigDecimal protein_g;
    private BigDecimal fat_g;
    private BigDecimal dietary_fiber_gram;
    private BigDecimal energy_kcal;
    private BigDecimal water_g;

    @Builder
    public UserDRIDto(BigDecimal carbohydrate_g, BigDecimal protein_g, BigDecimal fat_g
                        ,BigDecimal dietary_fiber_gram, BigDecimal energy_kcal, BigDecimal water_g){
        this.carbohydrate_g = carbohydrate_g;
        this.protein_g = protein_g;
        this.fat_g = fat_g;
        this.dietary_fiber_gram = dietary_fiber_gram;
        this.energy_kcal = energy_kcal;
        this.water_g = water_g;
    }
}



