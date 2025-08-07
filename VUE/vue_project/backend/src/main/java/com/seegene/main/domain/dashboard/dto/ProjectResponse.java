package com.seegene.main.domain.dashboard.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

/**
 * 개발자 대시보드 프로젝트 소식 관련 응답 객체
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
public class ProjectResponse {
    @JsonProperty("category")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "카테고리", example = "Project", requiredMode = REQUIRED)
    private String category;

    @JsonProperty("title")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "제목", example = "COVID-19/Flu/RSV SARS-CoV2 Project", requiredMode = REQUIRED)
    private String title;

    @JsonProperty("comment")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "내용", example = "Chief, please check Mono OM. Auto MSA.", requiredMode = REQUIRED)
    private String comment;

    @JsonProperty("createDate")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "작성 시간", example = "2024-09-04 13:26:11")
    private String createDt;

}
