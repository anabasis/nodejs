package com.seegene.main.domain.project.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.seegene.main.domain.project.entity.TcdPrcs;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ProjectProcessResponse
 * <PRE>
 * </PRE>
 *
 * @author : jskim4@seegene.com
 * @History <PRE>
 * No  Date           Author            Desc
 * ---- ------------ ---------------- ------------------------------------
 * 1 2023-07-07        jskim        최초작성
 * </PRE>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "프로젝트 프로세스 목록 Response Dto")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectProcessListResponse {
    @Schema(description = "프로젝트 프로세스 코드", example = "100", requiredMode = REQUIRED)
    private String id;
    @Schema(description = "프로젝트 프로세스 명", example = "Planning", requiredMode = REQUIRED)
    private String prcsNm;
    @Schema(description = "프로젝트 Sort Number", example = "1")
    private Long sortNum;

    public static ProjectProcessListResponse of(TcdPrcs tcdPrcs) {
        return ProjectProcessListResponse.builder()
                .id(tcdPrcs.getId())
                .prcsNm(tcdPrcs.getPrcsNm())
                .sortNum(tcdPrcs.getSortNum())
                .build();
    }
}
