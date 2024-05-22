package org.example.capstonenewri.Service;

import org.example.capstonenewri.Dto.ResponseIntakeDto;
import org.example.capstonenewri.Dto.ResponseUserDRIDto;
import org.example.capstonenewri.Entity.Member;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

public interface MainService{
    ResponseUserDRIDto findDRIbyMemberEmail(String email);
    ResponseIntakeDto findIntakebyMemberEmailAndDate(String email, LocalDateTime startOfDay, LocalDateTime endOfDay);

    Optional<String> getDailyFeedback(String email, LocalDate date);
}
