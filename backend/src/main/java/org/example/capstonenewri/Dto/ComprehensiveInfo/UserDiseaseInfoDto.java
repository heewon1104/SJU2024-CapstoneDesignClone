package org.example.capstonenewri.Dto.ComprehensiveInfo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDiseaseInfoDto {
//    private Boolean pregnant;        // 임신여부
//    private Boolean breastfeeding;   // 모유수유 여부
//
//    private Boolean diabetes;        // 당뇨
//    private Boolean obesity;         // 비만
//    private String cardio;           // 심혈관 질환
//    private String digestive;        // 소화기
//    private String kidney_disease;   // 신장질환
//    private String nervous_system;   // 신경계
//    private Boolean osteoporosis;    // 골다공증
//    private Boolean constipation;    // 변비
//    private Boolean anaemia;         // 빈혈
//    private Boolean urinary_stone;   // 요로결석
//    private Boolean gout;            // 통풍
//    private String cancer;           // 암
//    private String allergy;          // 알러지

    private String dietary_guideline;

//    @Builder
//    public UserDiseaseInfoDto(Boolean pregnant, Boolean breastfeeding, Boolean diabetes, Boolean obesity, String cardio, String digestive, String kidney_disease,
//                              String nervous_system, Boolean osteoporosis, Boolean constipation, Boolean anaemia,
//                              Boolean urinary_stone, Boolean gout, String cancer, String allergy){
//        this.pregnant = pregnant;
//        this.breastfeeding = breastfeeding;
//        this.diabetes = diabetes;
//        this.obesity = obesity;
//        this.cardio = cardio;
//        this.digestive = digestive;
//        this.kidney_disease = kidney_disease;
//        this.nervous_system = nervous_system;
//        this.osteoporosis = osteoporosis;
//        this.constipation = constipation;
//        this.anaemia = anaemia;
//        this.urinary_stone = urinary_stone;
//        this.gout = gout;
//        this.cancer = cancer;
//        this.allergy = allergy;
//    }

    @Builder
    public UserDiseaseInfoDto(String dietary_guideline){
        this.dietary_guideline = dietary_guideline;
    }
}
