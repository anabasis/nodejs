package com.seegene.main.domain.login.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.login.vo.LoginFailedVo;
import com.seegene.main.domain.user.entity.TusLoginFailLog;
import com.seegene.main.global.convert.DefaultDateTimeConverter;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * class 한글 설명
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
@Schema(description = "사용자 로그인 비밀번호 횟수 조회 Response DTO")
@Setter
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
public class LoginFailedResponse {

	@JsonProperty("emailId")
	@Schema(description = "이메일 주소", example = "seegene1@seegene.com", requiredMode = REQUIRED)
	private String emailId;

	@JsonProperty("loginFailedCount")
	@Schema(description = "로그인 실패 횟수", example = "5")
	private Long loginFailedCount;

}
