package org.example.capstonenewri.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.ResponseIntakeDto;
import org.example.capstonenewri.Dto.ResponseRecipeDto;
import org.example.capstonenewri.Dto.ResponseUserDRIDto;
import org.example.capstonenewri.Entity.DRI;
import org.example.capstonenewri.Entity.Member;
import org.example.capstonenewri.Repository.DayDiaryRepository;
import org.example.capstonenewri.Repository.DietRepository;
import org.example.capstonenewri.Repository.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {

    private final MemberRepository memberRepository;
    private final DietRepository dietRepository;
    private final DayDiaryRepository dayDiaryRepository;

    @Override
    public ResponseUserDRIDto findDRIbyMemberEmail(String email) {
        Optional<DRI> driOptional = memberRepository.findDRIByEmail(email);
        if (driOptional.isPresent()) {
            DRI dri = driOptional.get();
            return ResponseUserDRIDto.builder()
                    .carbohydrate_g(dri.getCarbohydrate_gram())
                    .protein_g(dri.getProtein_gram())
                    .fat_g(dri.getFat_gram())
                    .energy_kcal(dri.getEnergy_kcal())
                    .build();
        } else {
            throw new EntityNotFoundException("DRI not found for email: " + email);
        }
    }

    @Override
    public ResponseIntakeDto findIntakebyMemberEmailAndDate(String email, LocalDateTime startOfDay, LocalDateTime endOfDay) {
        ResponseIntakeDto dto = dietRepository.findSumByMemberEmailAndDate(email, startOfDay, endOfDay);
        return dto;
    }

    @Override
    public Optional<String> getDailyFeedback(String email, LocalDate date) {
        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        if (!memberOptional.isPresent()) { // 오류처리
            return Optional.empty();
        }
        Member member = memberOptional.get();
        return dayDiaryRepository.findDailyFeedbackByMemberAndDate(member, date);
    }
}
