package com.seegene.main.domain.mypage.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.mypage.vo.MypageVo;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(description = "회원 기본 정보 DTO")
public record MyInfoResponse (

	@JsonProperty("usrUid")
	@Schema(description = "usrUid", example = "usrUid")
	String usrUid,

	@JsonProperty("emlId")
	@Schema(description = "emlId", example = "emlId")
	String emlId,

	@JsonProperty("prflFlNum")
	@Schema(description = "prflFlNum", example = "prflFlNum")
	String prflFlNum,

	@JsonProperty("usrNm")
	@Schema(description = "usrNm", example = "usrNm")
	String usrNm,

	@JsonProperty("corpNm")
	@Schema(description = "corpNm", example = "corpNm")
	String corpNm,

	@JsonProperty("orgnNm")
	@Schema(description = "orgnNm", example = "orgnNm")
	String orgnNm,

	@JsonProperty("jobTitl")
	@Schema(description = "jobTitl", example = "jobTitl")
	String jobTitl,

	@JsonProperty("crtDt")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	@Schema(description = "crtDt", example = "crtDt")
	LocalDateTime crtDt,

	@JsonProperty("lastAccessDate")
	@Schema(description = "lastAccessDate", example = "lastAccessDate")
	String lastAccessDate
){

	public static MyInfoResponse of(
		String usrUid,
		String emlId,
		String prflFlNum,
		String usrNm,
		String corpNm,
		String orgnNm,
		String jobTitl,
		LocalDateTime crtDt,
		String lastAccessDate
	){
		return new MyInfoResponse(
			usrUid,
			emlId,
			prflFlNum,
			usrNm,
			corpNm,
			orgnNm,
			jobTitl,
			crtDt,
			lastAccessDate
		);
	}

}
