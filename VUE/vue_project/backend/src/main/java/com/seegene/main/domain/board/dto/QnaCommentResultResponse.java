package com.seegene.main.domain.board.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.board.entity.TbdQnaCmnt;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class QnaCommentResultResponse {
    @JsonProperty("qnaCommentNumber")
    @Schema(description = "QnA Comment 번호", example = "1")
    private long qnaCommentNumber;

    @JsonProperty("parentQnaCommentNumber")
    @Schema(description = "Parent QnA Comment 번호", example = "1")
    private long parentQnaCommentNumber;

    @JsonProperty("comment")
    @Schema(description = "Comment", example = "1")
    private String comment;

    @JsonProperty("deleteYn")
    @Schema(description = "삭제 유무", example = "Y")
    private String delYn;

    @JsonProperty("writeUserUid")
    @Schema(description = "작성자 Id", example = "0001")
    private String writeUserUid;

    @JsonProperty("writeUserName")
    @Schema(description = "작성자 이름", example = "흥민손")
    private String userNm;

    @JsonProperty("userUid")
    @Schema(description = "QnA Comment 번호", example = "1")
    private String userUid;

    @JsonProperty("createUid")
    @Schema(description = "생성자 유저아이디", requiredMode = Schema.RequiredMode.REQUIRED)
    private String crtrUid;

    @JsonProperty("createDate")
    @Schema(description = "생성일자", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime crtDt;

    @JsonProperty("modifierUid")
    @Schema(description = "수정자 유저아이디")
    private String mdfrUid;

    @JsonProperty("modifyDate")
    @Schema(description = "수정일자", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime mdfDt;


    public static QnaCommentResultResponse entityToDto(TbdQnaCmnt qnaCommentEntity){
        return QnaCommentResultResponse.builder()
                .qnaCommentNumber(qnaCommentEntity.getId())
                .parentQnaCommentNumber(qnaCommentEntity.getPrntQnaCmntNum())
                .comment(qnaCommentEntity.getCmnt())
                .delYn(qnaCommentEntity.getDelYn())
                .userUid(qnaCommentEntity.getTusUsr().getId())
                .userNm(qnaCommentEntity.getTusUsr().getUsrNm())
                .crtrUid(qnaCommentEntity.getCrtrUid())
                .crtDt(qnaCommentEntity.getCrtDt())
                .mdfrUid(qnaCommentEntity.getMdfrUid())
                .mdfDt(qnaCommentEntity.getMdfDt())
                .build();

    }
}
