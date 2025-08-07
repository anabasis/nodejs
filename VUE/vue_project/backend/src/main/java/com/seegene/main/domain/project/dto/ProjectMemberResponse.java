package com.seegene.main.domain.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(description = "프로젝트 멤버 조회 Response")
public class ProjectMemberResponse {

	@JsonProperty("usrUid")
	@Schema(description = "사용자 uid", example = "")
	private String usrUid;

	@JsonProperty("filePath")
	@Schema(description = "프로필파일 정보")
	private String filePath;

	@JsonProperty("emlId")
	@Schema(description = "이메일 주소", example = "inition@seegene.co.kr")
	private String emlId;

	@JsonProperty("usrNm")
	@Schema(description = "이름", example = "이니션")
	private String usrNm;

	@JsonProperty("orgnNm")
	@Schema(description = "소속조직", example = "생산시약1팀")
	private String orgnNm;

	@JsonProperty("jobTitle")
	@Schema(description = "직급", example = "section chief")
	private String jobTitle;
}
