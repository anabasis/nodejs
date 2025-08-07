package com.seegene.main.domain.mypage.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.mypage.vo.LoginLogVo;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "회원 로그인 기록 정보 DTO")
public record LoginLogResponse (

	@JsonProperty("loginDt")
	@Schema(description = "loginDt", example = "loginDt")
	String loginDt,

	@JsonProperty("ipAddr")
	@Schema(description = "ipAddr", example = "ipAddr")
	String ipAddr,

	@JsonProperty("cntryNm")
	@Schema(description = "cntryNm", example = "cntryNm")
	String cntryNm
){

	public static LoginLogResponse of(LoginLogVo loginLogVo) {
		return new LoginLogResponse(
			loginLogVo.getLoginDt(),
			loginLogVo.getIpAddr(),
			loginLogVo.getEngCntryNm()
		);
	}

}
