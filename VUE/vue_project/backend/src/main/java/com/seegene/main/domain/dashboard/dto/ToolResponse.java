package com.seegene.main.domain.dashboard.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import com.seegene.main.domain.dashboard.entity.TusFav;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

/**
 * 개발자 대시보드 사용자 즐겨찾기 Tool 응답 객체
 * <PRE>
 * </PRE>
 * @author   : hwkwak@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-11        hwkwak        최초작성
 * </PRE>
 */
@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ToolResponse {
    @JsonProperty("favNum")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "즐겨찾기 고유 아이디", example = "1", requiredMode = REQUIRED)
    private Long favNum;

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
    public ToolResponse(Long favNum, Long toolNum, String toolNm, String toolLnkUrl, ToolRauncherIcon toolRauncherIcon) {
        this.favNum = favNum;
        this.toolNum = toolNum;
        this.toolNm = toolNm;
        this.toolLnkUrl = toolLnkUrl;
        this.toolRauncherIcon = toolRauncherIcon;
    }
}
