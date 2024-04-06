package org.example.capstonenewri.Dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class RequestLoginDto {
    String email;
    String password;

    @Builder
    public RequestLoginDto(String email, String password){
        this.email = email;
        this.password = password;
    }
}
