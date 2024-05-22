package org.example.capstonenewri.Controller;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.ResponseCalendarDietDto;
import org.example.capstonenewri.Service.CalendarServiceImpl;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@ResponseStatus(HttpStatus.OK)
@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarServiceImpl calendarServiceImpl;

    @GetMapping("/{date}")
    public ResponseEntity<Map<String, Object>> getMonthlyDiets(Authentication authentication,
                                                               @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate date){
        String email = authentication.getName();
        Optional<List<ResponseCalendarDietDto>> monthlyDiets = calendarServiceImpl.getMonthlyDiets(email, date);

        Map<String, Object> response = new HashMap<>();
        if (monthlyDiets.isEmpty()) {
            response.put("message", "No Record");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            response.put("data", monthlyDiets);
            return ResponseEntity.ok(response);
        }
    }
}
