package com.seegene.main.domain.account.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Schema(description = "통합설정 약관 버전 Response DTO")
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TermsConditionsResponse {

    @JsonProperty("termsConditionNumber")
    @Schema(description = "약관 상세 고유 아이디", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long termsConditNum;

    @JsonProperty("languageCode")
    @Schema(description = "약관 언어", example = "ko", requiredMode = Schema.RequiredMode.REQUIRED)
    private String languageCode;

    @JsonProperty("content")
    @Schema(description = "약관 설명", example = "(주)씨젠..", requiredMode = Schema.RequiredMode.REQUIRED)
    private String content;

    @JsonProperty("createUid")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "생성자 유저아이디", requiredMode = Schema.RequiredMode.REQUIRED)
    private String crtrUid;

    @JsonProperty("createDate")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "생성일자", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime crtDt;

    @JsonProperty("modifierUid")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "수정자 유저아이디")
    private String mdfrUid;

    @JsonProperty("modifyDate")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "수정일자", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime mdfDt;

    @QueryProjection
    public TermsConditionsResponse(Long termsConditNum,
                                   String languageCode,
                                   String content,
                                   String crtrUid,
                                   LocalDateTime crtDt,
                                   String mdfrUid,
                                   LocalDateTime mdfDt
    ) {
        this.termsConditNum = termsConditNum;
        this.languageCode = languageCode;
        this.content = content;
        this.crtrUid = crtrUid;
        this.crtDt = crtDt;
        this.mdfrUid = mdfrUid;
        this.mdfDt = mdfDt;
    }
}
