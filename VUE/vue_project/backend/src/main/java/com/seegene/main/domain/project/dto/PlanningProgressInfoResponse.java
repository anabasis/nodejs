package com.seegene.main.domain.project.dto;

import com.seegene.main.domain.project.entity.TpjPrjPrcs;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlanningProgressInfoResponse {

	// @Schema(description = "스테이지", example = "Planning", requiredMode = Schema.RequiredMode.REQUIRED)
	// private String projectStage;

	@Schema(description = "진행도", example = "PCWT", requiredMode = Schema.RequiredMode.REQUIRED)
	private String stageProgress;

	public static PlanningProgressInfoResponse of(TpjPrjPrcs tpjPrjPrcs){
		return PlanningProgressInfoResponse.builder()
			.stageProgress(tpjPrjPrcs.getPrcsStsCd())
			.build();
	}
}
