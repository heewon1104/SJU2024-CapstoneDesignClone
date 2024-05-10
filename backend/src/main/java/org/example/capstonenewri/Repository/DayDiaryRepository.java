package org.example.capstonenewri.Repository;

import org.example.capstonenewri.Entity.DayDiary;
import org.example.capstonenewri.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface DayDiaryRepository extends JpaRepository<DayDiary, Long> {
    Optional<DayDiary> findByMemberAndDate(Member member, LocalDate date);
}
