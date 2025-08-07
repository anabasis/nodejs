package com.seegene.main.domain.account.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;


@Schema(description = "통합설정 약관 Response DTO")
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AccountTermsListResponse {

	@JsonProperty("termsCategoryCodeName")
	@Schema(description = "약관 카테고리 코드명", example = "서비스 이용약관", requiredMode = Schema.RequiredMode.REQUIRED)
	private String termsCatCdNm;

	@JsonProperty("termsCategoryCode")
	@Schema(description = "약관 카테고리 코드", example = "TM01", requiredMode = Schema.RequiredMode.REQUIRED)
	private String termsCatCd;

	@QueryProjection
	public AccountTermsListResponse(String termsCatCdNm,
									String termsCatCd
	) {
		this.termsCatCdNm = termsCatCdNm;
		this.termsCatCd = termsCatCd;
	}
}
