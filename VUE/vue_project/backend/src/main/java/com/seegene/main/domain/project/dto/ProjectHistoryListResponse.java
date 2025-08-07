package com.seegene.main.domain.project.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.seegene.main.domain.project.entity.TpjPrjPrcs;
import com.seegene.main.domain.project.entity.TpjPrjPrcsSts;
import com.seegene.main.domain.project.vo.ProjectHistoryVo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ProjectHistoryListResponse
 * <PRE>
 * </PRE>
 * @author   : jskim4@seegene.com
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-03        jskim        최초작성
 * </PRE>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "프로젝트 이력 목록 Response Dto")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectHistoryListResponse {
	@Schema(description = "프로세스 코드", example = "OLDS", requiredMode = REQUIRED)
	private String processCode;
	@Schema(description = "프로세스", example = "Oligo Design", requiredMode = REQUIRED)
	private String process;
	@Schema(description = "상태 코드", example = "PCWT", requiredMode = REQUIRED)
	private String statusCode;
	@Schema(description = "상태", example = "미진행", requiredMode = REQUIRED)
	private String status;
	@Schema(description = "시작 일자", example = "2023-06-30")
	private String startDate;
	@Schema(description = "종료 일자", example = "2023-06-30")
	private String endDate;
	@Schema(description = "변경한 사람", example = "김씨젠", requiredMode = REQUIRED)
	private String member;
	@Schema(description = "변경 일시", example = "2023-06-30 13:57", requiredMode = REQUIRED)
	private String lastUpdateDate;

//	public static ProjectHistoryListResponse of(ProjectHistoryVo vo){
//		return ProjectHistoryListResponse.builder()
//			.processCode(vo.getProcessCode())
//			.process(vo.getProcess())
//			.statusCode(vo.getStatusCode())
//			.status(vo.getStatus())
//			.startDate(vo.getStartDate())
//			.endDate(vo.getEndDate())
//			.member(vo.getMember())
//			.lastUpdateDate(vo.getLastUpdateDate())
//			.build();
//	}
	public static ProjectHistoryListResponse of(String processCode, String process, String statusCode, String status, String startDate, String endDate, String member, String lastUpdateDate){
		return ProjectHistoryListResponse.builder()
			.processCode(processCode)
			.process(process)
			.statusCode(statusCode)
			.status(status)
			.startDate(startDate)
			.endDate(endDate)
			.member(member)
			.lastUpdateDate(lastUpdateDate)
			.build();
	}
}
