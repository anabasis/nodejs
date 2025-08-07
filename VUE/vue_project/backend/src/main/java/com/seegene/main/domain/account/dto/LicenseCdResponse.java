package com.seegene.main.domain.account.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LicenseCdResponse {
	@JsonProperty("languageCode")
	@Schema(description = "코드 언어", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
	private String langCd;

	@JsonProperty("title")
	@Schema(description = "라이선스명", example = "서비스 이용약관", requiredMode = Schema.RequiredMode.REQUIRED)
	private String cdNm;

	@QueryProjection
	public LicenseCdResponse(String langCd,
							 String cdNm
	){
		this.langCd = langCd;
		this.cdNm = cdNm;
	}
}
