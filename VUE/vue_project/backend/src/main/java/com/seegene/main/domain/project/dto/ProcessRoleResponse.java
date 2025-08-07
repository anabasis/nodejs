package com.seegene.main.domain.project.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Schema(description = "프로세스 권한/및 정보 Response")
@Builder
@Getter
public class ProcessRoleResponse {

	@JsonProperty("processRoleCode")
	@Schema(description = "프로세스 권한 코드", example = "EDIT")
	private String processRoleCode;

	@JsonProperty("processRoleCodeName")
	@Schema(description = "프로세스 권한 이름", example = "EDIT")
	private String processRoleCodeName;

	@JsonProperty("processCodes")
	@Schema(description = "프로세스 코드", example = "Planning")
	private List<String> processCodes;

	@JsonProperty("processName")
	@Schema(description = "프로세스 이름", example = "Planning")
	private List<String> processName;

	public ProcessRoleResponse(String processRoleCode,String processRoleCodeName,List<String> processCodes, List<String> processName) {
		this.processRoleCode = processRoleCode;
		this.processRoleCodeName = processRoleCodeName;
		this.processCodes = processCodes;
		this.processName = processName;
	}

}
