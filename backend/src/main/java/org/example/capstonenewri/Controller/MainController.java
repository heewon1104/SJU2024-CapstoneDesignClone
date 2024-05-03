package org.example.capstonenewri.Controller;

import lombok.RequiredArgsConstructor;

import org.example.capstonenewri.Dto.ResponseIntakeDto;
import org.example.capstonenewri.Dto.ResponseUserDRIDto;
import org.example.capstonenewri.Service.MainServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@ResponseStatus(HttpStatus.OK)
@RestController
@RequestMapping("api/main")
@RequiredArgsConstructor
public class MainController {

    private final MainServiceImpl mainServiceImpl;

    @GetMapping("/dri")
    public ResponseUserDRIDto getUserDRI(Authentication authentication){
        ResponseUserDRIDto responseUserDRIDto = mainServiceImpl.findDRIbyMemberEmail(authentication.getName());
        return responseUserDRIDto;
    }

    @GetMapping("/intake")
    public ResponseIntakeDto getUserIntake(Authentication authentication, @RequestBody Map<String, String> requestBody){
        String dateString = requestBody.get("date"); // 요청된 JSON 중 "date" 키의 값을 가져옵니다.
        LocalDate date = LocalDate.parse(dateString, DateTimeFormatter.ISO_LOCAL_DATE); // ISO_LOCAL_DATE 형태인 "yyyy-MM-dd"를 파싱
        LocalDateTime startOfDay = date.atStartOfDay(); // 해당 날짜의 자정
        LocalDateTime endOfDay = startOfDay.plusDays(1); // 다음 날 자정
        ResponseIntakeDto intakeDto = mainServiceImpl.findIntakebyMemberEmailAndDate(authentication.getName(), startOfDay, endOfDay);
        return intakeDto;
    }
}
