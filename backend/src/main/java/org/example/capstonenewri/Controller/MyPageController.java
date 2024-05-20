package org.example.capstonenewri.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@ResponseStatus(HttpStatus.OK)
@RestController
@RequestMapping("api/mypage")
@RequiredArgsConstructor
public class MyPageController {

    @GetMapping("/instruction")
    public String getInstruction(Authentication authentication){

    }
}
