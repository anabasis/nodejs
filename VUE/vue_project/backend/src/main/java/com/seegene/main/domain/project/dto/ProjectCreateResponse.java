package com.seegene.main.domain.project.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import com.fasterxml.jackson.annotation.JsonInclude;

import com.seegene.main.domain.project.entity.TpjPrj;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "프로젝트 등록 Response Dto")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectCreateResponse {
	@Schema(description = "프로젝트 ID", example = "1", requiredMode = REQUIRED)
	private Long id;

	public static ProjectCreateResponse of(TpjPrj tpjPrj){
		return ProjectCreateResponse.builder()
			.id(tpjPrj.getId())
			.build();
	}
}
