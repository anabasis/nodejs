package com.seegene.main.domain.project.dto;


import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.project.vo.ProjectAuthorityVo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "프로젝트 권한/참여 요청 Response")
public class ProjectAuthorityResponse {

	@JsonProperty("id")
	@Schema(description = "요청번호", example = "1")
	private long id;

	@JsonProperty("aprvRslCd")
	@Schema(description = "신청 허가 코드", example = "APV")
	private String aprvRslCd;

	@JsonProperty("reqTpCd")
	@Schema(description = "권한/요청 신청구분 코드", example = "RQJ")
	private String reqTpCd;

	@JsonProperty("userNm")
	@Schema(description = "회원 이름", example = "이니션")
	private String userNm;

	@JsonProperty("orgnNm")
	@Schema(description = "부서", example = "인실리코")
	private String orgnNm;

	@JsonProperty("prcsAuth")
	@Schema(description = "권한유형", example = "이니션")
	private String prcsAuth;

	@JsonProperty("crtDt")
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	@Schema(description = "생성 일자", example = "2023-06-24", requiredMode = REQUIRED)
	private LocalDateTime crtDt;

	@JsonProperty("filePath")
	@Schema(description = "프로필파일 정보")
	private String filePath;

	public static ProjectAuthorityResponse of(ProjectAuthorityVo vo) {
		return ProjectAuthorityResponse.builder()
			.id(vo.getId())
			.aprvRslCd(vo.getAprvRslCd())
			.reqTpCd(vo.getReqTpCd())
			.userNm(vo.getUserNm())
			.orgnNm(vo.getOrgnNm())
			.prcsAuth(vo.getPrcsAuth())
			.crtDt(vo.getCrtDt())
			.filePath(vo.getFlNm() == null ? null : vo.getFlPath()+vo.getFlNm()+"."+vo.getFlExtn())
			.build();
	}

}
