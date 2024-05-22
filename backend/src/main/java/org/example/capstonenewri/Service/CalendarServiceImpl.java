package org.example.capstonenewri.Service;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.ResponseCalendarDietDto;
import org.example.capstonenewri.Entity.Member;
import org.example.capstonenewri.Repository.DietRepository;
import org.example.capstonenewri.Repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService{
    private final MemberRepository memberRepository;
    private final DietRepository dietRepository;

    @Override
    public Optional<List<ResponseCalendarDietDto>> getMonthlyDiets(String email, LocalDate date) {

        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        if(memberOptional.isEmpty()){
            throw new IllegalStateException("해당 이메일을 가진 회원을 찾을 수 없습니다: " + email);
        } else {
            YearMonth yearMonth = YearMonth.from(date);
            LocalDateTime startDateTime = yearMonth.atDay(1).atStartOfDay();
            LocalDateTime endDateTime = yearMonth.atEndOfMonth().atTime(23,59,59);

            Member member = memberOptional.get();
            Optional<List<ResponseCalendarDietDto>> calendarDietDtos = dietRepository.findAllByMemberAndIntakeTimeBetween(member, startDateTime, endDateTime);
            return calendarDietDtos;
        }
    }
}
