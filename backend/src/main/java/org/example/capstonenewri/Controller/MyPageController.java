package org.example.capstonenewri.Controller;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Service.MyPageServiceImpl;
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

    private final MyPageServiceImpl myPageServiceImpl;

    @GetMapping("/instruction")
    public String getInstruction(Authentication authentication){
        String instruction = myPageServiceImpl.getInstructionByMemberEmail(authentication.getName());
        return instruction;
    }
}
