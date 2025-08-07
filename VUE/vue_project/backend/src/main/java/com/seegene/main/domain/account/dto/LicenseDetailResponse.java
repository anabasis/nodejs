package com.seegene.main.domain.account.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LicenseDetailResponse {
	@JsonProperty("licenseNumber")
	@Schema(description = "라이선스 고유 아이디", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
	private Long licnNum;

	@JsonProperty("systemType")
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "시스템 타입", example = "DES/ISC/SGI", requiredMode = Schema.RequiredMode.REQUIRED)
	private String systemType;

	@JsonProperty("systemName")
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "시스템 이름", example = "개발시스템/SGIDEA/Insilico", requiredMode = Schema.RequiredMode.REQUIRED)
	private String systemName;

	@JsonProperty("content")
	@Schema(description = "라이선스 설명", example = "라이선스 설명..", requiredMode = Schema.RequiredMode.REQUIRED)
	private String cont;

	@JsonProperty("createUid")
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "생성자 유저아이디", requiredMode = Schema.RequiredMode.REQUIRED)
	private String crtrUid;

	@JsonProperty("createDate")
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	@Schema(description = "생성 일자", example = "2023-01-01 12:00:00", requiredMode = Schema.RequiredMode.REQUIRED)
	private LocalDateTime crtDt;

	@JsonProperty("modifierUid")
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "수정자 유저아이디")
	private String mdfrUid;

	@JsonProperty("modifyDate")
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	@Schema(description = "수정 일자", example = "2024-12-31 12:00:00", requiredMode = Schema.RequiredMode.REQUIRED)
	private LocalDateTime mdfDt;

	@QueryProjection
	public LicenseDetailResponse(Long licnNum,
								 String systemType,
								 String systemName,
								 String cont,
								 String crtrUid,
								 LocalDateTime crtDt,
								 String mdfrUid,
								 LocalDateTime mdfDt
	) {
		this.licnNum = licnNum;
		this.systemType = systemType;
		this.systemName = systemName;
		this.cont = cont;
		this.crtrUid = crtrUid;
		this.crtDt = crtDt;
		this.mdfrUid = mdfrUid;
		this.mdfDt = mdfDt;
	}
}

