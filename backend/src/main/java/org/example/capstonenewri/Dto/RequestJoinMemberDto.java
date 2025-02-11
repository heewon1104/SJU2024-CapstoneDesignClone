package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.capstonenewri.Entity.Type.Gender;
import org.example.capstonenewri.Entity.Type.Role;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
public class RequestJoinMemberDto {
    private Long id;
    private String name;
    private String email;
    private String password;
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
    private Role role;

    @Builder
    public RequestJoinMemberDto( String name, String email, String password, LocalDate birth,
                                Gender gender, Boolean pregnant, BigDecimal height, BigDecimal weight,
                                Boolean diabetes, String cardio, String digestive, String kidney_disease,
                                String nervous_system, Boolean osteoporosis, Boolean constipation, Boolean anaemia, Boolean urinary_stone,
                                Boolean gout, Boolean vegan, String cancer, String allergy, Role role){

        this.name = name;
        this.email = email;
        this.password = password;
        this.birth = birth;
        this.gender = gender;
        this.pregnant = pregnant;
        this.height = height;
        this.weight = weight;

        this.diabetes = diabetes;

        this.cardio = cardio;
        this.digestive = digestive;
        this.kidney_disease = kidney_disease;
        this.nervous_system = nervous_system;
        this.osteoporosis = osteoporosis;
        this.constipation = constipation;
        this.anaemia = anaemia;
        this.urinary_stone = urinary_stone;
        this.gout = gout;
        this.vegan = vegan;
        this.cancer = cancer;
        this.allergy = allergy;
        this.role = role;
    }


}
