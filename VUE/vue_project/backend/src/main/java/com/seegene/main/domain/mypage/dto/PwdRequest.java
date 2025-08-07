package com.seegene.main.domain.mypage.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PwdRequest {

	@JsonProperty("loginPassword")
	@Schema(description = "현재 회원 비밀번호", example = "xxxx",requiredMode = Schema.RequiredMode.REQUIRED)
	private String loginPassword;

	@JsonProperty("newPassword")
	@Schema(description = "새 회원 비밀번호", example = "xxxx",requiredMode = Schema.RequiredMode.REQUIRED)
	private String newPassword;

	@JsonProperty("emailId")
	@Schema(description = "이메일 주소", example = "inition@seegene.co.kr")
	private String emailId;

}
