package org.example.capstonenewri.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class DietDiary {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "dietdiary_id")
    private Long id;

    private BigDecimal energyKcal;
    private BigDecimal waterG;
    private BigDecimal proteinG;
    private BigDecimal fatG;
    private BigDecimal ashG;
    private BigDecimal carbohydrateG;
    private BigDecimal sugarsG;
    private BigDecimal dietaryFiberG;
    private BigDecimal calciumMg;
    private BigDecimal ironMg;
    private BigDecimal phosphorusMg;
    private BigDecimal potassiumMg;
    private BigDecimal sodiumMg;
    private BigDecimal vitaminAMcg;
    private BigDecimal retinolMcg;
    private BigDecimal betaCaroteneMcg;
    private BigDecimal thiaminMg;
    private BigDecimal riboflavinMg;
    private BigDecimal niacinMg;
    private BigDecimal vitaminCMg;
    private BigDecimal vitaminDMcg;
    private BigDecimal cholesterolMg;
    private BigDecimal saturatedFattyAcidsG;
    private BigDecimal transFattyAcidsG;

    @OneToOne
    @JoinColumn(name = "diet_id")
    private Diet diet;


}
