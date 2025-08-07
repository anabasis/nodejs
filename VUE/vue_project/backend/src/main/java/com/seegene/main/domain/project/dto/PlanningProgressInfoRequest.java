package com.seegene.main.domain.project.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanningProgressInfoRequest {

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "project process", example = "PLNG", requiredMode = Schema.RequiredMode.REQUIRED)
	private String projectProcess;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "project process progress", example = "PCFN", requiredMode = Schema.RequiredMode.REQUIRED)
	private String projectProcessProgress;

}
