package com.seegene.main.domain.mypage.controller;

import com.seegene.main.domain.mypage.dto.*;
import com.seegene.main.domain.mypage.service.MypageService;
import com.seegene.main.global.auth.PlatformUserInfo;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
/**
 * 마이페이지
 * <PRE>
 * </PRE>
 * @author   : leesolyi@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-06-29        lsy        최초작성
 * </PRE>
 */
@Tag(name="mypage", description = "마이페이지 API, 담당자 : 심태섭")
@RequestMapping("/mypage")
@RequiredArgsConstructor
@RestController
public class MypageController {

	private final MypageService mypageService;

	@Operation(summary = "[IFM001] 회원 기본 정보 조회, [IFM006] 회원 로그인 기록 조회 [완료] 8/25", description = "회원의 기본 정보를 조회합니다.")
	@GetMapping("/myinfo/{id}/detail")
	public MypageResponse getMyInfo(
		@Parameter(description = "User Uid", example = "F59301A1304511EEBF4902D5D06DD9EE") @PathVariable(value = "id") String id
	){
		return mypageService.getMyInfo(id);
	}

	@Operation(summary = "[IFM002] 사용자 역할 및 관리자 역할 정보를 조회 [완료] 8/25", description = "사용자 역할 및 관리자 역할 정보를 조회합니다.")
	@GetMapping("/myinfo/rule")
	public MyInfoRoleResponse getMyRollsInfo(){
		return mypageService.getMyInfoRole();
	}

	@Operation(summary = "[IFM003] 회원 정보 수정 [완료] 8/25", description = "회원 정보 수정을 합니다.")
	@PostMapping("/myinfo/{id}/modify")
	public void updateMyInfo(
		@Parameter(description = "User Uid", example = "F59301A1304511EEBF4902D5D06DD9EE") @PathVariable(value = "id") String id,
		@RequestBody MyInfoRequest myInfoRequest)
	{
		mypageService.updateMyInfo(id, myInfoRequest);
	}

	@Operation(summary = "[IFM004] 회원 사용자 역할 요청 등록 [완료] 8/25", description = "회원의 사용자 역할을 수정 합니다.")
	@PostMapping("/myinfo/user-rule/{id}/request")
	public void requestMyUserRule(
		@Parameter(description = "User Uid", example = "F59301A1304511EEBF4902D5D06DD9EE") @PathVariable(value = "id") String id,
		@RequestBody MyInfoRoleRequest myInfoRoleRequest,
		PlatformUserInfo user
	){
		mypageService.createUserRuleReq(id, myInfoRoleRequest,user);
	}

	@Operation(summary = "[IFM005] 회원 사용자 어드민 역할 요청 등록 [완료] 8/25", description = "회원의 어드민 역할을 수정 합니다.")
	@PostMapping("/myinfo/admin-rule/{id}/request")
	public void requestMyAdminRule(
		@Parameter(description = "User Uid", example = "F59301A1304511EEBF4902D5D06DD9EE") @PathVariable(value = "id") String id,
		@RequestBody MyInfoRoleRequest myInfoRoleRequest,
		PlatformUserInfo user
	){
		mypageService.createAdminRuleReq(id, myInfoRoleRequest,user);
	}

//	@Operation(summary = "[IFM006] 회원 로그인 기록 조회", description = "회원 로그인 기록을 조회 합니다.")
//	@GetMapping("/myingo-log/list")
//	public Page<LoginLogResponse> getMyInfoLoginHistory(
//		@Parameter(description = "페이지-공통")Pageable pageable){
//		return mypageService.selectLoginLog(pageable);
//	}

	// @Operation(summary = "[IFM007] 탈퇴 약관 및 안내문구 목록 조회",description = " 탈퇴 약관 및 안내문구 목록을 조회 합니다.")
	// @GetMapping("/withdrawal/info")
	// public List<WithdrawalResponse> getWithdrawalInfo(){
	// 	return mypageService.selectTermsConditions();
	// }

	@Operation(summary = "[IFM008] 탈퇴인증 코드 이메일 전송, [IFA009] 탈퇴인증 코드 확인 [완료] 8/25",description = "탈퇴인증을 위한 코드 이메일 전송")
	@GetMapping("/withdrawal/{id}/code")
	public WithdrawalResponse getWithdrawalCodeSend(
		@Parameter(description = "User Uid", example = "F59301A1304511EEBF4902D5D06DD9EE") @PathVariable(value = "id") String id
	){
		return mypageService.getWithdrawalCode(id);
	}

//	@Operation(summary = "[IFA009] 탈퇴인증 코드 확인",description ="탈퇴인증 코드를 확인합니다.")
//	@GetMapping("/withdrawal/code-check")
//	public String getWithdrawalCodeCheck(@RequestParam String withdrawalCode , String emlAddr){
//		return mypageService.codeChack(withdrawalCode,emlAddr);
//
//	}

	@Operation(summary = "[IFA010] 회원 탈퇴 처리 등록 [완료] 8/25",description = "회원탈퇴 처리등록 합니다.")
	@PostMapping("withdrawal/{id}/modify")
	public void updateWithdrawal(
		@Parameter(description = "User Uid", example = "F59301A1304511EEBF4902D5D06DD9EE") @PathVariable(value = "id") String id
	) throws Exception {
		mypageService.updateWithdrawal(id);
	}

	@Operation(summary = "[IFA011] 회원 패스워드 조회 [완료] 8/25", description = "회원 비밀번호를 확인 합니다.")
	@GetMapping("/myinfo/{id}/password")
	public ResultValue getMyPwInfo(
		@Parameter(description = "User Uid", example = "F59301A1304511EEBF4902D5D06DD9EE") @PathVariable(value = "id") String id,
		@Parameter(description = "현재 회원 비밀번호", example = "") @RequestParam(value = "loginPwd") String loginPwd
	){
		return mypageService.getPwdInfo(id, loginPwd);
	}

	@Operation(summary = "[IFA012] 회원 비밀번호 수정 [완료] 8/25",description = "회원 비밀번호를 수정 합니다. ")
	@PostMapping("/myinfo/password/{id}/modify")
	public void updatePw(
		@Parameter(description = "User Uid", example = "F59301A1304511EEBF4902D5D06DD9EE") @PathVariable(value = "id") String id,
		@Parameter(description = "현재 회원 비밀번호", example = "") @RequestParam(value = "loginPwd") String loginPwd,
		@Parameter(description = "새 회원 비밀번호", example = "") @RequestParam(value = "newPwd") String newPwd
	){
		mypageService.updatePwd(id, loginPwd, newPwd);
	}

}
