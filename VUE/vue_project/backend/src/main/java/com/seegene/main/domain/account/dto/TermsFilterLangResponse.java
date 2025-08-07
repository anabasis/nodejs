package com.seegene.main.domain.account.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;


@Schema(description = "통합설정 약관 필터 Response DTO")
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TermsFilterLangResponse {

	@JsonProperty("languageCode")
	@Schema(description = "(필터) 약관 언어 코드", example = "en")
	private String langCd;

	@JsonProperty("nativeName")
	@Schema(description = "(필터) 약관 언어명", example = "English")
	private String ntvNm;

	@QueryProjection
	public TermsFilterLangResponse(String langCd,
								   String ntvNm
	) {
		this.langCd = langCd;
		this.ntvNm = ntvNm;
	}
}
