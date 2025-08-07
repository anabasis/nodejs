package com.seegene.main.domain.login.dto;

import static com.seegene.main.domain.login.constant.IdtfVerfCatCode.*;
import static com.seegene.main.domain.login.constant.VerifycationMethodCode.*;
import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.domain.user.entity.TusUsrIdtfVerf;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 로그인 비밀번호 재설정 Request DTO
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-06-30        khhong        최초작성
 * </PRE>
 */
@Schema(description = "로그인 비밀번호 재설정 Request DTO")
@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginAuthenticateRequest {

	@JsonProperty("userUid")
	@Schema(description = "User Uid", example = "User Uid")
	private String userUid;

	@JsonProperty("userName")
	@Schema(description = "계정 이름", example = "홍길동")
	private String userName;

	@JsonProperty("emailId")
	@Schema(description = "이메일주소", example = "sample@email.com", requiredMode = REQUIRED)
	private String emailId;

	@JsonProperty("authType")
	@Schema(description = "발송 인증타입", example = "eml or sms", requiredMode = REQUIRED)
	private String authType;

	@JsonProperty("idtfVerfCode")
	@Schema(description = "인증 타입", defaultValue = "IDV03",  example = "휴면회원 복원 인증-IDV01, 탈퇴인증-IDV02, 비밀번호 재설정 인증-IDV03", requiredMode = REQUIRED)
	private String idtfVerfCode;

	@JsonProperty("authKey")
	@Schema(description = "인증번호", example = "000000", minLength = 6, maxLength = 6)
	private String authKey;

	@JsonProperty("exprDt")
	@Schema(description = "인증만료 시간", example = "2023-07-31 12:00:00")
	private String exprDt;


	public static TusUsrIdtfVerf toEntity(LoginAuthenticateRequest loginAuthenticateRequest, TusUsr tusUsr) {

		return TusUsrIdtfVerf.builder()
			.id(String.valueOf(UUID.randomUUID()))
			.usrUid(tusUsr)
			.idtfVerfCatCd(getIdtfVerfCatCode(loginAuthenticateRequest.getIdtfVerfCode()))
			.emlId(loginAuthenticateRequest.getEmailId())
			.verfMethdCd(getVerifycationMethodCode(loginAuthenticateRequest.getAuthType()))
			.verfKey(loginAuthenticateRequest.getAuthKey())
			.exprDt(LocalDateTime.now().plusMinutes(3))
			.build();
	}
}