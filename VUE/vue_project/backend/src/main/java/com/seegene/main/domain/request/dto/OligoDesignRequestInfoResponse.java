package com.seegene.main.domain.request.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "oligo Design request Dto")
public record OligoDesignRequestInfoResponse(
        @NotBlank
        @Schema(description = "올리고 디자인 요청 아이디")
        String requestId,
        @Schema(description = "올리고 디자인 요청 상태")
        String status,
        @Schema(description = "ToolType")
        String ToolType,
        @Schema(description = "올리고 디자인 요청 명")
        String requestName,
        @Schema(description = "ID")
        String id,
        @Schema(description = "생성일")
        String createDate,
        @Schema(description = "프로잭트 이름")
        String projectName
) {}
