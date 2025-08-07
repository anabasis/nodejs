package com.seegene.main.domain.dashboard.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ToolListResponse {
    @JsonProperty("toolNum")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "툴 아이디", example = "1", requiredMode = REQUIRED)
    private Long toolNum;

    @JsonProperty("toolName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "툴 명", example = "T800", requiredMode = REQUIRED)
    private String toolNm;

    @JsonProperty("toolLink")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "툴 URL", requiredMode = REQUIRED)
    private String toolLnkUrl;

    private ToolRauncherIcon toolRauncherIcon;

    @QueryProjection
    public ToolListResponse(Long toolNum, String toolName, String toolLink, ToolRauncherIcon toolRauncherIcon) {
        this.toolNum = toolNum;
        this.toolNm = toolName;
        this.toolLnkUrl = toolLink;
        this.toolRauncherIcon = toolRauncherIcon;
    }
}
