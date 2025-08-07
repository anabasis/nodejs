package com.seegene.main.domain.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "프로젝트 멤버 조회 Request")
public class ProjectMemberRequest {

	@JsonProperty("emlId")
	@Schema(description = "이메일 주소", example = "inition@seegene.co.kr",requiredMode = Schema.RequiredMode.REQUIRED)
	private String emlId;

	@JsonProperty("usrNm")
	@Schema(description = "이름", example = "이니션")
	private String usrNm;

	@JsonProperty("orgnNm")
	@Schema(description = "소속조직", example = "생산시약1팀",requiredMode = Schema.RequiredMode.REQUIRED)
	private String orgnNm;

}
