package org.example.capstonenewri.Service;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{

    private final MemberRepository memberRepository;

    @Override
    public String getInstructionByMemberEmail(String email) {
        return null;
    }
}
