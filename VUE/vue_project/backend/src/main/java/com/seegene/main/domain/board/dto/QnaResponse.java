package com.seegene.main.domain.board.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import com.seegene.main.domain.board.entity.TbdQna;
import com.seegene.main.domain.board.entity.TbdQnaAtch;
import com.seegene.main.domain.common.dto.FileInfoResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

/**
 * 사용자 게시판
 * <PRE>
 * </PRE>
 * @author   : hwkwak@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-06-30        hwkwak        최초작성
 * </PRE>
 */
@Getter
@Builder
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class QnaResponse {
    @JsonProperty("qnaNum")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "QnA 번호", example = "100001", requiredMode = REQUIRED)
    private Long qnaNum;

    @JsonProperty("type")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "type", example = "Inquiry", requiredMode = REQUIRED)
    private String qnaTpCd;

    @JsonProperty("qnaType")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "type", example = "QT1", requiredMode = REQUIRED)
    private String type;

    @JsonProperty("category")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "카테고리", example = "Service main", requiredMode = REQUIRED)
    private String qnaCatCd;

    @JsonProperty("qnaCategory")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "카테고리", example = "SVM", requiredMode = REQUIRED)
    private String category;

    @JsonProperty("module")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "모듈", example = "Account", requiredMode = REQUIRED)
    private String mdlTpCd;

    @JsonProperty("qnaModule")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "모듈", example = "ACC", requiredMode = REQUIRED)
    private String module;

    @JsonProperty("openLevel")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "OpenLevel", example = "Pirvate", requiredMode = REQUIRED)
    private String openLevel;

    @JsonProperty("openLevelCode")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "openLevelCode", example = "PRV", requiredMode = REQUIRED)
    private String openLvlCd;

    @JsonProperty("prtnUser")
    @Schema(description = "pritallyOpenUser", example = "F59301A1304511EEBF4902D5D06DD9EE", requiredMode = REQUIRED)
    private Set<PrtnUserResponse> prtnUser = new LinkedHashSet<>();


    @JsonProperty("title")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "QnA 제목", example = "Module ipsum abcdefghij", requiredMode = REQUIRED)
    private String inqrTitl;

    @JsonProperty("content")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "내용", example = "내용입니다.", requiredMode = REQUIRED)
    private String inqrCont;

    @JsonProperty("userUid")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "작성자 UID", example = "FCF627323FE911EEBF4902D5D06DD9EE", requiredMode = REQUIRED)
    private String usrUid;

    @JsonProperty("writer")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "작성자", example = "이니션", requiredMode = REQUIRED)
    private String usrNm;

    @JsonProperty("status")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "문의 상태", example = "Wait for response", requiredMode = REQUIRED)
    private String qnaStsCd;

    @JsonProperty("qnaStatus")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "문의 상태", example = "Wait for response", requiredMode = REQUIRED)
    private String status;


    @JsonProperty("createDate")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "생성일자", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime crtDt;


    @JsonProperty("modifyDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "수정일자", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime mdfDt;

    @JsonProperty("qnaAttachResponse")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Set<QnaAttachResponse> qnaAttachResponse = new LinkedHashSet<>();

    @QueryProjection
    public QnaResponse(Long qnaNum, String qnaTpCd, String type, String qnaCatCd, String category, String mdlTpCd, String module, String openLevel, String openLvlCd, Set<PrtnUserResponse> prtnUser, String inqrTitl, String inqrCont, String usrUid, String usrNm, String qnaStsCd, String status, LocalDateTime crtDt, LocalDateTime mdfDt, Set<QnaAttachResponse> qnaAttachResponse) {
        this.qnaNum = qnaNum;
        this.qnaTpCd = qnaTpCd;
        this.type = type;
        this.qnaCatCd = qnaCatCd;
        this.category = category;
        this.mdlTpCd = mdlTpCd;
        this.module = module;
        this.openLevel = openLevel;
        this.openLvlCd = openLvlCd;
        this.prtnUser = prtnUser;
        this.inqrTitl = inqrTitl;
        this.inqrCont = inqrCont;
        this.usrUid = usrUid;
        this.usrNm = usrNm;
        this.qnaStsCd = qnaStsCd;
        this.status = status;
        this.crtDt = crtDt;
        this.mdfDt = mdfDt;
        this.qnaAttachResponse = qnaAttachResponse;
    }

    public static QnaResponse entityToDto(TbdQna tbdQna){
        return QnaResponse.builder()
                .qnaNum(tbdQna.getId())
                .qnaTpCd(tbdQna.getQnaTpCd())
                .qnaCatCd(tbdQna.getQnaCatCd())
                .mdlTpCd(tbdQna.getMdlTpCd())
                .openLevel(tbdQna.getOpenLvlCd())
                .openLvlCd(tbdQna.getOpenLvlCd())
                .inqrTitl(tbdQna.getInqrTitl())
                .inqrCont(tbdQna.getInqrCont())
                .usrUid(tbdQna.getTusUsr().getId())
                .usrNm(tbdQna.getTusUsr().getUsrNm())
                .qnaStsCd(tbdQna.getQnaStsCd())
                .crtDt(tbdQna.getCrtDt())
                .mdfDt(tbdQna.getMdfDt())
                .qnaAttachResponse(
                        tbdQna.getTbdQnaAtches().stream().map(TbdQnaAtch::getQnaAttach)
                                .map(QnaAttachResponse::of)
                                .collect(Collectors.toSet())
                )
                .build();
    }
}
