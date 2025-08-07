package com.seegene.main.domain.account.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.common.entity.TcdLang;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 통합설정 알림 Request DTO
 * <PRE>
 * </PRE>
 * @author   : @mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1                 최초작성
 * </PRE>
 */
@Schema(description = "통합설정 알림 Request DTO")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LanguageResponse {

	@JsonProperty("languageCode")
	@Schema(description = "언어 코드", requiredMode = Schema.RequiredMode.REQUIRED)
	private String langCd;

	@JsonProperty("languageName")
	@Schema(description = "언어 이름", requiredMode = Schema.RequiredMode.REQUIRED)
	private String langNm;


	public static LanguageResponse entityToDto(TcdLang tcdLang) {
		return LanguageResponse.builder()
				.langCd(tcdLang.getLangCd())
				.langNm(tcdLang.getIsoLangNm())
				.build();
	}
}
