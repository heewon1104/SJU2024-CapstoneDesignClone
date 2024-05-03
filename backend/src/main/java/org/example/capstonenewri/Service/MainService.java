package org.example.capstonenewri.Service;

import org.example.capstonenewri.Dto.ResponseUserDRIDto;
import org.example.capstonenewri.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MainService{
    ResponseUserDRIDto findDRIbyMemberEmail(String email);
}
