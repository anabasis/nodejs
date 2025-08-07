package com.seegene.main.domain.join.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seegene.main.domain.join.dto.JoinInviteRequest;
import com.seegene.main.domain.join.dto.JoinInviteResponse;
import com.seegene.main.domain.join.dto.JoinRegPasswordRequest;
import com.seegene.main.domain.join.dto.JoinSignupRequest;
import com.seegene.main.domain.join.dto.TusTermsAgrResponse;
import com.seegene.main.domain.join.service.JoinService;
import com.seegene.main.global.auth.PlatformUserInfo;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

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
 *   1 2023-07-03        khhong        최초작성
 * </PRE>
 */
@Tag(name="join", description = "Join API, API 담당자: 홍기환")
@RequestMapping("/join")
@RequiredArgsConstructor
@RestController
public class JoinController {

	private final JoinService joinService;

	@Operation(summary = "[IFM116] 약관 동의한 이메일 정보를 확인, API 담당자: 홍기환, [완료] + 피그마 대응 현행화 20230825", description = "약관 동의한 이메일 정보를 확인 확인한다.")
	@GetMapping("/agreement/confirm-email")
	public List<TusTermsAgrResponse> getJoinConfirmEmail(@RequestParam String emailId) {
		return joinService.getJoinConfirmEmail(emailId);
	}

	@Operation(summary = "[IFM117] 약관 동의 정보 조회-HQ, API 담당자: 홍기환, [미사용] ", description = "HQ-약관 동의 정보를 조회한다.")
	@GetMapping("/agreement-info/hq-list")
	public List<JoinInviteResponse> getAgreementHqList(PlatformUserInfo platformUserInfo, @Parameter(required = true) @RequestParam(value = "langCode") String langCode) {
		return joinService.getAgreementHqList(platformUserInfo, langCode);
	}

	@Operation(summary = "[IFM149] 약관 동의 정보 조회-HQ 및 NewCo, API 담당자: 홍기환, [완료] ", description = "NEWCO-약관 동의 정보를 조회한다.")
	@GetMapping("/agreement-info/list")
	public List<JoinInviteResponse> getAgreementList(@Parameter(required = true) @RequestParam(value = "emailId") String emailId, @Parameter(required = true) @RequestParam(value = "langCode") String langCode) {
		return joinService.getAgreementList(emailId, langCode);
	}

	@Operation(summary = "[IFM118] 약관 동의 정보 등록, API 담당자: 홍기환, [완료] + 피그마 대응 현행화 20230825", description = "wisdom 시스템 연동을 위한 약관 동의를 등록한다.")
	@PostMapping("/agreement/add")
	public void createAgreement(@RequestBody List<JoinInviteRequest> joinInviteRequestList) {
		joinService.createAgreement(joinInviteRequestList);
	}

	@Operation(summary = "[IFM119] 약관 동의 정보 상세 조회, API 담당자: 홍기환, [완료] + 피그마 대응 현행화 20230825", description = "약관 동의 정보를 상세 조회한다.")
	@GetMapping("/agreement/detail")
	public TusTermsAgrResponse getAgreementDetail(@RequestParam String termsVerNum, @RequestParam String langCd) {
		return joinService.getAgreementDetail(termsVerNum, langCd);
	}

	@Operation(summary = "[IFM120] 직접가입-이메일 중복체크 및 도메인 등록 여부, API 담당자: 홍기환, [완료]", description = "이메일 중복체크 및 도메인 등록 여부를 확인한다.")
	@GetMapping("/user-email/{emailId}")
	public void getValidUserEmail(@PathVariable String emailId) {
		joinService.getValidUserEmail(emailId);
	}

	@Operation(summary = "[IFM121] 직접가입-비밀번호 등록, API 담당자: 홍기환, [미사용]", description = "직접 가입 사용자의 비밀번호를 등록한다.")
	@PostMapping("/user-password/add")
	public void createUserPwdSetting(@RequestBody JoinRegPasswordRequest joinRegPasswordRequest) {
		joinService.createUserPwdSetting(joinRegPasswordRequest);
	}

	@Operation(summary = "[IFM122] 직접가입-회원정보 등록, API 담당자: 홍기환, [완료]", description = "회원 정보를 등록한다.")
	@PostMapping("/user-signup/add")
	public void createUserSignUp(@RequestBody JoinSignupRequest joinSignupRequest) {
		joinService.createUserSignUp(joinSignupRequest);
	}
}