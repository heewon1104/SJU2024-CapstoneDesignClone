package org.example.capstonenewri.Repository;

import org.example.capstonenewri.Dto.ResponseUserDRIDto;
import org.example.capstonenewri.Entity.DRI;
import org.example.capstonenewri.Entity.DayDiary;
import org.example.capstonenewri.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    @Query("select m.dri from Member m where m.email = :email")
    Optional<DRI> findDRIByEmail(@Param("email") String email);

    @Query("""
        select m.dayDiaries
        from Member m
    """)
    Optional<DayDiary> findDayDiaryByEmailAndDateTime(@Param("email") String email, @Param("startOfDay") LocalDateTime startOfDay,
                                                      @Param("endOfDay")LocalDateTime endOfDay);

    @Query("select m.di from Member m where m.email = :email")
    String findDietaryInstructionByEmail(@Param("email") String email);
}
