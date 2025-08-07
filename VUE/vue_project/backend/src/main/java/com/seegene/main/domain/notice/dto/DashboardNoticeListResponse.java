package com.seegene.main.domain.notice.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : jhjeong@seegene.com
 *
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-06-30        jhjeong        최초작성
 * </PRE>
 */

@Getter
@Builder
@Setter
public class DashboardNoticeListResponse {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "noticeNumber", example = "1",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private long noticeNumber;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "noticeTypeCode", example = "NTE",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String noticeTypeCode;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "noticeType", example = "Must Read",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String noticeType;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "noticeCategoryCode", example = "SVG",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String noticeCategoryCode;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "noticeCategory", example = "Sequence Monitoring",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String noticeCategory;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "title",
            example = "Currently, CFX96 equipment is undergoing analysis for 13 hours.",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String title;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "createDate", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime createDate;

    @QueryProjection
    public DashboardNoticeListResponse(Long noticeNumber,
                                       String noticeTypeCode,
                                       String noticeType,
                                       String noticeCategoryCode,
                                       String noticeCategory,
                                       String title,
                                       LocalDateTime createDate) {
        this.noticeNumber = noticeNumber;
        this.noticeTypeCode = noticeTypeCode;
        this.noticeType = noticeType;
        this.noticeCategoryCode = noticeCategoryCode;
        this.noticeCategory = noticeCategory;
        this.title = title;
        this.createDate = createDate;
    }

}
