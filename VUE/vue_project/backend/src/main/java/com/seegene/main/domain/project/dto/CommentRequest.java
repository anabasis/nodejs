package com.seegene.main.domain.project.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentRequest {

    @JsonProperty("prjNum")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "프로젝트 고유 번호", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long prjNum;

    @JsonProperty("cmtNum")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "코멘트 고유 아이디", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long cmtNum;


    @JsonProperty("writer")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "작성자 명", example = "sample name", requiredMode = Schema.RequiredMode.REQUIRED)
    private String writer;

    @JsonProperty("cmtCnt")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "코멘트 내용", example = "Hello, I would like to ask you a question ...", requiredMode = Schema.RequiredMode.REQUIRED)
    private String cmtCnt;
}
