package org.example.capstonenewri.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.ResponseIntakeDto;
import org.example.capstonenewri.Dto.ResponseUserDRIDto;
import org.example.capstonenewri.Entity.DRI;
import org.example.capstonenewri.Repository.DietRepository;
import org.example.capstonenewri.Repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {

    private final MemberRepository memberRepository;
    private final DietRepository dietRepository;

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
}
