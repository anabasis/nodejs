package com.seegene.main.domain.mypage.dto;


import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Schema(description = "회원정보 수정 Request")
@Getter
@Builder
public class MyInfoModifyRequest {

	@JsonProperty("positionName")
	@Schema(description = "직급", example = "대리")
	private String positionName;

	@JsonProperty("fullName")
	@Schema(description = "이름", example = "이니션" ,requiredMode = Schema.RequiredMode.REQUIRED)
	private String fullName;

	@JsonProperty("organizationName")
	@Schema(description = "소속조직", example = "생산시약1팀")
	private String organizationName;

}
