package com.seegene.main.domain.board.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

@Data
@Getter
public class BoardListVo {
    long qnaNum;
    String qnaTpCd;
    String qnaCatCd;
    String mdlTpCd;
    String inqrTitl;
    String qnaStsCd;
    String status;
    String usrNm;
    @JsonProperty("createDate")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "생성 일자", example = "2023-06-24", requiredMode = REQUIRED)
    private LocalDateTime crtDt;

    @JsonProperty("modifyDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "수정 일자", example = "2023-06-26")
    private LocalDateTime mdfDt;
}
