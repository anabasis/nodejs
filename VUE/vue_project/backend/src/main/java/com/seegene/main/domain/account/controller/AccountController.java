package com.seegene.main.domain.account.controller;

import com.seegene.main.domain.account.dto.*;
import com.seegene.main.domain.account.service.AccountService;
import com.seegene.main.global.auth.PlatformUserInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-06-29        khhong        최초작성
 * </PRE>
 */
@Tag(name="account", description = "통합설정 API (유승엽)")
@RequestMapping("/account")
@RequiredArgsConstructor
@RestController
public class AccountController {

	private final AccountService accountService;

	// AB#19554
	@Operation(summary = "[IFM014] 약관 정보 목록 조회 [완료] 23.08.25", description = "약관정보 목록을 조회한다.")
	@GetMapping("/terms/list")
	public List<AccountTermsListResponse> getTermsList(
			@RequestHeader(value = "cloudfront-viewer-country", defaultValue = "KR") String country,
			PlatformUserInfo user
	) {
		return accountService.getTermsList(user, country);
	}

	// AB#19559
	@Operation(summary = "[IFM015] 해당 약관 국가 그룹 정보 조회 [완료] 23.08.25", description = "해당 약관 국가 그룹 정보 조회")
	@GetMapping("/terms/countryGroup")
	public  List<TermsCountryGroupListResponse> getTermsCountryGroup(
			@Parameter(name = "categoryCd",example ="TM02" ,description = "약관 카테고리 코드") String categoryCd
	) {
		return accountService.getTermsCountryGroupList(categoryCd);
	}

	// AB#19559
	@Operation(summary = "[IFM015] 약관 정보 상세 조회 필터 [완료] 23.08.25", description = "약관정보를 상세 조회한다.")
	@GetMapping("/terms/filter")
	public List<TermsFilterResponse> getTermsFilter(
			@Parameter(name = "categoryCd",example ="TM02" ,description = "약관 카테고리 코드") String categoryCd,
			@Parameter(name = "countryGroupId",example ="CG0003" ,description = "조회할 국가그룹 코드") String countryGroupId,
			@Parameter(name = "version",example = "1.7", description = "버전 필터") @RequestParam(required = false) String version
	) {
		return accountService.getTermsFilter(categoryCd, countryGroupId, version);
	}


	// AB#19559
	@Operation(summary = "[IFM015] 약관 정보 상세 조회 [완료] 23.08.25", description = "약관정보를 상세 조회한다.")
	@GetMapping("/terms/detail")
	public TermsResponse getTermsDetail(
			@Parameter(name = "categoryCode",example ="TM02" ,description = "약관 카테고리 코드") String categoryCode,
			@Parameter(name = "countryGroupId",example ="CG0003" ,description = "조회할 국가그룹 코드") @RequestParam(required = false) String countryGroupId,
			@Parameter(name = "version",example ="2.0" ,description = "약관버전") @RequestParam(required = false) String version,
			@Parameter(name = "languageCode",example ="ko" ,description = "약관 언어") @RequestParam(required = false) String languageCode,
			PlatformUserInfo user
	) {
		return accountService.getTermsDetail(categoryCode, countryGroupId, version, languageCode, user);
	}

	// AB#19564
	@Operation(summary = "[IFM016] 라이선스 목록 조회 [완료] 23.08.25", description = "라이선스 목록을 조회한다.")
	@GetMapping("/license/list")
	public List<LicenseListResponse> getLicenseList(
			PlatformUserInfo user
	) {
		return accountService.getLicenseList(user);
	}

	// AB#19569
	@Operation(summary = "[IFM017] 라이선스 정보 상세조회 [완료] 23.08.25", description = "라이선스 정보를 상세 조회한다.")
	@GetMapping("/license/detail")
	public LicenseDetailResponse getLicenseDetail(
			@Parameter(name = "licenseNumber", example = "11016", description = "라이선스 고유 아이디")
			long licenseNumber,
			PlatformUserInfo user
	) {
		return accountService.getLicenseDetail(licenseNumber, user);
	}

	// AB#19574
	@Operation(summary = "[IFM018] 현재 사용언어 조회 [완료] 23.08.25", description = "사용언어 정보를 수정한다.")
	@GetMapping("/language")
	public String getLanguageInfo(
			PlatformUserInfo user
	) {
		return accountService.getLanguageInfo(user);
	}

	// AB#19574
	@Operation(summary = "[IFM018] 사용 가능 언어 리스트 조회 [완료] 23.08.25", description = "사용언어 정보를 수정한다.")
	@GetMapping("/language/list")
	public List<LanguageResponse> getLanguageList() {
		return accountService.getLanguageList();
	}

	// AB#19574
	@Operation(summary = "[IFM018] 사용언어 정보 수정 [완료] 23.08.25", description = "사용언어 정보를 수정한다.")
	@PostMapping("/language/modify")
	public void updateLanguageInfo(
			PlatformUserInfo user,
			@RequestBody AccountUpdateLanguageRequest accountUpdateLanguageRequest
	) {
		accountService.updateLanguageInfo(accountUpdateLanguageRequest, user);
	}

	// AB#19579
	@Operation(summary = "[IFM019] 기본 알림정보 및 기타정보 세팅정보 조회 [완료] 23.08.25", description = "회원 기본 알림 정보 및 기타 정보 세팅 정보 조회 한다.")
	@GetMapping("/my-notification-set/info")
	public List<AccountNotfResponse> getMyNotificationSetting(
			PlatformUserInfo user
	) {
		return accountService.getMyNotificationSetting(user);
	}

	// AB#19584
	@Operation(summary = "[IFM020] 기본 알림 정보 및 기타 정보 세팅 정보를 수정 [완료] 23.08.25", description = "회원 기본 알림 정보 및 기타 정보 세팅 정보를 수정한다.")
	@PostMapping("/my-notification-set/modify")
	public void updateMyNotificationSetting(
			PlatformUserInfo user,
			@RequestBody AccountNotiRequest accountNotiRequest
	) {
		accountService.updateMyNotificationSetting(accountNotiRequest, user);
	}

	// AB#22888
	@Operation(summary = "[IFM150] 약관 정보 상세 조회 (로그인 화면용) [완료] 23.08.25", description = "약관정보를 상세 조회한다.")
	@GetMapping("/terms/login/detail")
	public TermsResponse getTermsLoginDetail(
			@Parameter(name = "categoryCode",example ="TM02" ,description = "약관 카테고리 코드") String categoryCode,
			@Parameter(name = "countryGroupId",example ="CG0001" ,description = "조회할 국가그룹 코드 (CG0001 한국)") @RequestParam(required = false) String countryGroupId,
			@Parameter(name = "version",example ="2.0" ,description = "약관버전") @RequestParam(required = false) String version,
			@Parameter(name = "languageCode", example = "en") @Size(min = 2, max = 2, message = "language code 는 2자 입니다") String languageCode
	) {
		return accountService.getTermsLoginDetail(categoryCode, countryGroupId, version, languageCode);
	}
}