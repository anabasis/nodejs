package com.seegene.main.domain.project.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.software.dto.SoftwareFileResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "프로젝트 멤버 상세정보 Response")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@Builder
@AllArgsConstructor
public class ProjectMemberListResponse {

	@JsonProperty("memberId")
	@Schema(description = "사용자 uid", example = "")
	private String memberId;

	@JsonProperty("usrNm")
	@Schema(description = "이름", example = "이니션")
	private String usrNm;

	@JsonProperty("orgnNm")
	@Schema(description = "소속조직", example = "생산시약1팀")
	private String orgnNm;

	@JsonProperty("usrStsCd")
	@Schema(description = "사용자 상태 코드", example = "NRM")
	private String usrStsCd;

	@JsonProperty("SoftwareFileResponse")
	@Schema(description = "프로필파일 정보")
	private String filePath;

	@JsonProperty("startDat")
	@Schema(description = "프로젝트 시작일", example = "NRM")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime startDat;

	@JsonProperty("endDat")
	@Schema(description = "프로젝트 종료일", example = "NRM")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime endDat;

	@JsonProperty("processName")
	@Schema(description = "프로세스 이름", example = "Planning")
	private String processName;

	@JsonProperty("participation")
	@Schema(description = "창여여부", example = "참여중")
	private String participation;

	@JsonProperty("prjMbrNum")
	@Schema(description = "프로젝트멤버 번호", example = "10121")
	private Long prjMbrNum;

	@JsonProperty("prjPrcsNumber")
	@Schema(description = "프로세스 번호", example = "Planning")
	private Long prjPrcsNumber;

	@JsonProperty("projectManager")
	@Schema(description = "프로젝트 역할", example = "PJM")
	private String projectManager;

	@JsonProperty("memberProcess")
	@Schema(description = "프로세스 권한 리스트", example = "EDIT")
	private List<ProcessRoleResponse> processRoleList;

}
