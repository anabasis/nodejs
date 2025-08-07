package com.seegene.main.domain.project.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanningProgressDtoRequest {

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "개발 스테이지", example = "ODS", requiredMode = Schema.RequiredMode.REQUIRED)
	private String stageName;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "개발 ", example = "Done", requiredMode = Schema.RequiredMode.REQUIRED)
	private String stageProgress;

}
