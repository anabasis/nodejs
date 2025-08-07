package com.seegene.main.domain.external.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * 외부연동 - 프로젝트 프로세스 정보 Response DTO
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-09-15        khhong        최초작성
 * </PRE>
 */
@Schema(description = "외부연동 - 프로젝트 프로세스 정보 Response DTO")
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectProcessInfoResponse {

	@JsonProperty("projectMbrId")
	@Schema(description = "프로젝트 멤버 고유 번호", example = "10121")
	private Long projectMbrId;

	@JsonProperty("projectId")
	@Schema(description = "프로젝트 고유 번호", example = "100198")
	private Long projectId;

	@JsonProperty("projectName")
	@Schema(description = "프로젝트 명", example = "Test-AAA")
	private String projectName;

	@JsonProperty("userUid")
	@Schema(description = "회원 아이디", example = "이니션")
	private String userUid;

	@JsonProperty("userName")
	@Schema(description = "사용자 이름", example = "홍길동")
	private String userName;

	@JsonProperty("emlId")
	@Schema(description = "이메일 아이디", example = "seegene1@seegene.com")
	private String emlId;

	@JsonProperty("prjRolCd")
	@Schema(description = "이메일 아이디", example = "seegene1@seegene.com")
	private String prjRolCd;

	@JsonProperty("projectProc")
	@Schema(description = "프로젝트 프로세스", example = "PLNG")
	private String projectProcess;

	@JsonProperty("projectProcRolCode")
	@Schema(description = "프로젝트 프로세스 권한 코드 정보", example = "VIEW, MGMT, EDIT")
	private String projectProcRolCode;

	public ProjectProcessInfoResponse(Long projectMbrId, Long projectId, String projectName, String userUid, String userName, String emlId, String prjRolCd, String projectProcess, String projectProcRolCode) {
		this.projectMbrId = projectMbrId;
		this.projectId = projectId;
		this.projectName = projectName;
		this.userUid = userUid;
		this.userName = userName;
		this.emlId = emlId;
		this.prjRolCd = prjRolCd;
		this.projectProcess = projectProcess;
		this.projectProcRolCode = projectProcRolCode;
	}
}
