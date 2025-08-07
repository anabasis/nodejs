package com.seegene.main.domain.dashboard.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

/**
 * 개발자 대시보드 사용자 즐겨찾기 Url 요청 객체
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
@Builder
public class UrlRequest {
    @JsonProperty("favTp")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "즐겨찾기 타입", example = "WEB", requiredMode = REQUIRED)
    private String favType;

    @JsonProperty("urlName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "Url 명", example = "NCBI", requiredMode = REQUIRED)
    private String urlName;

    @JsonProperty("url")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "url", example = "http://www.ncbi.com", requiredMode = REQUIRED)
    private String url;
}
