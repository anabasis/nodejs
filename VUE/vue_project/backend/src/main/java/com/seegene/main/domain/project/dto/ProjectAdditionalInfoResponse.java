package com.seegene.main.domain.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import com.seegene.main.domain.datacodemanagement.entity.TcdCntry;
import com.seegene.main.domain.project.entity.TpjPrj;
import com.seegene.main.domain.project.entity.TpjPrjRgltrAfr;
import com.seegene.main.domain.project.entity.TpjPrjTgMakt;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * ProjectAdditionalInfoResponse
 * <PRE>
 * </PRE>
 *
 * @author : jskim4@seegene.com
 * @History <PRE>
 * No  Date           Author            Desc
 * ---- ------------ ---------------- ------------------------------------
 * 1 2023-07-10        jskim        최초작성
 * </PRE>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "프로젝트 추가 정보 Response Dto")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectAdditionalInfoResponse {
    @Schema(description = "제품 명", example = "anyflex assay pack")
    private String productName;

    @Schema(description = "과제 코드", example = "100-10000")
    private String taskCode;

    @Schema(description = "Target 국가", example = "")
    private List<String> targetCountryCodeList;

    @Schema(description = "Target 국가", example = "")
    private List<String> targetCountryNameList;

    @Schema(description = "인허가 국가", example = "")
    private List<String> regulatoryAffairCodeList;

    @Schema(description = "인허가 국가", example = "")
    private List<String> regulatoryAffairNameList;


    public static ProjectAdditionalInfoResponse of(TpjPrj tpjPrj, List<String> targetCountryCodeList, List<String> targetCountryNameList, List<String> regulatoryAffairCodeList, List<String> regulatoryAffairNameList){
        return ProjectAdditionalInfoResponse.builder()
                .productName(tpjPrj.getPrdNm())
                .taskCode(tpjPrj.getTaskCd())
                .targetCountryCodeList(targetCountryCodeList)
                .targetCountryNameList(targetCountryNameList)
                .regulatoryAffairCodeList(regulatoryAffairCodeList)
                .regulatoryAffairNameList(regulatoryAffairNameList)
                .build();
    }


}
