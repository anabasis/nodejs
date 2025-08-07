package com.seegene.main.domain.common.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

public record FileDownloadRequest(
    @JsonProperty("fileNumber")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일번호", example = "10")
    Long fileNumber,
    @JsonProperty("fileName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일명", example = "EF4FDFA1A0514F29898C0463A22091A1")
    String fileName,
    @JsonProperty("displayFileName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "display 파일명", example = "파일명")
    String displayFileName,
    @JsonProperty("filePath")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일패스", example = "TBD_LIBR/")
    String filePath,
    @JsonProperty("fileExtension")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "확장자명", example = "png")
    String fileExtension,
    @JsonProperty("fileSize")
    @Schema(description = "파일사이즈", example = "21211211")
    Long fileSize,
    @JsonProperty("storageTypeCode")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "스토리지타입", example = "PRV")
    String storageTypeCode,
    @JsonProperty("tableName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "테이블명", example = "TBD_LIBR")
    String tableName
){}
