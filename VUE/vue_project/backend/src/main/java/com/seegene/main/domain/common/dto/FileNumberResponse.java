package com.seegene.main.domain.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.common.entity.TsyFl;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class FileNumberResponse {
    @JsonProperty("fileNumber")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 고유번호", example = "100093")
    private long flNum;

    @JsonProperty("displayFileName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "원본 파일명", example = "소프트웨어 아이콘 이미지")
    private String dspFlNm;

    @JsonProperty("key")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "업로드 파일 경로 (S3 Key) : 파일 패스 + 파일명 + .확장자", example = "TSW_SW/53adba18-4c7d-46ee-ac8b-56de4db718b2.png")
    private String key;

    @JsonProperty("extension")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 확장자", example = "png")
    private String extn;

    @JsonProperty("fileSize")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 사이즈 (byte)", example = "18756")
    private long flSz;

    @JsonProperty("storageTypeCode")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "접근 제한자 (PUB/PRV)", example = "PRV")
    private String stogTpCd;

    public static FileNumberResponse of(TsyFl tsyFl) {
        String key = tsyFl.getFlPath() + tsyFl.getFlNm() + "." + tsyFl.getFlExtn();
        return FileNumberResponse.builder()
                .flNum(tsyFl.getId())
                .dspFlNm(tsyFl.getDspFlNm())
                .key(key)
                .extn(tsyFl.getFlExtn())
                .flSz(tsyFl.getFlSz())
                .stogTpCd(tsyFl.getStogTpCd())
                .build();
    }
}
