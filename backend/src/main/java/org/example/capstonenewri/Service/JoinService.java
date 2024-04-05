package org.example.capstonenewri.Service;

import lombok.AllArgsConstructor;
import org.example.capstonenewri.Dto.RequestJoinMemberDto;


public interface JoinService {
    void joinMember(RequestJoinMemberDto requestJoinMemberDto); // 회원가입
}
