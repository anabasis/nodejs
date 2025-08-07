package com.seegene.main.domain.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DocumentStatusRequest {

    // @JsonProperty("projectId")
    // @JsonInclude(JsonInclude.Include.NON_NULL)
    // @Schema(description = "프로젝트 고유 번호", example = "1")
    // private String projectId;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "최종 status", example = "0", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer finalStatus;

}
