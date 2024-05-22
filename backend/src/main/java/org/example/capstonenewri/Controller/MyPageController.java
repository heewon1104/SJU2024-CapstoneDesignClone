package org.example.capstonenewri.Controller;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Service.MyPageServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@ResponseStatus(HttpStatus.OK)
@RestController
@RequestMapping("api/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageServiceImpl myPageServiceImpl;

    @GetMapping("/instruction")
    public Map<String, Object> getInstruction(Authentication authentication){
        String instruction = myPageServiceImpl.getInstructionByMemberEmail(authentication.getName());

        Map<String, Object> response = new HashMap<>();
        response.put("instruction", instruction);

        return response;
    }
}
