package com.seegene.main.domain.account.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;



/**
 * 통합설정 약관 Response DTO
 * <PRE>
 * </PRE>
 * @author   : @mz.co.kr
 *
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1                 최초작성
 * </PRE>
 */
@Schema(description = "통합설정 약관 Response DTO")
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TermsResponse {

	@JsonProperty("termsNumber")
	@Schema(description = "약관 고유 번호", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
	private Long termsNum;

	@JsonProperty("termsCategoryCode")
	@Schema(description = "약관 카테고리 코드", example = "termsOfService", requiredMode = Schema.RequiredMode.REQUIRED)
	private String termsCatCd;


	@JsonProperty("countryGroupCd")
	@Schema(description = "약관 국가 그룹 아이디", example = "대한민국", requiredMode = Schema.RequiredMode.REQUIRED)
	private String cntryGrpId;

	@Schema(description = "TermsVersion")
	private TermsVerResponse termsVer;

	@QueryProjection
	public TermsResponse(Long termsNum,
						 String termsCatCd,
						 String cntryGrpId,
						 TermsVerResponse termsVer
	) {
		this.termsNum = termsNum;
		this.termsCatCd = termsCatCd;
		this.cntryGrpId = cntryGrpId;
		this.termsVer = termsVer;
	}
}
