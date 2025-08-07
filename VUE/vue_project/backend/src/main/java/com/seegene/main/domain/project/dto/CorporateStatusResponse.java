package com.seegene.main.domain.project.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
public class CorporateStatusResponse {

    @JsonProperty("corporateNumber")
    @Schema(description = "회사 고유 번호")
    Long corpNum;

    @JsonProperty("corporateName")
    @Schema(description = "회사 명")
    String corpNm;
    @JsonProperty("corporateCount")
    @Schema(description = "회사별 프로젝트 집계 수")
    Long corpCnt;

    @QueryProjection
    public CorporateStatusResponse(Long corporateNumber, String corporateName, Long corporateCount) {
        this.corpNum = corporateNumber;
        this.corpNm = corporateName;
        this.corpCnt = corporateCount;
    }
}
