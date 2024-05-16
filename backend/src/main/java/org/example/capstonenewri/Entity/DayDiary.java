package org.example.capstonenewri.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class DayDiary {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "daydiary_id")
    private Long id;

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

    private String ingredient_recommended;
    private String ingredient_prohibited;
    private String feedback;
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")  // Member 테이블의 member_id를 참조
    private Member member;

    public void addEnergy_kcal(BigDecimal energy_kcal) { this.energy_kcal = this.energy_kcal.add(energy_kcal); }
    public void addWater_gram(BigDecimal water_gram) { this.water_gram = this.water_gram.add(water_gram); }
    public void addProtein_gram(BigDecimal protein_gram) { this.protein_gram = this.protein_gram.add(protein_gram); }
    public void addFat_gram(BigDecimal fat_gram) { this.fat_gram = this.fat_gram.add(fat_gram); }
    public void addAshcontent_gram(BigDecimal ashcontent_gram) { this.ashcontent_gram = this.ashcontent_gram.add(ashcontent_gram); }
    public void addCarbohydrate_gram(BigDecimal carbohydrate_gram) { this.carbohydrate_gram = this.carbohydrate_gram.add(carbohydrate_gram); }
    public void addSugars_gram(BigDecimal sugars_gram) { this.sugars_gram = this.sugars_gram.add(sugars_gram); }
    public void addDietary_fiber_gram(BigDecimal dietary_fiber_gram) { this.dietary_fiber_gram = this.dietary_fiber_gram.add(dietary_fiber_gram); }
    public void addCalcium_miligram(BigDecimal calcium_miligram) { this.calcium_miligram = this.calcium_miligram.add(calcium_miligram); }
    public void addIron_miligram(BigDecimal iron_miligram) { this.iron_miligram = this.iron_miligram.add(iron_miligram); }
    public void addPhosphorus_miligram(BigDecimal phosphorus_miligram) { this.phosphorus_miligram = this.phosphorus_miligram.add(phosphorus_miligram); }
    public void addPotassium_miligram(BigDecimal potassium_miligram) { this.potassium_miligram = this.potassium_miligram.add(potassium_miligram); }
    public void addSodium_miligram(BigDecimal sodium_miligram) { this.sodium_miligram = this.sodium_miligram.add(sodium_miligram); }
    public void addVitaminA_microgram(BigDecimal vitaminA_microgram) { this.vitaminA_microgram = this.vitaminA_microgram.add(vitaminA_microgram); }
    public void addRetinol_microgram(BigDecimal retinol_microgram) { this.retinol_microgram = this.retinol_microgram.add(retinol_microgram); }
    public void addBetaCarotene_microgram(BigDecimal betaCarotene_microgram) { this.betaCarotene_microgram = this.betaCarotene_microgram.add(betaCarotene_microgram); }
    public void addThiamin_miligram(BigDecimal thiamin_miligram) { this.thiamin_miligram = this.thiamin_miligram.add(thiamin_miligram); }
    public void addRiboflavin_miligram(BigDecimal riboflavin_miligram) { this.riboflavin_miligram = this.riboflavin_miligram.add(riboflavin_miligram); }
    public void addNiacin_miligram(BigDecimal niacin_miligram) { this.niacin_miligram = this.niacin_miligram.add(niacin_miligram); }
    public void addVitaminC_miligram(BigDecimal vitaminC_miligram) { this.vitaminC_miligram = this.vitaminC_miligram.add(vitaminC_miligram); }
    public void addVitaminD_microgram(BigDecimal vitaminD_microgram) { this.vitaminD_microgram = this.vitaminD_microgram.add(vitaminD_microgram); }
    public void addCholesterol_miligram(BigDecimal cholesterol_miligram) { this.cholesterol_miligram = this.cholesterol_miligram.add(cholesterol_miligram); }
    public void addSaturated_fatty_acids_gram(BigDecimal saturated_fatty_acids_gram) { this.saturated_fatty_acids_gram = this.saturated_fatty_acids_gram.add(saturated_fatty_acids_gram); }
    public void addTrans_fatty_acids_gram(BigDecimal trans_fatty_acids_gram) { this.trans_fatty_acids_gram = this.trans_fatty_acids_gram.add(trans_fatty_acids_gram); }

}


