package com.seegene.main.domain.dashboard.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import com.seegene.main.domain.common.entity.TsyFl;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ToolRauncherIcon {
    @JsonProperty("filename")
    @Schema(description = "파일명", example = "파일명")
    String filename;

    @JsonProperty("displayFileName")
    @Schema(description = "디스플레이 파일명", example = "파일명")
    String displayFileName;

    @JsonProperty("fileExtension")
    @Schema(description = "파일 확장자명", example = ".pdf")
    String fileExt;

    @JsonProperty("filePath")
    @Schema(description = "파일 path", example = "/file/")
    String filePath;

    @JsonProperty("fileSize")
    @Schema(description = "파일사이즈", example = "122320")
    Long fileSize;

    @QueryProjection
    public ToolRauncherIcon(String filename, String displayFileName, String fileExt, String filePath, Long fileSize) {
        this.filename = filename;
        this.displayFileName = displayFileName;
        this.fileExt = fileExt;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }

    public static ToolRauncherIcon entityToDto(TsyFl tsyFl) {
        return ToolRauncherIcon.builder()
                .filename(tsyFl.getFlNm())
                .displayFileName(tsyFl.getDspFlNm())
                .fileExt(tsyFl.getFlExtn())
                .filePath(tsyFl.getFlPath())
                .fileSize(tsyFl.getFlSz())
                .build();
    }
}
