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
public class PurposeStatusResponse {

    @JsonProperty("purpose")
    @Schema(description = "purpose")
    String purpose;
    @JsonProperty("purposeCount")
    @Schema(description = "purpose Count")
    Long purposeCnt;

    @QueryProjection
    public PurposeStatusResponse(String purpose, Long purposeCnt) {
        this.purpose = purpose;
        this.purposeCnt = purposeCnt;
    }
}
