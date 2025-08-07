package com.seegene.main.global.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Aspect
@Component
@Slf4j
public class LoggingAspect {
	@Before("execution(* com.seegene.main.domain.common.controller.*.*(..))")//해당 프로젝트 디렉토리에 맞춰 추후수정필요
	public void logRequest(JoinPoint joinPoint) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		String httpMethod = request.getMethod();
		String requestURI = request.getRequestURI();
		Object[] args = joinPoint.getArgs();

		log.info("Request	:("  +requestURI+ ")	:" + getArgsString(args));
	}

	@AfterReturning(pointcut = "execution(* com.seegene.main.domain.common..controller.*.*(..))", returning = "result")//해당 프로젝트 디렉토리에 맞춰 추후수정필요
	public void logResponse(Object result) {
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			String json = objectMapper.writeValueAsString(result);
			System.out.println("Response: " + json);
		} catch (JsonProcessingException e) {
			// JSON 변환 실패 시 예외 처리
			e.printStackTrace();
		}
	}

	private String getArgsString(Object[] args) {
		StringBuilder sb = new StringBuilder();
		if (args != null && args.length > 0) {
			for (Object arg : args) {
				sb.append(arg).append(", ");
			}
			sb.delete(sb.length() - 2, sb.length());
		}
		return sb.toString();
	}
}
