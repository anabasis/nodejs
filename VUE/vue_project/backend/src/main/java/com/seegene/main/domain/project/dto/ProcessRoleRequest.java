package com.seegene.main.domain.project.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.project.entity.TpjPrjPrcsMbshReq;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Schema(description = "프로세스  Request")
@Builder
@Getter
public class ProcessRoleRequest {

	@JsonProperty("processRoleCode")
	@Schema(description = "프로세스 권한 코드", example = "EDIT")
	private String processRoleCode;

	@JsonProperty("processList")
	@Schema(description = "프로세스 코드", example = "[\"PLNG\"]")
	private List<String> processList;

}
