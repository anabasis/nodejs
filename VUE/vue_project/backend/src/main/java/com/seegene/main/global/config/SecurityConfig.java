package com.seegene.main.global.config;

import java.time.LocalDateTime;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.seegene.main.global.auth.CustomAccessDeniedHandler;
import com.seegene.main.global.auth.CustomEntryPoint;
import com.seegene.main.global.auth.PlatformUserConverter;
import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.dto.ErrorMessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

    private final PlatformUserConverter platformUserConverter;

    private static final String[] whiteList = new String[] {
        "/actuator/**",
        "/demo/**",
        "/account/**",
        "/databox/**",
        "/software/**",
        "/datastore/**",
        "/notification/**",
        "/swagger-ui/**",
        "/v3/api-docs/**",
        "/excel/**",
        "/mypage/**",
        "/board/**",
        "/search/**",
        "/data-code-management/**",
        "/login/**",
        "/join/**",
        "/dashboard/**",
        "/project/**",
        "/request/**",
        "/guide/**",
        "/notice/**",
        "/common/**",
        "/tools/**",
        "/external/**"
    };

    // @Bean
    // GrantedAuthorityDefaults grantedAuthorityDefaults() {
    //     return new GrantedAuthorityDefaults(""); // Remove the ROLE_ prefix
    // }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable()
            .cors().and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .exceptionHandling().authenticationEntryPoint(this.authenticationEntryPoint()).and()
            .authorizeHttpRequests()
            .requestMatchers(whiteList).permitAll() // 3
            .anyRequest().authenticated()
            .and()
            .oauth2ResourceServer() // 4
            .accessDeniedHandler(new CustomAccessDeniedHandler()) // 5
            .authenticationEntryPoint(new CustomEntryPoint()) // 6
            .jwt() // 7
            .jwtAuthenticationConverter(platformUserConverter); // 8

        return httpSecurity.build();
    }

    private AuthenticationEntryPoint authenticationEntryPoint(){
        return (request, response, authException) -> {
            ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

            log.error("Unauthorized error: {}", authException.getMessage());
            log.error("Requested path    : {}", request.getServletPath());

            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setStatus(HttpStatus.BAD_REQUEST.value());

            ErrorMessage errorMessage = ErrorMessage.builder()
                .statusCode(ErrorCode.INTERNAL_API_ERROR.getCode())
                .message(ErrorCode.INTERNAL_API_ERROR.getDefaultMessage())
                .description("uri="+request.getContextPath()+request.getServletPath())
                .timestamp(LocalDateTime.now())
                .build();

            mapper.writeValue(response.getOutputStream(), errorMessage);
        };
    }
}