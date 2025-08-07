package com.seegene.main.domain.login.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-09-25        khhong        최초작성
 * </PRE>
 */
@Schema(description = "사용자 로그인 검증 조회 Response DTO")
@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginPasswordUpdateUser {

	@JsonProperty("userUid")
	@Schema(description = "User Uid", example = "User Uid")
	private String userUid;

	@JsonProperty("emailId")
	@Schema(description = "Email Id", example = "kk@seegene.com")
	private String emailId;

	@JsonProperty("isPwdUpdate")
	@Schema(description = "패스워드 90일 변경필요여부", example = "Y/N")
	private String isPwdUpdate;

	public LoginPasswordUpdateUser(String userUid, String emailId, String isPwdUpdate) {
		this.userUid = userUid;
		this.emailId = emailId;
		this.isPwdUpdate = isPwdUpdate;
	}
}
