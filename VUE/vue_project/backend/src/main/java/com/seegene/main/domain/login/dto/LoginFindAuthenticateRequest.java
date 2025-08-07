package com.seegene.main.domain.login.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 로그인 - 비밀번호 재설정 Request DTO
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
@Schema(description = "로그인 비밀번호 재설정 Request DTO")
@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginFindAuthenticateRequest {

	@JsonProperty("emailId")
	@Schema(description = "이메일주소", example = "sample@email.com", requiredMode = REQUIRED)
	private String emailId;

	@JsonProperty("authType")
	@Schema(description = "발송 인증타입", example = "eml or sms", requiredMode = REQUIRED)
	private String authType;

	@JsonProperty("idtfVerfCode")
	@Schema(description = "인증 타입", defaultValue = "IDV03",  example = "휴면회원 복원 인증-IDV01, 탈퇴인증-IDV02, 비밀번호 재설정 인증-IDV03", requiredMode = REQUIRED)
	private String idtfVerfCode;
}
