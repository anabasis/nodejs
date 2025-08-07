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
public class RegionStatusResponse {

    @JsonProperty("continentName")
    @Schema(description = "국가 이름")
    String engContintNm;
    @JsonProperty("continentCount")
    @Schema(description = "국가 수")
    Long contintCnt;

    @QueryProjection
    public RegionStatusResponse(String engContintNm, Long contintCnt) {
        this.engContintNm = engContintNm;
        this.contintCnt = contintCnt;
    }
}
