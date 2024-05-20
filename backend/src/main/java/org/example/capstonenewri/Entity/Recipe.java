package org.example.capstonenewri.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "recipe_id")
    private Long id;
    private String rcp_parts_dtls;
    private String rcp_way2;
    private Integer rcp_seq;
    private Integer info_na;
    private Integer info_wgt;
    private Integer info_pro;
    private String hash_tag;
    private String rcp_pat2; // 조리 방법 분류

    private String manual_img01;
    private String manual_img02;
    private String manual_img03;
    private String manual_img04;
    private String manual_img05;
    private String manual_img06;

    private String manual01;
    private String manual02;
    private String manual03;
    private String manual04;
    private String manual05;
    private String manual06;

    private String att_file_no_mk; // 위 아래 동일한 것으로 보임
    private String att_file_no_main;

    private Integer info_car;
    private String rcp_na_tip; // 나트륨 섭취를 줄이는 팁

    private Integer info_eng;
    private String rcp_nm;
    private String strong;
}
