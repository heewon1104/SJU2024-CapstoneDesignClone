package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResponseRecipeDto {
    private String rcp_nm;
    private String att_file_no_main;
    private String message;

    @Builder
    public ResponseRecipeDto(String rcp_nm, String att_file_no_main, String message){
        this.rcp_nm = rcp_nm;
        this.att_file_no_main = att_file_no_main;
        this.message = message;
    }

    public ResponseRecipeDto(String rcp_nm, String att_file_no_main) {
        this.rcp_nm = rcp_nm;
        this.att_file_no_main = att_file_no_main;
    }

    public ResponseRecipeDto(String message) {
        this.message = message;
    }
}
