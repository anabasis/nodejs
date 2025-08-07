package com.seegene.main.domain.project.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Schema(description = "프로젝트 권한/참여 요청 Request")
@NoArgsConstructor
public class ProjectAuthorityRequest {

	@JsonProperty("id")
	@Schema(description = "프로젝트아이디", example = "시약개발 테스트",requiredMode = Schema.RequiredMode.REQUIRED)
	private long id;

	@JsonProperty("reqResnCont")
	@Schema(description = "신청사유", example = "개발진행 사항을 보기위해서")
	private String reqResnCont;

	@JsonProperty("processCodeList")
	@Schema(description = "프로세스", example = "",requiredMode = Schema.RequiredMode.REQUIRED)
	private List<ProcessRoleRequest> processCodeList;

	@JsonProperty("prjRolCd")
	@Schema(description = "프로젝트 롤 코드", example = "PJB",requiredMode = Schema.RequiredMode.REQUIRED)
	private String prjRolCd;

	@JsonProperty("projectReqPurposeList")
	@Schema(description = "신청 목적", example = "[\"RPS01\", \"RPS02\"]")
	private List<String> projectReqPurposeList;

	@JsonProperty("approvalCode")
	@Schema(description = "요청 결과 코드", example = "APV")
	private String approvalCode;

}
