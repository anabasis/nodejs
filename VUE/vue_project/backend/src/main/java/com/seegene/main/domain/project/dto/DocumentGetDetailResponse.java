package com.seegene.main.domain.project.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.seegene.main.domain.common.dto.FileInfoResponse;
import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.domain.project.entity.TpjPrjFl;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentGetDetailResponse {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 타입", example = "pdf")
    private String fileType;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 최종 여부", example = "Y", requiredMode = Schema.RequiredMode.REQUIRED)
    private String fnlYn;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 DTO", requiredMode = Schema.RequiredMode.REQUIRED)
    private FileInfoResponse fileInfoResponse;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "작성자 명", example = "seegene", requiredMode = Schema.RequiredMode.REQUIRED)
    private String usrNm;

    @Schema(description = "파일 설명", example = "1")
    private String description;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "파일 등록 날짜", example = "2023-09-09 12:00:00", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime mdfDt;

    public static DocumentGetDetailResponse oligoDesignOf(TpjPrjFl tpjPrjFl, TsyFl tsyFl){
        return DocumentGetDetailResponse.builder()
            .fileInfoResponse(FileInfoResponse.of(tsyFl))
            .description(tpjPrjFl.getDscrp())
            .usrNm(tpjPrjFl.getTusUsr().getUsrNm())
            .mdfDt(tpjPrjFl.getMdfDt())
            .build();
    }
}
