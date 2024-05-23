package org.example.capstonenewri.Repository;

import org.example.capstonenewri.Dto.MyPageSevenDayDto;
import org.example.capstonenewri.Entity.DayDiary;
import org.example.capstonenewri.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DayDiaryRepository extends JpaRepository<DayDiary, Long> {
    Optional<DayDiary> findByMemberAndDate(Member member, LocalDate date);

    @Query(" select d.feedback from DayDiary d where d.member = :member and d.date = :date ")
    Optional<String> findDailyFeedbackByMemberAndDate(@Param("member") Member member, @Param("date") LocalDate date);

    @Query("""
        select new org.example.capstonenewri.Dto.MyPageSevenDayDto(d.carbohydrate_gram, d.protein_gram, d.fat_gram, d.energy_kcal, d.date)
        from DayDiary d
        where d.member = :member and d.date between :startDate and :endDate
    """)
    Optional<List<MyPageSevenDayDto>> findSevenDtoByMemberAndPeriod(
            @Param("member") Member member,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}
