package com.seegene.main.domain.project.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.annotation.Nullable;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentAddRequest {
    @JsonProperty("prjNum")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "프로젝트 고유 번호", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long prjNum;
    @JsonProperty("prjPrcsNum")
    @Nullable
    @Schema(description = "프로잭트 프로세스 num", example = "1", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private Long prjPrcsNum;
    @JsonProperty("cmtCnt")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "코멘트 내용", example = "Hello, I would like to ask you a question ...", requiredMode = Schema.RequiredMode.REQUIRED)
    private String cmtCnt;
}
