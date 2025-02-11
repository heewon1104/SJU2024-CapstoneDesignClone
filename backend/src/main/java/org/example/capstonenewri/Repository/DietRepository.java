package org.example.capstonenewri.Repository;

import org.example.capstonenewri.Dto.ResponseCalendarDietDto;
import org.example.capstonenewri.Dto.ResponseIntakeDto;
import org.example.capstonenewri.Entity.Diet;
import org.example.capstonenewri.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DietRepository extends JpaRepository<Diet, Long> {

    @Query("""
        select new org.example.capstonenewri.Dto.ResponseIntakeDto(sum(dd.carbohydrate_gram),
        sum(dd.protein_gram),
        sum(dd.fat_gram),
        sum(dd.energy_kcal))
        from Diet d join d.dietDiary dd
        where d.member.email = :email and
              d.intakeTime >= :startOfDay AND
              d.intakeTime < :endOfDay
    """)
    ResponseIntakeDto findSumByMemberEmailAndDate(@Param("email")String email, @Param("startOfDay") LocalDateTime startOfDay,
                                                  @Param("endOfDay")LocalDateTime endOfDay);

    @Query("""
             select new org.example.capstonenewri.Dto.ResponseCalendarDietDto(d.dietType, d.intakeTime, d.food, d.ingredients, d.amount)
             from Diet d
             where d.member = :member and d.intakeTime between :startDate and :endDate
    """)
    Optional<List<ResponseCalendarDietDto>> findAllByMemberAndIntakeTimeBetween(
            @Param("member") Member member,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);
}
