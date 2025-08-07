package com.seegene.main.domain.board.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import com.seegene.main.domain.board.entity.TbdQnaAtch;
import com.seegene.main.domain.common.dto.FileInfoResponse;
import com.seegene.main.domain.common.entity.TsyFl;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@EqualsAndHashCode(of = "flNum")
public class QnaAttachResponse {
    @JsonProperty("fileNumber")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 고유번호", example = "100093")
    private Long flNum;

    @JsonProperty("fileName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 이름")
    private String flNm;

    @JsonProperty("displayFileName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 원본 이름")
    private String dspFlNm;

    @JsonProperty("fileExtension")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 확장자", example = "png")
    private String flExtn;

    @JsonProperty("filePath")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 패스")
    private String flPath;

    @JsonProperty("fileSize")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 사이즈 (byte)", example = "18756")
    private Long flSz;

    @JsonProperty("storageTypeCode")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "접근 제한자 (PUB/PRV)", example = "PRV")
    private String stogTpCd;

    @JsonProperty("tableName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "테이블 명", example = "TSW_SW")
    private String tblNm;

    @QueryProjection
    public QnaAttachResponse(Long flNum,
                            String flNm,
                            String dspFlNm,
                            String flPath,
                            String flExtn,
                            Long flSz,
                            String stogTpCd,
                            String tblNm
    ) {
        this.flNum = flNum;
        this.flNm = flNm;
        this.dspFlNm = dspFlNm;
        this.flPath = flPath;
        this.flExtn = flExtn;
        this.flSz = flSz;
        this.stogTpCd = stogTpCd;
        this.tblNm = tblNm;
    }

    public static QnaAttachResponse of(TsyFl file) {
        return QnaAttachResponse.builder()
                .flNum(file.getId())
                .flNm(file.getFlNm())
                .dspFlNm(file.getDspFlNm())
                .flPath(file.getFlPath())
                .flExtn(file.getFlExtn())
                .flSz(file.getFlSz())
                .stogTpCd(file.getStogTpCd())
                .tblNm(file.getTblNm())
                .build();
    }
}



