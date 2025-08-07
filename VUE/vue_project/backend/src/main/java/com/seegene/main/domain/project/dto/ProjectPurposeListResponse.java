package com.seegene.main.domain.project.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.seegene.main.domain.datacodemanagement.entity.TcdCdItmMlg;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ProjectPurposeListResponse
 * <PRE>
 * </PRE>
 * @author   : jskim4@seegene.com
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-06        jskim        최초작성
 * </PRE>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "프로젝트 개발 목적 목록 Response Dto")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectPurposeListResponse {
	@Schema(description = "프로젝트 개발 목적 코드", example = "DP02", requiredMode = REQUIRED)
	private String projectPurposeCode;
	@Schema(description = "프로젝트 개발 목적 명", example = "Renewal Product", requiredMode = REQUIRED)
	private String projectPurposeName;

	public static ProjectPurposeListResponse of(TcdCdItmMlg tcdCdItmMlg){
		return ProjectPurposeListResponse.builder()
			.projectPurposeCode(tcdCdItmMlg.getCdItm().getCd())
			.projectPurposeName(tcdCdItmMlg.getCdNm())
			.build();
	}
}
