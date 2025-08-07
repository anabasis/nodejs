package com.seegene.main.global.config.feign;

import java.time.Instant;
import java.util.Arrays;
import java.util.Date;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.dto.ErrorMessage;
import com.seegene.main.global.dto.ExternalErrorMessage;
import com.seegene.main.global.exception.FeignException;

import feign.Response;
import feign.RetryableException;
import feign.codec.ErrorDecoder;
import feign.codec.StringDecoder;
import lombok.SneakyThrows;
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
 *   1 2023-09-20        khhong        최초작성
 * </PRE>
 */
@Slf4j
public class FeignErrorDecode implements ErrorDecoder {

	private final StringDecoder stringDecoder = new StringDecoder();
	private final ObjectMapper objectMapper = new ObjectMapper();

	@SneakyThrows
	@Override
	public FeignException decode(String methodKey, Response response) {
		log.error(String.format("%s 요청이 성공하지 못했습니다. status: %s requestUrl: %s, requestBody: %s, responseBody: %s", methodKey, response.status(), response.request().url(), Arrays.toString(response.request().body()), response.body()));
		String messgae = stringDecoder.decode(response, String.class).toString();
		ExternalErrorMessage errorMessage = objectMapper.readValue(messgae, ExternalErrorMessage.class);

		if (isRetry(response)) {
			new RetryableException(response.status(), String.format("%s 요청이 성공하지 못했습니다. Retry 합니다. - status: %s, headers: %s", methodKey, response.status(), response.headers()), response.request().httpMethod(), Date.from(Instant.now()), response.request());
			errorMessage.setDescription("external="+response.request().url());

		}
		return new FeignException(ErrorCode.EXTERNAL_API_ERROR, errorMessage);
	}

	private boolean isRetry(Response response) {
		return response.request()
			.httpMethod()
			.name()
			.equalsIgnoreCase("GET");
	}
}
