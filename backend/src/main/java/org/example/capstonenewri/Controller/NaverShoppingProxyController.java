package org.example.capstonenewri.Controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.example.capstonenewri.Configuration.NaverClientConfig;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URLEncoder;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@RestController
public class NaverShoppingProxyController {

    @Autowired
    private NaverClientConfig naverClientConfig;

    @GetMapping("/api/naver-shop")
    public ResponseEntity<String> proxyNaverShopping(@RequestParam String query) {
        try {
            // 원본 쿼리 출력
            System.out.println("Original Query: " + query);

            // UTF-8로 인코딩된 쿼리
            String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8.toString());
            System.out.println("Encoded Query: " + encodedQuery);

            String urlString = "https://openapi.naver.com/v1/search/shop.json?query=" + encodedQuery + "&display=10";
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("X-Naver-Client-Id", naverClientConfig.getClientId());
            connection.setRequestProperty("X-Naver-Client-Secret", naverClientConfig.getClientSecret());
            connection.setRequestProperty("Accept", "application/json");

            int responseCode = connection.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // 응답 로그 출력
            String jsonResponse = response.toString();
            System.out.println("Response: " + jsonResponse);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(jsonResponse);

            // 결과 파싱 및 출력
            System.out.println("Parsed JSON: " + rootNode.toPrettyString());

            return ResponseEntity.ok(rootNode.toPrettyString());

        } catch (Exception e) {
            e.printStackTrace(); // 예외 로그 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching data from Naver API");
        }
    }
}
