package com.seegene.main.domain.common.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class S3PreSignedUrlRequest {

    @JsonProperty("index")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "index", example = "1")
    private Long index;

    @JsonProperty("extension")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 확장자", example = "png")
    private String extension;

    @JsonProperty("tableName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "테이블 명", example = "TSW_SW")
    private String tableName;

    @JsonProperty("storageTypeCode")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "접근 제한자 (PUB/PRV)", example = "PRV")
    private String stogTpCd;

    @JsonProperty("expireSecondTime")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "만료 시간 (초 단위)",example = "30")
    private String expireSecondTime;
}
