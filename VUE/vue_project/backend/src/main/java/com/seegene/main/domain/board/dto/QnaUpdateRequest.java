package com.seegene.main.domain.board.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QnaUpdateRequest {
    @JsonProperty("type")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "QnA 유형", example = "QT1/QT2/QT3", requiredMode = REQUIRED)
    private String type;

    @JsonProperty("category")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "Category", example = "SVM/OLG/SQM/TOL", requiredMode = REQUIRED)
    private String category;

    @JsonProperty("module")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "module", example = "ACC/SEC/PRJ/AUM/MOO/MLO/MLT/SCT/SCM/MDB/CDB/MOC/OGM/WET/SCO/ETC", requiredMode = REQUIRED)
    private String module;

    @JsonProperty("title")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "title", example = "문의 합니다.", requiredMode = REQUIRED)
    private String title;

    @JsonProperty("content")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "contents", example = "내용입니다.", requiredMode = REQUIRED)
    private String content;

    @JsonProperty("openLevel")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "공개여부", example = "PRV/PTL", requiredMode = REQUIRED)
    private String openLevel;

    @JsonProperty("prtnUser")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "부분공개 사용자 이름")
    List<PrtnUserCreateRequest> prtnUserRequest;

    @JsonProperty("qnaAttachmentRequest")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "첨부 파일")
    List<QnaAttachmentRequest> qnaAttachmentRequests;
}
