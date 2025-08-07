package com.seegene.main.domain.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DslCommonCodeItemMapResponse {
    @Schema(description = "아이템 코드", example = "10262", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long cdItmNum;
    @Schema(description = "아이템 코드", example = "etc", requiredMode = Schema.RequiredMode.REQUIRED)
    private String cdNm;
    @Schema(description = "정렬 순서", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long sortNum;
}
