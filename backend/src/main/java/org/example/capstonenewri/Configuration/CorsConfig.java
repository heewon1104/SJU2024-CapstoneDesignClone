package org.example.capstonenewri.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:19006");
        config.setAllowCredentials(true);
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.addExposedHeader("Authorization"); // 클라이언트에서 접근할 수 있도록 특정 헤더들을 노출시킴
        config.addExposedHeader("Authorization-Refresh"); // 클라이언트에서 접근할 수 있도록 특정 헤더들을 노출시킴
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
