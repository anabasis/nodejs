package com.seegene.main.global.interceptor;

import static org.springframework.http.HttpHeaders.*;

import java.io.IOException;
import java.time.LocalDateTime;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.seegene.main.global.auth.JwtProvider;
import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.dto.ErrorMessage;
import com.seegene.main.global.exception.BusinessException;
import com.seegene.main.global.exception.KeycloakAuthenticationException;
import com.seegene.main.global.util.props.AllowProperties;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-08-17        khhong        최초작성
 * </PRE>
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class PlatformInterceptor implements HandlerInterceptor {

	private final JwtProvider jwtProvider;
	private final AllowProperties allowProperties;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		String url = request.getRequestURI();
		for (String apiUrl : allowProperties.getApiUrls())	if (url.contains(apiUrl)) return true;

		try {
			String authHeader = request.getHeader(AUTHORIZATION);
			String keyCloakHeader = request.getHeader("X-Keycloak-Token");
			this.getCloudFrontHeaders(request);
			if (StringUtils.isEmpty(keyCloakHeader)) {
				jwtProvider.authenticate(authHeader, url);
			}
			return true;
		} catch (BusinessException e) {
			setErrorResponse(request, response, e.getErrorCode());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	private void getCloudFrontHeaders(HttpServletRequest request) {
		String address = request.getHeader("cloudfront-viewer-address");
		String city = request.getHeader("cloudfront-viewer-city");
		String country = request.getHeader("cloudfront-viewer-country");
		String countryName = request.getHeader("cloudfront-viewer-country-name");
		String regionName = request.getHeader("cloudfront-viewer-country-region-name");
		String timeZone = request.getHeader("cloudfront-viewer-time-zone");
		log.info(String.format("[getCloudFrontHeaders] address:%s, city:%s, country:%s, countryName:%s, regionName:%s, timeZone:%s", address, city, country, countryName, regionName, timeZone));
	}

	public void setErrorResponse(HttpServletRequest request, HttpServletResponse res, ErrorCode errorCode) throws IOException {
		ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

		ErrorMessage errorMessage = ErrorMessage.builder()
			.statusCode(errorCode.getCode())
			.message(errorCode.getDefaultMessage())
			.description("uri="+request.getContextPath()+request.getServletPath())
			.timestamp(LocalDateTime.now())
			.build();
		if (errorCode.getCode() == ErrorCode.SYSTEM_AUTHENTICATION_ERROR.getCode()) {
			res.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
		if(errorCode.getCode()==ErrorCode.SYSTEM_EXPIRATION_ERROR.getCode() || errorCode.getCode() == ErrorCode.TOKEN_VALUE_ERROR.getCode()){
			res.setStatus(HttpStatus.FORBIDDEN.value());
		}
		res.setContentType("application/json; charset=UTF-8");
		res.getWriter().write(mapper.writeValueAsString(errorMessage));
	}
}