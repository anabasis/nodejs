package com.seegene.main.domain.common.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class S3KeyResponse {

    @JsonProperty("key")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "업로드 파일 경로 (S3 Key) : 파일 패스 + 파일명 + .확장자", example = "TSW_SW/4EA02F48DF264181B09BBA3EAF55EB14.png")
    private String key;

    @JsonProperty("storageTypeCode")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "접근 제한자 (PUB/PRV)", example = "PRV")
    private String stogTpCd;
}
