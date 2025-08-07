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
public class DiseaseCategoryListResponse {
	@Schema(description = "질병 카테고리 코드", example = "1", requiredMode = REQUIRED)
	private String dissCatCd;
	@Schema(description = "질병 카테고리 명", example = "RP", requiredMode = REQUIRED)
	private String dissCatCdNm;
	public static DiseaseCategoryListResponse of(TcdCdItmMlg tcdCdItmMlg){
		return DiseaseCategoryListResponse.builder()
			.dissCatCd(tcdCdItmMlg.getCdItm().getCd())
			.dissCatCdNm(tcdCdItmMlg.getCdNm())
			.build();
	}
}
