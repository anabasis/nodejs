package com.seegene.main.domain.tools.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.domain.dashboard.dto.ToolRauncherIcon;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ToolsRauncherIcon {

    @JsonProperty("fileName")
    @Schema(description = "fileName", example = "fileName")
    String filename;

    @JsonProperty("displayFileName")
    @Schema(description = "displayFileName", example = "displayFileName")
    String displayFileName;

    @JsonProperty("fileExtension")
    @Schema(description = "fileExtension", example = ".png")
    String fileExt;

    @JsonProperty("filePath")
    @Schema(description = "filePath", example = "/file/")
    String filePath;

    @JsonProperty("fileSize")
    @Schema(description = "fileSize", example = "1")
    Long fileSize;

    @QueryProjection
    public ToolsRauncherIcon(String filename, String displayFileName, String fileExt, String filePath,
                             Long fileSize) {
        this.filename = filename;
        this.displayFileName = displayFileName;
        this.fileExt = fileExt;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }

    public static ToolsRauncherIcon entityToDto(TsyFl tsyFl) {
        return ToolsRauncherIcon.builder()
                .filename(tsyFl.getFlNm())
                .displayFileName(tsyFl.getDspFlNm())
                .fileExt(tsyFl.getFlExtn())
                .filePath(tsyFl.getFlPath())
                .fileSize(tsyFl.getFlSz())
                .build();
    }
}
