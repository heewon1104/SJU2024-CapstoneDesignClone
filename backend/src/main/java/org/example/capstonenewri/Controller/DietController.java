package org.example.capstonenewri.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.RequestAnalysisDto;
import org.example.capstonenewri.Dto.RequestSaveRecordDto;
import org.example.capstonenewri.Dto.ResponseAnalysisDto;
import org.example.capstonenewri.Dto.ResponseFeedbackFromLLMDto;
import org.example.capstonenewri.Entity.Diet;
import org.example.capstonenewri.Entity.DietDiary;
import org.example.capstonenewri.Repository.MemberRepository;
import org.example.capstonenewri.Service.AnalysisServiceImpl;
import org.example.capstonenewri.Service.DrawFeedbackService;
import org.example.capstonenewri.Service.DrawFeedbackServiceImpl;
import org.example.capstonenewri.Service.RecordServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@ResponseStatus(HttpStatus.OK)
@RestController
@RequestMapping("/api/diet")
@RequiredArgsConstructor
public class DietController {

    private final AnalysisServiceImpl analysisServiceImpl;
    private final RecordServiceImpl recordServiceImpl;
    private final ObjectMapper objectMapper;
    private final DrawFeedbackServiceImpl drawFeedbackServiceImpl;

    @PostMapping(value = "/tmpsave", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) // consumes는 수신하는 요청의 미디어 타입 지정.
    public ResponseEntity<List<ResponseAnalysisDto>> analyzeNutrition(Authentication authentication,
                                                @RequestPart(required = true, name = "foodImages") List<MultipartFile> foodImages,
                                                @RequestPart(name = "request") String requestJson
                                 )throws IOException {

        RequestAnalysisDto requestAnalysisDto = objectMapper.readValue(requestJson, RequestAnalysisDto.class);
        requestAnalysisDto.setEmail(authentication.getName());

        System.out.println("이메일" + requestAnalysisDto.getEmail()); // 디버깅 문구
        System.out.println("섭취시간" + requestAnalysisDto.getIntakeTime()); // 디버깅 문구

        List<ResponseAnalysisDto> responses =  analysisServiceImpl.analyzeNutrition(foodImages, requestAnalysisDto);
        return ResponseEntity.ok().body(responses);
    }

    @PostMapping(value = "/save")
    public void saveDietRecord(Authentication authentication,@RequestBody List<RequestSaveRecordDto> requestSaveRecordDtos){
        List<Diet> dietList = new ArrayList<>();

        for(RequestSaveRecordDto dto : requestSaveRecordDtos){
            dto.setEmail(authentication.getName());
            Diet diet = recordServiceImpl.saveDiet(dto);
            System.out.println("dietcontroller = " + diet.getFood());
            dietList.add(diet);
        }
        drawFeedbackServiceImpl.drawFeedback(dietList, authentication.getName());

    }
}
