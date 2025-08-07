package com.seegene.main.domain.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

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
public class DocumentModifyRequest {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "프로젝트 프로세스 번호", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long projectProcessNum;

    @Schema(description = "이전 파일 아이디", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long oldFileNum;

    @Schema(description = "새로운 파일 아이디", example = "1")
    private Long newFileNum;

    @Schema(description = "파일 설명", example = "ABC")
    private String description;

}
