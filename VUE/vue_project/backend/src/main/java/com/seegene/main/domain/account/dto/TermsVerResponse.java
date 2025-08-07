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
public class TermsVerResponse {

    @JsonProperty("termsVersionNumber")
    @Schema(description = "약관 버전 고유 번호", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long termsVerNum;

    @JsonProperty("version")
    @Schema(description = "약관 버전", example = "1.00", requiredMode = Schema.RequiredMode.REQUIRED)
    private String ver;

    @JsonProperty("applyDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "applyDate", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime aplDt;

    @Schema(description = "termsConditions")
    private TermsConditionsResponse termsCondit;

    @QueryProjection
    public TermsVerResponse(Long termsVerNum,
                            String ver,
                            LocalDateTime aplDt,
                            TermsConditionsResponse termsCondit
    ) {
        this.termsVerNum = termsVerNum;
        this.ver = ver;
        this.aplDt = aplDt;
        this.termsCondit = termsCondit;
    }
}
