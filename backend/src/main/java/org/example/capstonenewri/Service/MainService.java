package org.example.capstonenewri.Service;

import org.example.capstonenewri.Dto.ResponseIntakeDto;
import org.example.capstonenewri.Dto.ResponseUserDRIDto;
import org.example.capstonenewri.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface MainService{
    ResponseUserDRIDto findDRIbyMemberEmail(String email);
    ResponseIntakeDto findIntakebyMemberEmailAndDate(String email, LocalDateTime startOfDay, LocalDateTime endOfDay);
}
