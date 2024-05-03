package org.example.capstonenewri.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.ResponseUserDRIDto;
import org.example.capstonenewri.Entity.DRI;
import org.example.capstonenewri.Repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {

    private final MemberRepository memberRepository;

    @Override
    public ResponseUserDRIDto findDRIbyMemberEmail(String email) {
        Optional<DRI> driOptional = memberRepository.findDRIByEmail(email);
        if (driOptional.isPresent()) {
            DRI dri = driOptional.get();
            return ResponseUserDRIDto.builder()
                    .carbohydrate_g(dri.getCarbohydrate_g())
                    .protein_g(dri.getProtein_g())
                    .fat_g(dri.getFat_g())
                    .energy_kcal(dri.getEnergy_kcal())
                    .build();
        } else {
            throw new EntityNotFoundException("DRI not found for email: " + email);
        }
    }
}
