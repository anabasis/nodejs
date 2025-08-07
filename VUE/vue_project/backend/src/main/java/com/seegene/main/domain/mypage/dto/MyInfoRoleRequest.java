package com.seegene.main.domain.mypage.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "[IFM004] 역할 요청 등록 DTO")
public class MyInfoRoleRequest {

	@JsonProperty("rolNum")
	@Schema(description = "rolNum", example = "rolNum")
	private String rolNum;

}
