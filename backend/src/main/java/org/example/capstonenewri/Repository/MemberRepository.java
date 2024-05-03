package org.example.capstonenewri.Repository;

import org.example.capstonenewri.Dto.ResponseUserDRIDto;
import org.example.capstonenewri.Entity.DRI;
import org.example.capstonenewri.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    @Query("select m.dri from Member m where m.email = :email")
    Optional<DRI> findDRIByEmail(@Param("email") String email);

}
