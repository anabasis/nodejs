package com.seegene.main.domain.dashboard.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.external.entity.mongo.VistPage;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

/**
 * 최근 방문 페이지 응답 객체
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
public class LatelyPageResponse {
    @JsonProperty("title")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "제목", example = "Project 123_Oligo design", requiredMode = REQUIRED)
    private String title;

    @JsonProperty("content")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "content", example = "Project List > Project detail > Oligo design Request > Request detail > Analyte detail", requiredMode = REQUIRED)
    private String content;

    @JsonProperty("visitTime")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "Visit Time", example = "2023-07-11 15:00:11", requiredMode = REQUIRED)
    private LocalDateTime visitTime;

    @JsonProperty("url")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "url", example = "http://www.ncbi.com", requiredMode = REQUIRED)
    private String url;

    public static LatelyPageResponse of(VistPage vistPage) {
        return LatelyPageResponse.builder()
            .title(vistPage.getTitle())
            .content(vistPage.getContent())
            .visitTime(vistPage.getMdfDt())
            .url(vistPage.getPageUrl())
            .build();
    }
}
