package com.seegene.main;

import java.util.LinkedHashMap;
import java.util.Objects;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

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
 *   1 2023-08-23        khhong        최초작성
 * </PRE>
 */
public class TokenUtils {

	public static String getToken(){
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", "application/x-www-form-urlencoded");

		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "password");
		params.add("client_id", "platform-client");
		params.add("username", "seegene3@seegene.com");
		params.add("password", "3");

		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

		String url = "https://keycloak.dev.sg-drdp.com/realms/seegene/protocol/openid-connect/token";

		ResponseEntity<Object> res = restTemplate.postForEntity(url, request, Object.class);
		LinkedHashMap<String, String> result = (LinkedHashMap<String, String>) res.getBody();
		return "Bearer "+ Objects.requireNonNull(result).get("access_token");
	}
}
