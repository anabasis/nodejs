package com.seegene.main.domain.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.seegene.main.domain.project.entity.TpjPrj;
import com.seegene.main.domain.project.vo.ProjectListVo;

import io.swagger.v3.oas.annotations.media.Schema;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * ProjectListResponse
 * <PRE>
 * </PRE>
 *
 * @author : jskim4@seegene.com
 * @History <PRE>
 * No  Date           Author            Desc
 * ---- ------------ ---------------- ------------------------------------
 * 1 2023-07-03        jskim        최초작성
 * </PRE>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "프로젝트 목록 Response Dto")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectListResponse {
    @Schema(description = "프로젝트 ID", example = "1", requiredMode = REQUIRED)
    private Long id;
    @Schema(description = "국가", example = "Korea")
    private String targetMarket;
    @Schema(description = "질병 카테고리", example = "RP", requiredMode = REQUIRED)
    private String dissCatCd;
    @Schema(description = "목적", example = "New Product Development", requiredMode = REQUIRED)
    private String purpose;
    @Schema(description = "프로젝트 명", example = "Project Name ABC", requiredMode = REQUIRED)
    private String prjNm;
    @Schema(description = "프로세스", example = "Oligo Design", requiredMode = REQUIRED)
    private String process;
    @Schema(description = "회사", example = "seegene", requiredMode = REQUIRED)
    private String corporate;
    @Schema(description = "만료일", example = "2024-12-31 00:00:00", requiredMode = REQUIRED)
    private String dueDate;
    @Schema(description = "프로젝트 역할 코드", example = "PJM")
    private String projectRoleCode;
    @Schema(description = "프로젝트 상태 코드", example = "ONG", allowableValues = {"ONG", "ABR", "CMP"})
    private String prjStsCd;
    @Schema(description = "프로젝트 상태 이름", example = "진행중", allowableValues = {"진행중", "중지", "완료"})
    private String prjStsNm;
    public static ProjectListResponse of(TpjPrj tpjPrj, String purpose, String corporate, String process, String targetMarket, String diseaseCategory, String projectRoleCode,String prjStsNm
    ) {
        return ProjectListResponse.builder()
                .id(tpjPrj.getId())
                .prjNm(tpjPrj.getPrjNm())
                .targetMarket(targetMarket)
                .dissCatCd(diseaseCategory)
                .purpose(purpose)
                .process(process)
                .corporate(corporate)
                .dueDate(tpjPrj.getEndDat().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .projectRoleCode(projectRoleCode)
                .prjStsCd(tpjPrj.getPrjStsCd())
                .prjStsNm(prjStsNm)
                .build();
    }


}
