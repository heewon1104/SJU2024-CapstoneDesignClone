package org.example.capstonenewri.Service;

import org.example.capstonenewri.Dto.MyPageSevenDayDto;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MyPageService {
    String getInstructionByMemberEmail(String email);
    Optional<List<MyPageSevenDayDto>> getSevenDaysDto(String email, LocalDate date);
}
