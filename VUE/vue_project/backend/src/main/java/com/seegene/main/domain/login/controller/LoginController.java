package com.seegene.main.domain.login.controller;

import java.util.List;
import java.util.Locale;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seegene.main.domain.login.dto.LoginApprovalResponse;
import com.seegene.main.domain.login.dto.LoginFailedResponse;
import com.seegene.main.domain.login.dto.LoginFindAuthenticateRequest;
import com.seegene.main.domain.login.dto.LoginInactiveRequest;
import com.seegene.main.domain.login.dto.LoginInquiryRequest;
import com.seegene.main.domain.login.dto.LoginPasswordSettingRequest;
import com.seegene.main.domain.login.dto.LoginValidResponse;
import com.seegene.main.domain.login.dto.LoginVerifyAuthenticateRequest;
import com.seegene.main.domain.login.dto.WakeupAccountResponse;
import com.seegene.main.domain.login.service.LoginService;
import com.seegene.main.global.auth.PlatformUserInfo;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * 로그인
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-06-29        khhong        최초작성
 * </PRE>
 */
@Tag(name="login", description = "Login API, API 담당자: 홍기환")
@RequestMapping("/login")
@RequiredArgsConstructor
@RestController
public class LoginController {

	private final LoginService loginService;

	@Operation(summary = "[IFM147] 로그인 문의 등록, API 담당자: 홍기환, [완료] + 피그마 대응 현행화 20230825", description = "로그인의 문의하기 이메일 전송한다.")
	@PostMapping("/login-inquiry/send")
	public void sendLoginInquiry(@RequestBody LoginInquiryRequest loginInquiryRequest, @RequestParam(value = "lang", defaultValue = "en") Locale locale) {
		loginService.sendInquiryRequest(locale, loginInquiryRequest);
	}

	@Operation(summary = "[IFM109] 로그인 승인여부 조회, API 담당자: 홍기환, [완료] + 피그마 대응 현행화 20230825", description = "로그인 승인 여부를 확인한다.")
	@GetMapping("/login-approval")
	public LoginApprovalResponse getLoginApproval(@Parameter(required = true) @RequestParam(value = "emailId", defaultValue = "seegene1@seegene.com") String emailId) {
		return loginService.getLoginApproval(emailId);
	}

	@Operation(summary = "[IFM110] 비밀번호 재설정 이메일 전송, API 담당자: 홍기환, [완료] + 피그마 대응 현행화 20230825", description = "비밀번호 재설정 이메일을 전송한다.")
	@PostMapping("/find-password/send")
	public void sendEmailForFindPwd(@RequestBody LoginFindAuthenticateRequest loginAuthenticateRequest) {
		loginService.sendfindPwd(loginAuthenticateRequest);
	}

	@Operation(summary = "[IFM111] 사용자 인증코드 확인, API 담당자: 홍기환, [완료] + 피그마 대응 현행화 20230825", description = "사용자가 이메일로 전송받은 인증번호를 입력 후 확인한다.")
	@PostMapping("/verify-number")
	public void getVerifyAuthNumber(@RequestBody LoginVerifyAuthenticateRequest loginVerifyAuthenticateRequest) {
		loginService.getVerifyAuthNumber(loginVerifyAuthenticateRequest);
	}

	@Operation(summary = "[IFM112] 사용자 비밀번호 재설정, API 담당자: 홍기환, [완료] + 피그마 대응 현행화 20230825", description = "사용자가 입력한 비밀번호를 재설정한다.")
	@PostMapping("/reset-password/modify")
	public void updatePwdByUser(@RequestBody LoginPasswordSettingRequest loginPasswordSettingRequest) {
		loginService.updatePwd(loginPasswordSettingRequest);
	}

	@Operation(summary = "[IFM113] 휴면계정안내 조회, API 담당자: 홍기환, [완료] + 피그마 대응 현행화 20230825", description = "휴면(1년 이상 미접속) 계정 안내 화면을 보여준다. ")
	@GetMapping("/inactive-account/user")
	public WakeupAccountResponse getInactiveAccount(@Parameter(required = true) @RequestParam(value = "emailId", defaultValue = "seegene1@seegene.com") String emailId) {
		return loginService.getInactiveAccount(emailId);
	}

	@Operation(summary = "[IFM114] 휴면계정 인증코드 이메일 전송, API 담당자: 홍기환, [완료] + 피그마 대응 현행화 20230825", description = "휴면 해제를 위한 이메일 전송한다.")
	@PostMapping("/inactive-account/{emailId}/send")
	public void sendApplyInactiveAccountEmail(@Parameter(required = true, name = "emailId", description = "이메일 아이디 (seegene1@seegene.com)") @PathVariable(value = "emailId") String emailId) {
		loginService.sendEmailAuthApply(emailId);
	}

	@Operation(summary = "[IFM115] 휴면 사용자 계정 상태변경, API 담당자: 홍기환, [완료] + 피그마 대응 현행화 20230825", description = "휴면 해제를 위한 인증번호 입력 후 휴면 계정 상태를 변경한다.")
	@PostMapping("/inactive-account/verify")
	public void updateVerifyAndAccountActivate(@RequestBody LoginInactiveRequest loginInactiveRequest) {
		loginService.updateVerifyAndAccountActivate(loginInactiveRequest);
	}

	@Operation(summary = "[IFM138] 사용자 로그인 검증 조회, API 담당자: 홍기환, [진행중] ", description = "로그인 후 사용자의 상태에 따라 분기처리하기 위한 정보를 제공한다.")
	@GetMapping("/login-valid")
	public LoginValidResponse getUserInfoValidList(PlatformUserInfo user) {
		return loginService.getUserInfoValidList(user);
	}

	@Operation(summary = "[IFM139] 사용자 로그인 이력 등록, API 담당자: 홍기환, [완료]", description = "로그인 후 사용자 로그인 이력을 추가한다.")
	@PostMapping("/login-history")
	public void createUserLoginHistory(@RequestHeader("cloudfront-viewer-address") String address,
		@RequestHeader("cloudfront-viewer-city") String city,
		@RequestHeader("cloudfront-viewer-country") String country,
		@RequestHeader("cloudfront-viewer-country-name") String countryName,
		@RequestHeader("cloudfront-viewer-country-region-name") String countryRegionName,
		@RequestHeader("cloudfront-viewer-time-zone") String timezone,
		PlatformUserInfo user) {
		loginService.createUserLoginHistory(user, address, city, country, countryName, countryRegionName, timezone);
	}

	@Operation(summary = "[IFM148] 사용자 로그인 비밀번호 횟수 조회, API 담당자: 홍기환, [완료] ", description = "로그인 시 사용자의 비밀번호 횟수를 조회한다.")
	@GetMapping("/user-pwd-count")
	public LoginFailedResponse getUserPasswordFailedCount(@Parameter(required = true) @RequestParam(value = "emailId") String emailId) {
		return loginService.getUserPasswordFailedCount(emailId);
	}
}
