package com.seegene.main.domain.project.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "프로세스 권한 변경 Response")

public class ProjectAuthorityDetailResponse {

	@JsonProperty("id")
	@Schema(description = "요청번호", example = "1")
	private long id;

	@JsonProperty("prjRolCd")
	@Schema(description = "프로젝트 롤 코드", example = "DVP")
	private String prjRolCd;

	@JsonProperty("reqResnCont")
	@Schema(description = "신청 사유", example = "신청사유입니다.")
	private String reqResnCont;

	@JsonProperty("userNm")
	@Schema(description = "회원 이름", example = "이니션")
	private String userNm;

	@JsonProperty("orgnNm")
	@Schema(description = "부서", example = "인실리코")
	private String orgnNm;

	@JsonProperty("currentPrcsAuth")
	@Schema(description = "현재 권한유형", example = "")
	private List<ProcessRoleResponse> currentPrcsAuth;

	@JsonProperty("prcsAuth")
	@Schema(description = "변경 권한유형", example = "")
	private List<ProcessRoleResponse> prcsAuth;

	@JsonProperty("filePath")
	@Schema(description = "프로필파일 정보")
	private String filePath;

	@JsonProperty("approvalCode")
	@Schema(description = "요청 결과 코드", example = "APV")
	private String approvalCode;

	@JsonProperty("reqTpCd")
	@Schema(description = "요청 타입 코드", example = "RQJ")
	private String reqTpCd;

}
