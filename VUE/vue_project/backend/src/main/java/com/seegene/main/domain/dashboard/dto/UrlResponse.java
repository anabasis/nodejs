package com.seegene.main.domain.dashboard.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.dashboard.entity.TusFav;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

/**
 * 개발자 대시보드 사용자 즐겨찾기 Url 응답 객체
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
public class UrlResponse {
    @JsonProperty("favNum")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "Url 아이디", example = "1", requiredMode = REQUIRED)
    private Long favNum;

    @JsonProperty("urlName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "Url 명", example = "NCBI", requiredMode = REQUIRED)
    private String urlName;

    @JsonProperty("url")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "url", example = "http://www.ncbi.com", requiredMode = REQUIRED)
    private String url;

    public static UrlResponse entityToDto(TusFav tusFav){
        return UrlResponse.builder()
                .favNum(tusFav.getId())
                .url(tusFav.getSiteUrl())
                .urlName(tusFav.getSiteNm())
                .build();
    }

}
