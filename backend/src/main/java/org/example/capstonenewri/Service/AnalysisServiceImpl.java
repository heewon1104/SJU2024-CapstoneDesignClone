package org.example.capstonenewri.Service;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.RequestAnalysisDto;
import org.example.capstonenewri.Dto.ResponseAIAnalysisDto;
import org.example.capstonenewri.Dto.ResponseAnalysisDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AnalysisServiceImpl implements AnalysisService {

    private final RestTemplate restTemplate;

    @Value("${flask.url}")  // AI 서버 주소
    private String url;
    private final String endPoint = "/upload"; // URI

    @Override
    public List<ResponseAnalysisDto> analyzeNutrition(List<MultipartFile> foodImages, RequestAnalysisDto requestAnalysisDto) throws RestClientException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA); // 이미지 데이터 지정

        List<ResponseAIAnalysisDto> aiResponses = foodImages.stream()
                .map(foodImage -> { // 1개의 foodImage를 각각 요청
                    MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
                    body.add("foodImage", foodImage.getResource()); // 여기서 MultipartFile의 Resource를 사용
                    body.add("koreanOrAll", requestAnalysisDto.getKoreanOrAll().toString());
                    HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

                    try {
                        ResponseEntity<ResponseAIAnalysisDto> response = restTemplate.exchange( // restTemplate -> 요청
                                url + endPoint,
                                HttpMethod.POST, // 요청 타입
                                requestEntity,
                                ResponseAIAnalysisDto.class);
                        return response.getBody();
                    } catch (RestClientException e) {
                        throw new RuntimeException("AI 서버 요청 실패", e);
                    }
                })
                .toList();

        if (aiResponses.isEmpty()) {
            throw new RestClientException("AI 서버로부터의 응답이 없습니다.");
        }

        // AI 응답을 ResponseAnalysisDto로 변환
        List<ResponseAnalysisDto> responses = aiResponses.stream()
                .map(aiResponse ->  ResponseAnalysisDto.builder()
                        .dietType(requestAnalysisDto.getDietType())
                        .koreanOrAll(requestAnalysisDto.getKoreanOrAll())
                        .intakeTime(requestAnalysisDto.getIntakeTime())
                        .food(aiResponse.getFood())
                        .food_be(aiResponse.getFood_be())
                        .ingredients(aiResponse.getIngredients())
                        .amount(aiResponse.getAmount())
                        .build())
                .toList();

        return responses;
    }
}
