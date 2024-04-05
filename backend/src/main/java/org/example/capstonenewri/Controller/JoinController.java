package org.example.capstonenewri.Controller;


import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.RequestJoinMemberDto;
import org.example.capstonenewri.Entity.Type.Role;
import org.example.capstonenewri.Service.JoinServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@ResponseStatus(HttpStatus.OK) // request 호출 성공 시 response 헤더에 200 반환
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor // final 필드에 대한 생성자를 자동으로 생성
public class JoinController {

    private final JoinServiceImpl joinServiceImpl;

    @PostMapping(value = "/join")
    public void joinMember(@RequestBody RequestJoinMemberDto requestJoinMemberDto){ // RequestJoinMemberDto는 json이랑 완전히 똑같아야함
        requestJoinMemberDto.setRole(Role.USER);
        joinServiceImpl.joinMember(requestJoinMemberDto);
    }


}
