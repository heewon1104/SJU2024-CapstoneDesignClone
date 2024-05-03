package org.example.capstonenewri.Controller;

import lombok.RequiredArgsConstructor;

import org.example.capstonenewri.Dto.ResponseUserDRIDto;
import org.example.capstonenewri.Service.MainServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@ResponseStatus(HttpStatus.OK)
@RestController
@RequestMapping("api/main")
@RequiredArgsConstructor
public class MainController {

    private final MainServiceImpl mainServiceImpl;

    @GetMapping("/dri")
    public ResponseUserDRIDto getUserDRI(Authentication authentication){
        ResponseUserDRIDto responseUserDRIDto = mainServiceImpl.findDRIbyMemberEmail(authentication.getName());
        return responseUserDRIDto;
    }
}
