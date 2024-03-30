package org.example.capstonenewri.Service;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.RequestJoinMemberDto;
import org.example.capstonenewri.Entity.Member;
import org.example.capstonenewri.Repository.MemberRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class JoinServiceImpl implements JoinService{

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder encoder;

    @Override
    public void joinMember(RequestJoinMemberDto requestJoinMemberDto) {
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
                bmi(requestJoinMemberDto.getBmi()).
                diabetes(requestJoinMemberDto.getDiabetes()).
                obesity(requestJoinMemberDto.getObesity()).
                cardio(requestJoinMemberDto.getCardio()).
                digestive(requestJoinMemberDto.getDigestive()).
                kidney_disease(requestJoinMemberDto.getKidney_disease()).
                nervous_system(requestJoinMemberDto.getNervous_system()).
                osteoporosis(requestJoinMemberDto.getOsteoporosis()).
                constipation(requestJoinMemberDto.getConstipation()).
                anaemia(requestJoinMemberDto.getAnaemia()).
                stone(requestJoinMemberDto.getStone()).
                gout(requestJoinMemberDto.getGout()).
                vegan(requestJoinMemberDto.getVegan()).
                cancer(requestJoinMemberDto.getCancer()).
                allergy(requestJoinMemberDto.getAllergy()).
                role(requestJoinMemberDto.getRole()).build();
        memberRepository.save(member);
    }



}
