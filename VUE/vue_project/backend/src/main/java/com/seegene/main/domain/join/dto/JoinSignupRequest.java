package com.seegene.main.domain.join.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

/**
 * 회원정보 Request DTO
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
@Schema(description = "회원정보 Request DTO")
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JoinSignupRequest {

	@JsonProperty("emailId")
	@Schema(description = "이메일주소", example = "seegene1@seegene.com", requiredMode = REQUIRED)
	private String emailId;

	@JsonProperty("password")
	@Schema(description = "비밀번호", example = "abcdefg", requiredMode = REQUIRED, minLength = 8, maxLength = 20)
	private String password;

	@JsonProperty("userName")
	@Schema(description = "사용자 이름", example = "홍길동", requiredMode = REQUIRED)
	private String userName;

	@JsonProperty("organization")
	@Schema(description = "조직정보", example = "Reagent Development Team", requiredMode = REQUIRED)
	private String organization;

	@JsonProperty("jobTitle")
	@Schema(description = "직급", example = "section chief", requiredMode = REQUIRED)
	private String jobTitle;

	@JsonProperty("joinTypeCode")
	@Schema(description = "Join Type Code (#CD_GRP_ID=US002:(초대[IVT],셀프[SLF]))", example = "Join Type Code", requiredMode = REQUIRED)
	private String joinTypeCode;
}