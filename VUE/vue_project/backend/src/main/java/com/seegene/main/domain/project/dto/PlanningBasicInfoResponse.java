package com.seegene.main.domain.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.project.entity.TpjPrjPrcs;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanningBasicInfoResponse {

	@Schema(description = "제품 타입", example = "2CT", requiredMode = Schema.RequiredMode.REQUIRED)
	private String productType;

	@Schema(description = "데이터 타입", example = "MUT", requiredMode = Schema.RequiredMode.REQUIRED)
	private String dataType;

	public static PlanningBasicInfoResponse of(TpjPrjPrcs tpjPrjPrcs){
		return PlanningBasicInfoResponse.builder()
			.productType(tpjPrjPrcs.getPrdTpCd())
			.dataType(tpjPrjPrcs.getDtaTpCd())
			.build();
	}
}