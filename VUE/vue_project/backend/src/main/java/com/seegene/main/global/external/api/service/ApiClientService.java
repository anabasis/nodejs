package com.seegene.main.global.external.api.service;

import java.util.Locale;

import org.springframework.stereotype.Service;

import com.seegene.main.domain.demo.dto.LoginValidTResponse;
import com.seegene.main.global.external.api.client.WisdomAdmApiClient;
import com.seegene.main.global.external.api.support.AbstractApiCallSupport;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * ApiClientService
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
@Service
@RequiredArgsConstructor
public class ApiClientService implements AbstractApiCallSupport {

	private final WisdomAdmApiClient wisdomAdmApiClient;

	public String getAnonymous() {
		return unwrap(wisdomAdmApiClient.getAnonymous());
	}

	public String getLocale(Locale lang) {
		return unwrap(wisdomAdmApiClient.getLocale(lang));
	}

	public LoginValidTResponse findByloginValid(String token) {
		return unwrap(wisdomAdmApiClient.findByloginValid(token));
	}
}
