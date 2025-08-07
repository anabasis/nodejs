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
public class S3FileCreateRequest {

    @JsonProperty("key")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "업로드 파일 경로 (S3 Key)", example = "TSW_SW/4EA02F48DF264181B09BBA3EAF55EB14.png")
    private String key;

    @JsonProperty("displayFileName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "원본 파일명", example = "소프트웨어 아이콘 이미지")
    private String dspFlNm;

    @JsonProperty("storageTypeCode")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "접근 제한자 (PUB/PRV)", example = "PRV")
    private String stogTpCd;

    @JsonProperty("fileSize")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 사이즈 (byte)", example = "18756")
    private long flSz;


    public static TsyFl dtoToEntity(String key, Long fileSize, String displayFileName, String stogTpCd) {
        // 파일 패스 추출
        String[] fileData = key.split("[./]");
        String tableName = fileData[0];
        String fileName = fileData[1];
        String fileExtn = fileData[2];

        return TsyFl.builder()
                .flNm(fileName)
                .dspFlNm(displayFileName)
                .flExtn(fileExtn)
                .flPath(tableName+"/")
                .flSz(fileSize)
                .tblNm(tableName)
                .stogTpCd(stogTpCd)
                .build();
    }
}
