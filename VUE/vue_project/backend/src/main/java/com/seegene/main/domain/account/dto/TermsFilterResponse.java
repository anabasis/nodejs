package com.seegene.main.domain.account.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Schema(description = "통합설정 약관 필터 Response DTO")
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TermsFilterResponse {

	@JsonProperty("termsNumber")
	@Schema(description = "약관 고유 번호", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
	private Long termsNum;

	@JsonProperty("version")
	@Schema(description = "(필터) 약관 버전", example = "1.0", requiredMode = Schema.RequiredMode.REQUIRED)
	private String ver;

	@JsonProperty("languageCode")
	@Schema(description = "(필터) 약관 언어 코드 리스트", example = "en")
	private List<TermsFilterLangResponse> langCd;

	@QueryProjection
	public TermsFilterResponse (Long termsNum,
								String ver,
								List<TermsFilterLangResponse> langCd
	) {
		this.termsNum = termsNum;
		this.ver = ver;
		this.langCd = langCd;
	}
}
