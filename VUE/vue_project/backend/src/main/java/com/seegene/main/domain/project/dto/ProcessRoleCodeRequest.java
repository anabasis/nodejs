package com.seegene.main.domain.project.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Schema(description = "프로세스 코드 Reqest")
@Builder
@Getter
public class ProcessRoleCodeRequest {

	@JsonProperty("processCodes")
	@Schema(description = "프로세스 코드", example = "Planning")
	private String processCodes;

}
