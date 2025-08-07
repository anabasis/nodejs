package com.seegene.main.domain.dashboard.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;

public class CountryStatusResponse {
    @JsonProperty("countryName")
    @Schema(description = "국가 이름")
    String countryName;
    @JsonProperty("projectCount")
    @Schema(description = "프로젝트 수")
    Long projectCount;

    @QueryProjection
    public CountryStatusResponse(String countryName, Long projectCount) {
        this.countryName = countryName;
        this.projectCount = projectCount;
    }
}
