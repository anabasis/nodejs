package com.seegene.main.domain.dashboard.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
/**
 * 즐겨찾기 Tool 응답 객체
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
public class BookmarkResponse {
    @JsonProperty("toolResponse")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "즐겨찾기 Tool")
    List<ToolResponse> toolReponseList;

    @JsonProperty("urlReponse")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "즐겨찾기 Url")
    List<UrlResponse> urlResponseList;
}
