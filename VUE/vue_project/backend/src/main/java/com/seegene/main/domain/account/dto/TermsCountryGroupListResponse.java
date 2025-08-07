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
public class TermsCountryGroupListResponse {

	@JsonProperty("countryGroupName")
	@Schema(description = "약관 국가 그룹명", example = "대한민국", requiredMode = Schema.RequiredMode.REQUIRED)
	private String cntryCrpNm;

	@JsonProperty("countryGroupId")
	@Schema(description = "약관 국가 그룹 아이디", example = "CG0003")
	private String cntryGrpId;

	@QueryProjection
	public TermsCountryGroupListResponse(String cntryCrpNm,
										 String cntryGrpId
	) {
		this.cntryCrpNm = cntryCrpNm;
		this.cntryGrpId = cntryGrpId;
	}
}
