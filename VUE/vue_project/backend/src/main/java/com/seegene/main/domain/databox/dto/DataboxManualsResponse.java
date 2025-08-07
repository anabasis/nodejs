package com.seegene.main.domain.databox.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.global.convert.DefaultDateTimeConverter;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 자료실 메뉴얼 Response DTO
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
@Schema(description = "자료실 메뉴얼 Response DTO")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DataboxManualsResponse {

	@JsonProperty("librCatNum")
	@Schema(description = "자료실 메뉴얼 고유 아이디", example = "1", requiredMode = REQUIRED)
	private Long librCatNum;

	@JsonProperty("titl")
	@Schema(description = "자료실 메뉴얼 제목", example = "제목입니다.")
	private String titl;

	@JsonProperty("manualsListCount")
	@Schema(description = "자료실 리스트 갯수", example = "3")
	private Long manualsListCount;

	@JsonProperty("descrp")
	@Schema(description = "자료실 메뉴얼 설명", example = "설명입니다.")
	private String descrp;

	@JsonProperty("sortNum")
	@Schema(description = "자료실 메뉴얼 순서", example = "1")
	private Long sortNum;

	@JsonProperty("imageFileName")
	@Schema(description = "자료실 메뉴얼 이미지 이름", example = "이미지 이름")
	private String imageFileName;

	@JsonProperty("crtrDt")
	@Schema(description = "자료실 메뉴얼 등록일자", example = "2023-07-05 00:00:00")
	private String crtrDt;

	@JsonProperty("mdfDt")
	@Schema(description = "자료실 메뉴얼 변경일자", example = "2023-07-06 00:00:00")
	private String mdfDt;

	public DataboxManualsResponse(Long librCatNum, String titl, Long manualsListCount, String descrp, Long sortNum, String imageFileName, LocalDateTime crtrDt, LocalDateTime mdfDt) {
		this.librCatNum = librCatNum;
		this.titl = titl;
		this.manualsListCount = manualsListCount;
		this.descrp = descrp;
		this.sortNum = sortNum;
		this.imageFileName = imageFileName;
		this.crtrDt = DefaultDateTimeConverter.convertDateTime(crtrDt);
		this.mdfDt = DefaultDateTimeConverter.convertDateTime(mdfDt);
	}
}
