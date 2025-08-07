package com.seegene.main.domain.common.controller;

import com.seegene.main.domain.common.dto.*;
import com.seegene.main.domain.common.service.CommonService;
import com.seegene.main.domain.user.dto.NewCoInviteResponse;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.config.annotation.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/common")
@RequiredArgsConstructor
@Tag(name = "CommonController", description = "common API")
public class CommonController {
	private final CommonService commonService;
	@Operation(summary = "[임시] 공통코드 아이템 목록 조회 담당자: 유승엽 [완료]", description = "공통코드 아이템 목록을 조회한다.")
	@GetMapping(path = "/code/{grpId}/item-list")
	@Parameter(name = "grpId", description = "공통 그룹 ID", example = "PJ006", required = true)
	public List<CommonCodeItemResponse> getCodeItemList(@PathVariable String grpId,
														PlatformUserInfo user
														){

		return commonService.getCodeItemList(grpId, user);
	}
	@Operation(summary = "[임시]국가 목록 조회 담당자: 유용태 [완료]", description = "국가 목록을 조회한다.")
	@GetMapping(path = "/country-list")
	public List<CommonCountryResponse> getCountryList(){
		return commonService.getCountryList();
	}
	@Operation(summary = "공통 Usr LNB 사용자 리스트 조회 담당자: 유용태 [완료]", description = " 사용자 lnb 사이드바 메뉴를 조회한다")
	@GetMapping(path = "/side-bar/usr/lnb/list")
	public List<AuthorityRoleMenuResponse> getAdmMenuInfo(
			PlatformUserInfo user
	){
		return commonService.getUsrLnbList(user.getLangCode(), user.getUsrUid());
	}
	@Operation(summary = "[IFM142] 로그인 사용자 정보 조회 API", description = "로그인 사용자 정보를 조회 한다.")
	@GetMapping(path = "/login-user/detail")
	public UserDetailResponse getUserDetail(
			PlatformUserInfo user
	){
		return commonService.getUserDetail(user.getUsrUid());
	}


	@Operation(summary = "공통 adm GNB 리스트 조회 담당자: 유용태 [완료]", description = "공통 사용자 GNB 리스트를 조회 한다.")
	@GetMapping(path = "/side-bar/usr/gnb/list")
	public List<AuthorityRoleMenuResponse> getAdmGnbMenuInfo(PlatformUserInfo user){
		return commonService.getUsrGnbList(user.getLangCode(), user.getUsrUid());
	}

	@Operation(summary = "공통 API(초대가입 취소 여부 조회) 담당자 : 이솔이 [완료]", description = "초대가입을 취소했을 경우, 취소되었는지 확인")
	@GetMapping(path = "/user/invite-Cancel-check")
	public NewCoInviteResponse inviteRejectCheck(
		@Parameter(name = "userInvtUid", description = "초대 아이디", example = "1860187D771643A5AB3776A0B63FE252")  @RequestParam(required = false) String userInvtUid){
		return commonService.inviteRejectCheck(userInvtUid);
	}


	@Operation(summary = "(PRV) get presigned 생성 담당자 : 유승엽", description = "private get object presigned url")
	@GetMapping(path = "/s3/prv/get-url")
	public String getPreSignedUrl(
			@Parameter(
					name ="key",
					description = "파일 key ( 디렉토리명 + 파일명 + 확장자 )",
					example = "TSW_SW/4EA02F48DF264181B09BBA3EAF55EB14.png",
					required = true
			)
			String key,
			@Parameter(name ="expireSecondTime", description = "만료 시간 (초 단위)", example = "30", required = true)
			String expireSecondTime
	) {
		return commonService.getPreSignedUrl(key, expireSecondTime);
	}

	// AB#21841
	@Operation(summary = "(PUB / PRV) put presigned url 생성 담당자 : 유승엽", description = "public / private presigned url 생성")
	@PostMapping(path = "/s3/all/put-url")
	public List<S3PreSignedUrlResponse> getPutPreSignedUrl(
			PlatformUserInfo user,
			@RequestBody @Valid List<S3PreSignedUrlRequest> s3PreSignedUrlRequestList
	) {
		return commonService.getPutPreSignedUrl(s3PreSignedUrlRequestList, user);
	}

	// AB#21844
	@Operation(summary = "(PUB / PRV) preSigned 후처리 파일 저장 담당자 : 유승엽 ", description = "public / private 파일정보 DB 적재")
	@PostMapping(path = "/s3/all/upload", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<FileNumberResponse> createS3FileData(@RequestBody List<S3FileCreateRequest> s3FileCreateRequest) {
		return commonService.createS3FileData(s3FileCreateRequest);
	}

	@Operation(summary = "S3 파일 키 조회 : 유승엽 ", description = "file (TsyFl) 번호로 파일 키 조회")
	@GetMapping(path = "/s3/key", produces = MediaType.APPLICATION_JSON_VALUE)
	public S3KeyResponse getS3FileKey(
			@Parameter(name ="fileNumber", description = "파일 (TsyFl) 번호", example = "200152", required = true)
			Long fileNumber
	) {
		return commonService.getS3FileKey(fileNumber);
	}

	@Operation(summary = "[22753] S3 파일 다운로드 : 유용태", description = "파일 리스트를 다운로드한다.")
	@PostMapping(path = "/s3/all/downloads", produces = MediaType.APPLICATION_JSON_VALUE)
	public void download(
		PlatformUserInfo user,
		HttpServletResponse response,
		@RequestBody @Valid List<FileDownloadRequest> list
	){
		commonService.getDownloadFiles(response, list);
	}
}
