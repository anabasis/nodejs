package com.seegene.main.domain.project.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.project.entity.TpjPrjPrcsMbr;
import com.seegene.main.domain.software.dto.SoftwareFileResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Schema(description = "프로젝트 멤버 상세정보 Response")
@Builder
public class ProjectMemberDetailResponse {

	@JsonProperty("memberId")
	@Schema(description = "사용자 uid", example = "")
	private String memberId;

	@JsonProperty("usrNm")
	@Schema(description = "이름", example = "이니션")
	private String usrNm;

	@JsonProperty("filePath")
	@Schema(description = "프로필파일 정보")
	private String filePath;

	@JsonProperty("orgnNm")
	@Schema(description = "소속조직", example = "생산시약1팀")
	private String orgnNm;

	@JsonProperty("jobTitle")
	@Schema(description = "직급", example = "section chief")
	private String jobTitle;

	@JsonProperty("projectManagerYn")
	@Schema(description = "프로젝트 역할", example = "PJM")
	private String projectManagerYn;

	@JsonProperty("guestYn")
	@Schema(description = "게스트 여부", example = "Y")
	private String guestYn;

	@JsonProperty("memberProcess")
	@Schema(description = "프로세스 권한 리스트", example = "EDIT")
	private List<ProcessRoleResponse> processRoleList;



}
