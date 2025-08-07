package com.seegene.main.domain.external.controller;

import com.seegene.main.domain.common.dto.UserDetailResponse;
import com.seegene.main.domain.common.service.CommonService;
import com.seegene.main.domain.external.dto.GuideListResponse;
import com.seegene.main.domain.external.dto.NotiSenderRequest;
import com.seegene.main.domain.external.dto.ProjectProcessInfoResponse;
import com.seegene.main.domain.external.dto.VistPageRequest;
import com.seegene.main.domain.external.service.ExternalService;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.dto.ExternalMailSenderDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 외부 호출 API
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-09-13        khhong        최초작성
 *   2 2023-09-14        jhsong        알림메시지 추가
 * </PRE>
 */
@Tag(name="external", description = "External API - 외부 연동에 필요한 내용을 관리한다.")
@RequestMapping("/external")
@RequiredArgsConstructor
@RestController
public class ExternalController {
	private final ExternalService externalService;

	private final CommonService commonService;

	@Operation(summary = "[EXM001] 외부연동 - 메일 발송, API 담당자: 홍기환, [완료]", description = "외부에서 전달받은 메일 포맷을 이용하여 메일을 발송한다.")
	@PostMapping("/mail-send")
	public void mailSend(@RequestBody ExternalMailSenderDto externalMailSenderDto) {
		externalService.mailSend(externalMailSenderDto);
	}

	@Operation(summary = "[EXM002] 외부연동 - 알림 메시지 발송, 담당자: 송주헌, [완료]", description = "알림메시지를을 발송한다.")
	@PostMapping("/noti-send")
	public void sendNotification(PlatformUserInfo user, @RequestBody NotiSenderRequest notiSenderRequest) {
		externalService.sendNotification(notiSenderRequest, user);
	}

	@Operation(summary = "[EXM003] 외부연동 - 사용자 별 프로젝트 프로세스 권한 정보조회, 담당자: 홍기환, [완료]", description = "사용자가 속해있는 권한정보 및 프로젝트 프로세스에 대한 권한 정보를 조회한다.")
	@GetMapping("/project-process-info")
	public List<ProjectProcessInfoResponse> getProjectProcessInfo(PlatformUserInfo user) {
		return externalService.getProjectProcessInfo(user);
	}

	@Operation(summary = "[EXM004] 외부연동 - 사용자 별 프로젝트 프로세스 권한 확인 정보조회, 담당자: 홍기환, [완료]", description = "리퀘스트 생성 버튼 클릭시 해당 작업에 대해서 권한체크를 한다. ")
	@GetMapping("/project-process-role-check")
	public ProjectProcessInfoResponse getProjectProcessRoleCheck(PlatformUserInfo user,
		@Parameter(name = "prjectId", example ="100198" ,description = "프로젝트 아이디") @RequestParam Long prjectId,
		@Parameter(name = "processId", example ="10310" ,description = "프로세스 아이디") @RequestParam Long processId,
		@Parameter(name = "procsRoleCode", example ="EDIT" ,description = "프로젝트 프로세스 권한 코드") @RequestParam String procsRoleCode) {
		return externalService.getProjectProcessRoleCheck(user, prjectId, processId, procsRoleCode);
	}
	@Operation(summary = "[EXM005] 외부연동 - 최근 방문한 페이지 등록, 담당자: 송주헌, [완료]", description = "알림메시지를을 발송한다.")
	@PostMapping("/vist-send")
	public void sendVistPage(PlatformUserInfo user, @RequestBody VistPageRequest vistPageRequest) {
		externalService.sendVistPage(vistPageRequest, user);
	}
	@Operation(summary = "[EXM006] 구글 리캡챠 토큰 검증, 담당자 : 송주헌, [완료]", description = "시크릿키를 이용하여 구글 리캡챠 토큰을 검증한다.")
	@PostMapping("/token")
	public Map<String, Object> verifyToken(
		@Parameter(name = "token", example ="token sample" ,description = "google 토큰") @RequestParam String token) {
		return externalService.verifyToken(token);

	}

	// AB#22818
	@Operation(summary = "[EXM007] 상세지침서 목록 조회 / 담당자 : 유승엽", description = "상세 지침서 목록을 보여준다.")
	@GetMapping(path = "/guidemanagement/list")
	public List<GuideListResponse> getGuideManageMentList(
			@Parameter(name = "parameterValue", example ="/project/detail/?id=100198" ,description = "상세지침서 Parameter value")
			@RequestParam String parameterValue
	) {
		return externalService.getGuideManageMentList(parameterValue);
	}

	@Operation(summary = "사용자 정보 조회 API", description = "현재 사용자 정보를 조회 한다.")
	@GetMapping(path = "/login-user/detail")
	public UserDetailResponse getUserDetail(
			PlatformUserInfo user
	){
		return commonService.getUserDetail(user.getUsrUid());
	}

}
