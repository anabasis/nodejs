package com.seegene.main.domain.account.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

/**
 * class 한글 설명
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
@Schema(description = "통합설정 라이선스 Response DTO")
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LicenseListResponse {
	@JsonProperty("licenseNumber")
	@Schema(description = "라이선스 고유 아이디", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
	private long licnNum;

	@JsonProperty("systemName")
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "시스템 이름", example = "개발시스템/SGIDEA/Insilico", requiredMode = Schema.RequiredMode.REQUIRED)
	private String systemName;

	@QueryProjection
	public LicenseListResponse(Long licnNum,
							   String systemName
	){
		this.licnNum = licnNum;
		this.systemName = systemName;
	}
}
