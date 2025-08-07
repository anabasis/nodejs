package com.seegene.main.domain.join.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 비밀번호 설정 Request DTO
 * <PRE>
 * </PRE>
 * @author   : @mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-09-08        khhong        최초작성
 * </PRE>
 */
@Schema(description = "비밀번호 설정 Request DTO")
@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JoinRegPasswordRequest {

	@JsonProperty("emailId")
	@Schema(description = "이메일주소", defaultValue = "ACSG@mz.co.kr", example = "sample@email.com", requiredMode = REQUIRED)
	private String emailId;

	@JsonProperty("password")
	@Schema(description = "비밀번호", example = "abcdefg", requiredMode = REQUIRED, minLength = 8, maxLength = 20)
	private String password;
}
