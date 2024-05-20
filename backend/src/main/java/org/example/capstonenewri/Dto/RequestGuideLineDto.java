package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RequestGuideLineDto {
    private MemberPhysicalInfoDto memberPhysicalInfo;

    @Builder
    public RequestGuideLineDto(MemberPhysicalInfoDto memberPhysicalInfoDto){
        this.memberPhysicalInfo = memberPhysicalInfoDto;
    }
}
