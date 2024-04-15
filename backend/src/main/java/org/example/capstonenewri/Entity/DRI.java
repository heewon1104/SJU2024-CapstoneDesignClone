package org.example.capstonenewri.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.*;

import java.math.BigDecimal;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class DRI extends BaseEntity{
    // Table Value

    private BigDecimal energy_kcal;
    private BigDecimal water_g;
    private BigDecimal protein_g;
    private BigDecimal fat_g;
    private BigDecimal ash_g;
    private BigDecimal carbohydrate_g;
    private BigDecimal sugars_g;
    private BigDecimal dietary_fiber_g;
    private BigDecimal calcium_mg;
    private BigDecimal iron_mg;
    private BigDecimal phosphorus_mg;
    private BigDecimal potassium_mg;
    private BigDecimal sodium_mg;
    private BigDecimal vitamin_a_mcg;
    private BigDecimal retinol_mcg;
    private BigDecimal beta_carotene_mcg;
    private BigDecimal thiamin_mg;
    private BigDecimal riboflavin_mg;
    private BigDecimal niacin_mg;
    private BigDecimal vitamin_c_mg;
    private BigDecimal vitamin_d_mcg;
    private BigDecimal cholesterol_mg;
    private BigDecimal saturated_fatty_acids_g;
    private BigDecimal trans_fatty_acids_g;

    @OneToOne(mappedBy ="dri")
    @JoinColumn(name = "member_id")
    private Member member;
}

