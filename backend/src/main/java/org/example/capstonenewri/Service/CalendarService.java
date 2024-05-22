package org.example.capstonenewri.Service;

import org.example.capstonenewri.Dto.ResponseCalendarDietDto;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CalendarService {
    Optional<List<ResponseCalendarDietDto>> getMonthlyDiets(String email, LocalDate date);

}
