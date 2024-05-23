package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class MyPageSevenDayDto {
    private BigDecimal carbohydrate_gram;
    private BigDecimal protein_gram;
    private BigDecimal fat_gram;
    private BigDecimal energy_kcal;
    private LocalDate date;

    @Builder
    public MyPageSevenDayDto(BigDecimal carbohydrate_gram, BigDecimal protein_gram, BigDecimal fat_gram, BigDecimal energy_kcal, LocalDate date){
        this.carbohydrate_gram = carbohydrate_gram;
        this.protein_gram = protein_gram;
        this.fat_gram = fat_gram;
        this.energy_kcal = energy_kcal;
        this.date = date;
    }
}

