package com.seegene.main.domain.mypage.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public class PwdResponse {

	@JsonProperty("loginPassword")
	@Schema(description = "회원 비밀번호", example = "xxxx")
	private String loginPassword;

}
