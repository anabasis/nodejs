package com.seegene.main.domain.dashboard.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.seegene.main.domain.datacodemanagement.entity.TcdCdItmMlg;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DiseaseCategoryListResponse
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
@Schema(description = "질병 카테고리 목록 Response Dto")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DiseaseCategoryProjectListResponse {
	@Schema(description = "질병 카테고리 명", example = "RP", requiredMode = REQUIRED)
	private String dissCatNm;
	@Schema(description = "질병 카테고리 명", example = "8", requiredMode = REQUIRED)
	private Long count;
	public static DiseaseCategoryProjectListResponse of(Map.Entry<String, Long> entry){
		return DiseaseCategoryProjectListResponse.builder()
			.dissCatNm(entry.getKey())
			.count(entry.getValue())
			.build();
	}
}
