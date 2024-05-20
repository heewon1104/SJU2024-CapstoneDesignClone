package org.example.capstonenewri.Service;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.MemberPhysicalInfoDto;
import org.example.capstonenewri.Dto.RequestJoinMemberDto;
import org.example.capstonenewri.Dto.ResponseDiseaseInstructionFromLLMDto;
import org.example.capstonenewri.Entity.DRI;
import org.example.capstonenewri.Entity.Member;
import org.example.capstonenewri.Repository.DRIRepository;
import org.example.capstonenewri.Repository.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
@Transactional
@RequiredArgsConstructor
public class JoinServiceImpl implements JoinService{

    private final MemberRepository memberRepository;
    private final DRIRepository driRepository;
    private final BCryptPasswordEncoder encoder;
    private final RestTemplate restTemplate;

    @Value("${flask.url}")  // AI 서버 주소
    private String url;

    private final String endPoint = "/disease_instruction"; // URI

    @Override
    public void joinMember(RequestJoinMemberDto requestJoinMemberDto) {

        BigDecimal heightInMeters = requestJoinMemberDto.getHeight().divide(BigDecimal.valueOf(100), RoundingMode.HALF_UP);
        BigDecimal heightSquared = heightInMeters.multiply(heightInMeters);
        BigDecimal bmi = requestJoinMemberDto.getWeight().divide(heightSquared, 2, RoundingMode.HALF_UP);

        Boolean obesity = bmi.compareTo(new BigDecimal("23")) > 0;

        Member member = Member.builder().
                name(requestJoinMemberDto.getName()).
                email(requestJoinMemberDto.getEmail()).
                password(encoder.encode(requestJoinMemberDto.getPassword())).
                birth(requestJoinMemberDto.getBirth()).
                gender(requestJoinMemberDto.getGender()).
                pregnant(requestJoinMemberDto.getPregnant()).
                breastfeeding(requestJoinMemberDto.getBreastfeeding()).
                height(requestJoinMemberDto.getHeight()).
                weight(requestJoinMemberDto.getWeight()).
                bmi(bmi).
                diabetes(requestJoinMemberDto.getDiabetes()).
                obesity(obesity).
                cardio(requestJoinMemberDto.getCardio()).
                digestive(requestJoinMemberDto.getDigestive()).
                kidney_disease(requestJoinMemberDto.getKidney_disease()).
                nervous_system(requestJoinMemberDto.getNervous_system()).
                osteoporosis(requestJoinMemberDto.getOsteoporosis()).
                constipation(requestJoinMemberDto.getConstipation()).
                anaemia(requestJoinMemberDto.getAnaemia()).
                urinary_stone(requestJoinMemberDto.getUrinary_stone()).
                gout(requestJoinMemberDto.getGout()).
                vegan(requestJoinMemberDto.getVegan()).
                cancer(requestJoinMemberDto.getCancer()).
                allergy(requestJoinMemberDto.getAllergy()).
                role(requestJoinMemberDto.getRole()).build();

        MemberPhysicalInfoDto memberInfoDto = MemberPhysicalInfoDto.from(member);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<MemberPhysicalInfoDto> entity = new HttpEntity<>(memberInfoDto, headers);

        ResponseEntity<ResponseDiseaseInstructionFromLLMDto> response = restTemplate.exchange( // restTemplate -> 요청
                url + endPoint,
                HttpMethod.POST, // 요청 타입
                entity,
                ResponseDiseaseInstructionFromLLMDto.class);



        // DRI 산출 모듈 생성
        DRICalculator test = new DRICalculator(member.getBirth(), member.getGender(), member.getPregnant(), member.getBreastfeeding(),
                member.getHeight(), member.getWeight());


        // DRI 산출
        DRI userDRI = test.DRICalc(member);

        // DRI 객체 저장
        driRepository.save(userDRI);

        // Member 객체에 DRI 설정
        member.setDri(userDRI);
        member.setDiseaseInstruction(response.getBody().getDiseaseInstruction());

        // Member 객체 저장
        memberRepository.save(member);
    }


}
