package org.example.capstonenewri.Controller;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.MyPageSevenDayDto;
import org.example.capstonenewri.Service.MyPageServiceImpl;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@ResponseStatus(HttpStatus.OK)
@RestController
@RequestMapping("api/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageServiceImpl myPageServiceImpl;

    @GetMapping("/instruction")
    public Map<String, Object> getInstruction(Authentication authentication){
        String instruction = myPageServiceImpl.getInstructionByMemberEmail(authentication.getName());

        Map<String, Object> response = new HashMap<>();
        response.put("instruction", instruction);

        return response;
    }

    @GetMapping("/{date}")
    public ResponseEntity<Map<String, Object>> getSevenDaysDto(Authentication authentication,
                                                                      @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        Optional<List<MyPageSevenDayDto>> myPageSevenDayDtos = myPageServiceImpl.getSevenDaysDto(authentication.getName(), date);

        Map<String, Object> response = new HashMap<>();
        if(myPageSevenDayDtos.isPresent()){
            response.put("message", "Success");
            response.put("data", myPageSevenDayDtos.get());
            return ResponseEntity.ok(response);
        } else{
            response.put("message", "No Record");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
        }
    }
}
