package com.seegene.main.domain.login.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

/**
 * 사용자 인증코드 확인 Request DTO
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-26        khhong        최초작성
 * </PRE>
 */
@Schema(description = "사용자 인증코드 확인 Request DTO")
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginVerifyAuthenticateRequest {

	@JsonProperty("emailId")
	@Schema(description = "이메일주소", defaultValue = "ACSG@mz.co.kr", example = "sample@email.com", requiredMode = REQUIRED)
	private String emailId;

	@JsonProperty("idtfVerfCode")
	@Schema(description = "인증 타입", defaultValue = "IDV03",  example = "휴면회원 복원 인증-IDV01, 탈퇴인증-IDV02, 비밀번호 재설정 인증-IDV03", requiredMode = REQUIRED)
	private String idtfVerfCode;

	@JsonProperty("authKey")
	@Schema(description = "인증번호", example = "000000", maxLength = 6, requiredMode = REQUIRED)
	private String authKey;

	public LoginVerifyAuthenticateRequest(String emailId, String idtfVerfCode, String authKey) {
		this.emailId = emailId;
		this.idtfVerfCode = idtfVerfCode;
		this.authKey = authKey;
	}
}
