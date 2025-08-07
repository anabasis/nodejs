package com.seegene.main.domain.board.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import com.seegene.main.domain.common.entity.TsyFl;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QnaAttachfileResponse {
    @JsonProperty("fileNumber")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private long flNum;

    @JsonProperty("fileName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String flNm;

    @JsonProperty("displayFileName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String dspFlNm;

    @JsonProperty("filePath")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String flPath;

    @JsonProperty("fileExtension")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String flExtn;

    @JsonProperty("fileSize")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long flSz;


    @QueryProjection
    public QnaAttachfileResponse(long flNum,
                                 String flNm,
                                 String dspFlNm,
                                 String flPath,
                                 String flExtn,
                                 Long flSz
    ) {
        this.flNum = flNum;
        this.flNm = flNm;
        this.dspFlNm = dspFlNm;
        this.flPath = flPath;
        this.flExtn = flExtn;
        this.flSz = flSz;
    }

    public static QnaAttachfileResponse entityToDto(TsyFl file) {
        return QnaAttachfileResponse.builder()
                .flNum(file.getId())
                .flNm(file.getFlNm())
                .dspFlNm(file.getDspFlNm())
                .flPath(file.getFlPath())
                .flExtn(file.getFlExtn())
                .flSz(file.getFlSz())
                .build();
    }
}
