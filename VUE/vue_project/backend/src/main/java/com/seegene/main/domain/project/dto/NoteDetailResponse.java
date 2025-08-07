package com.seegene.main.domain.project.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.common.dto.FileInfoResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class NoteDetailResponse {
    @JsonProperty("id")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "note 아이디", requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;
    @JsonProperty("usrUid")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "작성자 아이디", example = "작성자 아이디", requiredMode = Schema.RequiredMode.REQUIRED)
    private String usrUid;
    @JsonProperty("usrNm")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "작성자명", example = "작성자명", requiredMode = Schema.RequiredMode.REQUIRED)
    private String usrNm;
    @JsonProperty("cmtCnt")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "코멘트 내용", example = "Hello, I would like to ask you a question ...", requiredMode = Schema.RequiredMode.REQUIRED)
    private String cmtCnt;
    @JsonProperty("checked")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "읽기 여부", example = "N", requiredMode = Schema.RequiredMode.REQUIRED)
    private Boolean checked;

    @JsonProperty("crtrUid")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "생성사용자uid", requiredMode = Schema.RequiredMode.REQUIRED)
    private String crtrUid;

    @JsonProperty("crtDt")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "생성일자", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime crtDt;
    @JsonProperty("fileInfoResponse")
    @Schema(description = "작성자 파일 정보")
    private FileInfoResponse fileInfoResponse;

}
