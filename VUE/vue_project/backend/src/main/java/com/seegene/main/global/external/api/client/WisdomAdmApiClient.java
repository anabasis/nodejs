package com.seegene.main.global.external.api.client;

import static org.springframework.http.HttpHeaders.*;

import java.util.Locale;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import com.seegene.main.domain.demo.dto.LoginValidTResponse;
import com.seegene.main.global.config.feign.FeignConfiguration;

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
@FeignClient(
	name = "wisdom-admin-api",
	url = "${external.api.adminUrl}",
	configuration = {FeignConfiguration.class})
public interface WisdomAdmApiClient {

	@GetMapping(value = "/demo/anonymous")
	String getAnonymous();

	@GetMapping(value = "/demo/locale")
	String getLocale(@RequestParam(value = "lang") Locale lang);

	@PostMapping(value = "/login/login-history")
	void createAdminLoginHistory(@RequestHeader(AUTHORIZATION) String token);

	@GetMapping(value = "/login/login-valid")
	LoginValidTResponse findByloginValid(@RequestHeader(AUTHORIZATION) String token);
}
