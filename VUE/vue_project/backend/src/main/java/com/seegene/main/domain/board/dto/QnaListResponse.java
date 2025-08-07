package com.seegene.main.domain.board.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class QnaListResponse {
    @JsonProperty("qnaNumber")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "QnA 번호", example = "100001", requiredMode = REQUIRED)
    private Long qnaNum;

    @JsonProperty("type")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "type", example = "QT1", requiredMode = REQUIRED)
    private String qnaTpCd;

    @JsonProperty("category")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "카테고리", example = "Service main", requiredMode = REQUIRED)
    private String qnaCatCd;

    @JsonProperty("module")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "모듈", example = "Account", requiredMode = REQUIRED)
    private String mdlTpCd;

    @JsonProperty("title")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "QnA 제목", example = "Module ipsum abcdefghij", requiredMode = REQUIRED)
    private String inqrTitl;

    @JsonProperty("content")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "내용", example = "내용입니다.", requiredMode = REQUIRED)
    private String inqrCont;

    @JsonProperty("writer")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "작성자", example = "이니션", requiredMode = REQUIRED)
    private String usrNm;

    @JsonProperty("status")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "문의 상태", example = "Wait for response", requiredMode = REQUIRED)
    private String qnaStsCd;

    @JsonProperty("qnaStsCd")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "문의 상태", example = "Wait for response", requiredMode = REQUIRED)
    private String status;


    @JsonProperty("createDate")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "생성일자", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime crtDt;


    @JsonProperty("modifyDate")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "수정일자", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime mdfDt;
}
