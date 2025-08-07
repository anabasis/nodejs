package com.seegene.main.domain.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DocumentAddRequest {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "프로젝트 프로세스 번호", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long projectProcessNum;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 타입", example = "PF01", requiredMode = Schema.RequiredMode.REQUIRED)
    private String fileType;

    @Schema(description = "파일 아이디", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long fileNum;

    @Schema(description = "파일 설명", example = "1")
    private String description;

}
