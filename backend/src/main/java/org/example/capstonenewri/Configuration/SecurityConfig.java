//package org.example.capstonenewri.Configuration;
//
//import lombok.RequiredArgsConstructor;
//import org.example.capstonenewri.Repository.MemberRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@Configuration
//@EnableWebSecurity
//@RequiredArgsConstructor
//public class SecurityConfig {
//
//    private final MemberRepository memberRepository;
//
//    @Autowired
//    private CorsConfig corsConfig;
//
//    @Value("${jwt.secret}")
//    private String secretKey;
//
//    @Bean
//    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.csrf(cs-> cs.disable())
//                .sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .addFilterBefore(new JwtFilter(memberRepository, secretKey), UsernamePasswordAuthenticationFilter.class)
//                .formLogin(f->f.disable())
//                .httpBasic(h->h.disable())
//                .addFilter(corsConfig.corsFilter());
////        http.authorizeHttpRequests(authroize -> authroize.
////                requestMatchers("/upload/**").hasRole("INSTITUTION").
////                requestMatchers("/board/**").hasAnyRole("USER", "INSTITUTION").
////                requestMatchers("/comment/**").hasAnyRole("USER", "INSTITUTION").
////                requestMatchers("/member/**").hasAnyRole("USER", "INSTITUTION").
////                anyRequest().permitAll());
//        return http.build();
//    }
//}
