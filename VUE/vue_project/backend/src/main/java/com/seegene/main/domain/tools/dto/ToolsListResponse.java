package com.seegene.main.domain.tools.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import com.seegene.main.domain.dashboard.dto.ToolRauncherIcon;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;


@Getter
@Builder
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ToolsListResponse {

    @JsonProperty("toolNum")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "툴 아이디", example = "1", requiredMode = REQUIRED)
    private Long toolNum;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "toolName", example = "AutoRef", requiredMode = Schema.RequiredMode.REQUIRED)
    private String toolName;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "description", example = "Input Data의 Taxon 정보 조회 및 Submit",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String description;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "toolLinkUrl", requiredMode = Schema.RequiredMode.REQUIRED)
    private String toolLinkUrl;

    private ToolsRauncherIcon toolsRauncherIcon;

    @QueryProjection
    public ToolsListResponse(Long toolNum, String toolName, String description, String toolLinkUrl,
                             ToolsRauncherIcon toolsRauncherIcon) {
        this.toolNum = toolNum;
        this.toolName = toolName;
        this.description = description;
        this.toolLinkUrl = toolLinkUrl;
        this.toolsRauncherIcon = toolsRauncherIcon;
    }

}
