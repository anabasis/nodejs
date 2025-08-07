package com.seegene.main.domain.project.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ProjectRequestHistoryListResponse
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
@Schema(description = "프로젝트 리퀘스트 이력 목록 Response Dto")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectRequestHistoryListResponse {
	@Schema(description = "프로세스", example = "Oligo Design", requiredMode = REQUIRED)
	private String process;
	@Schema(description = "리퀘스트 ID", example = "P011", requiredMode = REQUIRED)
	private String requestId;
	@Schema(description = "리퀘스트 명", example = "ODS RequestA-145", requiredMode = REQUIRED)
	private String requestName;
	@Schema(description = "시작 일자", example = "2023-06-30", requiredMode = REQUIRED)
	private String startDate;
	@Schema(description = "최종 수정 일자", example = "오늘", requiredMode = REQUIRED)
	private String lastUpdateDate;
	@Schema(description = "Status", example = "Ongoing", requiredMode = REQUIRED)
	private String status;
	@Schema(description = "코멘트 개수", example = "12", requiredMode = REQUIRED)
	private Integer commentCnt;
}
