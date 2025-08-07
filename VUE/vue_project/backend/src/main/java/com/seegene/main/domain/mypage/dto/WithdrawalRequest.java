package com.seegene.main.domain.mypage.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Schema(description = "탈퇴 회원 Request")
@Getter
@Builder
public class WithdrawalRequest {

	// @Schema(description = "이메일 주소", example = "inition@seegene.co.kr",requiredMode = Schema.RequiredMode.REQUIRED)
	// private String emailId;
	//
	// @Schema(description = "약관동의유무", example = "Y",requiredMode = Schema.RequiredMode.REQUIRED)
	// private String agreeYn;

}
