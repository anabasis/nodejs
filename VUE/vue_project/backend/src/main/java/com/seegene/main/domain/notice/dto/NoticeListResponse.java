package com.seegene.main.domain.notice.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 개발자 대시보드 공지사항 응답 객체
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
@Setter
public class NoticeListResponse {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "noticeNumber", example = "1",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private long ntcNum;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "languageCode", example = "en",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String langCd;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "noticeTypeCode", example = "NTE",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String ntcTpCd;

    //    @JsonProperty("category")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "noticeCategory", example = "Service main",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String ntcCatCd;

    //    @JsonProperty("title")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "title",
            example = "Currently, CFX96 equipment is undergoing analysis for 13 hours.",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String titl;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "content", example = "Corem ipsum dolor sit amet",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String cont;

    //    @JsonProperty("writer")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "writer", example = "KoKo Ha", requiredMode = Schema.RequiredMode.REQUIRED)
    private String usrNm;

    //    @JsonProperty("date")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "createDate", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime crtDt;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "languageCount", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long language;

    public NoticeListResponse(Long ntcNum, String langCd, String ntcTpCd, String ntcCatCd, String titl,
                              String cont, String usrNm, LocalDateTime crtDt, Long language){
        this.ntcNum = ntcNum;
        this.langCd = langCd;
        this.ntcTpCd = ntcTpCd;
        this.ntcCatCd = ntcCatCd;
        this.titl = titl;
        this.cont = cont;
        this.usrNm = usrNm;
        this.crtDt = crtDt;
        this.language = language;
    }
}
