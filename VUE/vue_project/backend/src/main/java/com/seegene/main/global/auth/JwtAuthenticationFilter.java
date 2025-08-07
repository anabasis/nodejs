package com.seegene.main.global.auth;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * JwtAuthenticationFilter
 * <PRE>
 * </PRE>
 *
 * @author : khhong@mz.co.kr
 * @History <PRE>
 * No  Date           Author            Desc
 * ---- ------------ ---------------- ------------------------------------
 *   1   2023-05-23        khhong        최초작성
 *   2   2023-07-21        khhong        keycloak 토큰 유효성 검증 추가
 *   3   2023-07-26        khhong        PlatformUserDetails 내용 추가
 *   4   2023-08-09        khhong        PlatformUserInfo 내용 추가 및 Keycloak 인증 검증 내용 추가.
 *   5	 2023-08-18	 	   khhong 		 인증 프로세스 관련 PlatformInterceptor로 이관
 * </PRE>
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        filterChain.doFilter(request, response);
    }
}