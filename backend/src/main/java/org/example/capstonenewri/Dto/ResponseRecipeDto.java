package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResponseRecipeDto {
    private String message;

    private Long id;
    private String rcp_nm;
    private String att_file_no_main;
    private String rcp_parts_dtls;
    private String rcp_na_tip;
    private String manual01;
    private String manual02;
    private String manual03;
    private String manual04;
    private String manual05;
    private String manual06;
    private String manual_img01;
    private String manual_img02;
    private String manual_img03;
    private String manual_img04;
    private String manual_img05;
    private String manual_img06;
    private String rcp_pat2;
    private String rcp_way2;

    public ResponseRecipeDto(Long id,String rcp_nm, String att_file_no_main, String rcp_parts_dtls, String rcp_na_tip,
                             String manual01, String manual02, String manual03, String manual04, String manual05, String manual06,
                             String manual_img01, String manual_img02, String manual_img03, String manual_img04, String manual_img05,
                             String manual_img06, String rcp_pat2, String rcp_way2) {
        this.id = id;
        this.rcp_nm = rcp_nm;
        this.att_file_no_main = att_file_no_main;
        this.rcp_parts_dtls = rcp_parts_dtls;
        this.rcp_na_tip = rcp_na_tip;
        this.manual01 = manual01;
        this.manual02 = manual02;
        this.manual03 = manual03;
        this.manual04 = manual04;
        this.manual05 = manual05;
        this.manual06 = manual06;
        this.manual_img01 = manual_img01;
        this.manual_img02 = manual_img02;
        this.manual_img03 = manual_img03;
        this.manual_img04 = manual_img04;
        this.manual_img05 = manual_img05;
        this.manual_img06 = manual_img06;
        this.rcp_pat2 = rcp_pat2;
        this.rcp_way2 = rcp_way2;

    }

    public ResponseRecipeDto(String message) {
        this.message = message;
    }
}
