package org.example.capstonenewri.Service;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.MyPageSevenDayDto;
import org.example.capstonenewri.Entity.Member;
import org.example.capstonenewri.Repository.DayDiaryRepository;
import org.example.capstonenewri.Repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{
    private final DayDiaryRepository dayDiaryRepository;
    private final MemberRepository memberRepository;

    @Override
    public String getInstructionByMemberEmail(String email) {
        return memberRepository.findInstructionByEmail(email);
    }

    @Override
    public Optional<List<MyPageSevenDayDto>> getSevenDaysDto(String email, LocalDate endDate) {
        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        if (!memberOptional.isPresent()) { // 오류처리
            throw new IllegalStateException("해당 이메일을 가진 회원을 찾을 수 없습니다: " + email);
        }
        Member member = memberOptional.get();
        LocalDate startDate = endDate.minusDays(6);

        Optional<List<MyPageSevenDayDto>> sevenDayDtos = dayDiaryRepository.findSevenDtoByMemberAndPeriod(member, startDate, endDate);
        return sevenDayDtos;
    }


}
