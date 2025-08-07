package com.seegene.main.domain.board.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.board.entity.TbdQnaAnsw;
import com.seegene.main.domain.board.entity.TbdQnaAnswAtch;
import com.seegene.main.domain.common.dto.FileInfoResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AnswerResponse {
    @JsonProperty("answerNumber")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "답글 번호", example = "1", requiredMode = REQUIRED)
    private long qnaAnswNum;

    @JsonProperty("answerUserUid")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "작성자 UID", example = "F59301A1304511EEBF4902D5D06DD9EE", requiredMode = REQUIRED)
    private String answUsrUid;

    @JsonProperty("writer")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "writer", example = "이씨젠", requiredMode = REQUIRED)
    private String usrNm;

    @JsonProperty("title")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "title", example = "문의 합니다.", requiredMode = REQUIRED)
    private String title;

    @JsonProperty("answerContent")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "content", example = "내용입니다.", requiredMode = REQUIRED)
    private String answCont;

    @JsonProperty("createDate")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "생성 일자", example = "2023-06-24", requiredMode = REQUIRED)
    private LocalDateTime crtDt;

    @JsonProperty("modifyDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "수정 일자", example = "2023-06-26")
    private LocalDateTime mdfDt;

    @JsonProperty("answerAttachmentResponse")
    @Schema(description = "첨부파일 리스트")
    private List<FileInfoResponse> qnaAttachResponses;

    public AnswerResponse(long qnaAnswNum, String answUsrUid, String usrNm, String title, String answCont, LocalDateTime crtDt, LocalDateTime mdfDt, List<FileInfoResponse> qnaAnswerAttachList) {
        this.qnaAnswNum = qnaAnswNum;
        this.answUsrUid = answUsrUid;
        this.usrNm = usrNm;
        this.title = title;
        this.answCont = answCont;
        this.crtDt = crtDt;
        this.mdfDt = mdfDt;
        this.qnaAttachResponses = qnaAnswerAttachList;
    }

    public static AnswerResponse entityToDto(TbdQnaAnsw qnaAnswerEntity){
        return AnswerResponse.builder()
                .qnaAnswNum(qnaAnswerEntity.getId())
                .answUsrUid(qnaAnswerEntity.getTusUsr().getId())
                .usrNm(qnaAnswerEntity.getTusUsr().getUsrNm())
                .title(qnaAnswerEntity.getTbdQna().getInqrTitl())
                .answCont(qnaAnswerEntity.getAnswCont())
                .crtDt(qnaAnswerEntity.getCrtDt())
                .mdfDt(qnaAnswerEntity.getMdfDt())
                .qnaAttachResponses(qnaAnswerEntity.getTbdQnaAnswAtches().stream().map(TbdQnaAnswAtch::getQnaAnswerAttach)
                        .map(FileInfoResponse::of).collect(Collectors.toList()))
                .build();
    }
}
