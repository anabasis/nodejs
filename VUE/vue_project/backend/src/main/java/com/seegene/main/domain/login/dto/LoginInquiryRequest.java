package com.seegene.main.domain.login.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

/**
 * 로그인 문의하기 Request DTO
 * <PRE>
 * </PRE>
 * @author   : @mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1                 최초작성
 * </PRE>
 */
@Schema(description = "로그인 문의하기 Request DTO")
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginInquiryRequest {

	@JsonProperty("accountType")
	@Schema(description = "계정 유형", example = "계정 유형(seegene, newco)", requiredMode = REQUIRED)
	private String accountType;

	@JsonProperty("inquiryType")
	@Schema(description = "문의유형", example = "로그인 관련, 가입 승인 관련, OTP 인증, 기타", requiredMode = REQUIRED)
	private String inquiryType;

	@JsonProperty("inquirySubject")
	@Schema(description = "문의제목", maxLength = 100, example = "문의 제목입니다.", requiredMode = REQUIRED)
	private String inquirySubejct;

	@JsonProperty("inquiryContent")
	@Schema(description = "문의내용", example = "문의 내용입니다.", requiredMode = REQUIRED)
	private String inquiryContent;

	@JsonProperty("emailId")
	@Schema(description = "이메일주소(수신자)", example = "inquiry@seegene.com", requiredMode = REQUIRED)
	private String emailId;
}
