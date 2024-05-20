package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.capstonenewri.Entity.Member;
import org.example.capstonenewri.Entity.Type.Gender;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class MemberPhysicalInfoDto {
    private LocalDate birth;
    private Gender gender;
    private Boolean pregnant;
    private Boolean breastfeeding;
    private BigDecimal height;
    private BigDecimal weight;
    private BigDecimal bmi;
    private Boolean diabetes;
    private Boolean obesity;  // 비만
    private String cardio;  // 심혈관 질환
    private String digestive;  // 소화기
    private String kidney_disease;  // 신장질환
    private String nervous_system;  // 신경계
    private Boolean osteoporosis;  // 골다공증
    private Boolean constipation;  // 변비
    private Boolean anaemia;  // 빈혈
    private Boolean urinary_stone; //요로 결석
    private Boolean gout;  // 통풍
    private Boolean vegan;
    private String cancer;
    private String allergy;

    @Builder
    public MemberPhysicalInfoDto(LocalDate birth, Gender gender, Boolean pregnant, Boolean breastfeeding, BigDecimal height,
                         BigDecimal weight, BigDecimal bmi, Boolean diabetes, Boolean obesity, String cardio,
                         String digestive, String kidney_disease, String nervous_system, Boolean osteoporosis,
                         Boolean constipation, Boolean anaemia, Boolean urinary_stone, Boolean gout,
                         Boolean vegan, String cancer, String allergy){
        this.birth = birth;
        this.gender = gender;
        this.pregnant = pregnant;
        this.breastfeeding = breastfeeding;
        this.height = height;
        this.weight = weight;
        this.bmi = bmi;
        this.diabetes = diabetes;
        this.obesity = obesity;
        this.cardio = cardio;
        this.digestive = digestive;
        this.kidney_disease = kidney_disease;
        this.nervous_system = nervous_system;
        this.constipation = constipation;
        this.anaemia = anaemia;
        this.osteoporosis = osteoporosis;
        this.urinary_stone = urinary_stone;
        this.gout = gout;
        this.vegan = vegan;
        this.cancer = cancer;
        this.allergy = allergy;
    }

    public static MemberPhysicalInfoDto from(Member member) {
        return MemberPhysicalInfoDto.builder()
                .birth(member.getBirth())
                .gender(member.getGender())
                .pregnant(member.getPregnant())
                .breastfeeding(member.getBreastfeeding())
                .height(member.getHeight())
                .weight(member.getWeight())
                .bmi(member.getBmi())
                .diabetes(member.getDiabetes())
                .obesity(member.getObesity())
                .cardio(member.getCardio())
                .digestive(member.getDigestive())
                .kidney_disease(member.getKidney_disease())
                .nervous_system(member.getNervous_system())
                .constipation(member.getConstipation())
                .anaemia(member.getAnaemia())
                .urinary_stone(member.getUrinary_stone())
                .gout(member.getGout())
                .vegan(member.getVegan())
                .cancer(member.getCancer())
                .allergy(member.getAllergy())
                .build();
    }
}
