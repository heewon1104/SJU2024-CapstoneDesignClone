package org.example.capstonenewri.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.RequestAnalysisDto;
import org.example.capstonenewri.Dto.ResponseAIAnalysisDto;
import org.example.capstonenewri.Dto.ResponseAnalysisDto;
import org.example.capstonenewri.Entity.Member;
import org.example.capstonenewri.Repository.DietRepository;
import org.example.capstonenewri.Repository.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@Transactional
@RequiredArgsConstructor
public class AnalysisServiceImpl implements AnalysisServie{

    private final DietRepository dietRepository;
    private final MemberRepository memberRepository;
    private final RestTemplate restTemplate;


    @Value("${flask.url}")  // ai 서버 주소
    private String url;
    String endPoint = "/upload"; // uri

    @Override
    public ResponseAnalysisDto analyzeNutrition(List<MultipartFile> foodImages, RequestAnalysisDto requestAnalysisDto) {
        System.out.println("ㅎ하ㅏ핳하하");// 디버깅 문구

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA); // 이미지 데이터 지정

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        for (MultipartFile file : foodImages) {
            if (!file.isEmpty()) {
                body.add("foodImages",file.getResource()); // 여기서 MultipartFile의 Resource를 사용
            }
        }
        body.add("koreanOrAll", requestAnalysisDto.getKoreanOrAll().toString());

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        System.out.println("ㅎ하ㅏ핳하하");// 디버깅 문구
        ResponseEntity<ResponseAIAnalysisDto> responseEntity = restTemplate.exchange(
                url + endPoint,
                HttpMethod.POST,
                requestEntity,
                ResponseAIAnalysisDto.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null){
            Member member = memberRepository.findByEmail(requestAnalysisDto.getEmail())
                    .orElseThrow(() -> new EntityNotFoundException("Member not found with email: " + requestAnalysisDto.getEmail()));

            ResponseAnalysisDto responseAnalysisDto = ResponseAnalysisDto.builder().
                    dietType(requestAnalysisDto.getDietType()).
                    koreanOrAll(requestAnalysisDto.getKoreanOrAll()).
                    intakeTime(requestAnalysisDto.getIntakeTime()).
                    foods(responseEntity.getBody().getFoods()).
                    ingredients(responseEntity.getBody().getIngredients()).
                    amount(responseEntity.getBody().getAmount()).
                    build();

            return responseAnalysisDto;
        } else {
            throw new RestClientException("AI 서버로부터의 응답이 올바르지 않습니다.");
        }

    }
}
