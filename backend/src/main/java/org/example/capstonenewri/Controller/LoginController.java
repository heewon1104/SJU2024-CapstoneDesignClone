package org.example.capstonenewri.Controller;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.RequestLoginDto;
import org.example.capstonenewri.Service.LoginServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@ResponseStatus(HttpStatus.OK)
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class LoginController {
    private final LoginServiceImpl loginServiceImpl;

    @PostMapping("/login")
    public String login(@RequestBody RequestLoginDto requestLoginDto){
        return loginServiceImpl.login(requestLoginDto);
    }
}
