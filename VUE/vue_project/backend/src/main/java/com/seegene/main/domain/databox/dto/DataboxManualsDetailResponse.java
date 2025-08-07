package com.seegene.main.domain.databox.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.common.dto.FileInfoResponse;
import com.seegene.main.domain.databox.entity.TbdLibr;
import com.seegene.main.global.convert.DefaultDateTimeConverter;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 자료실 메뉴얼 상세 Response DTO
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
@Schema(description = "자료실 리스트 메뉴얼 상세 Response DTO")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DataboxManualsDetailResponse {

	@JsonProperty("librNum")
	@Schema(description = "자료실 리스트 고유 아이디", example = "1")
	private Long librNum;

	@JsonProperty("librCatNum")
	@Schema(description = "자료실 메뉴얼 고유 아이디,", example = "3")
	private String librCatNum;

	@JsonProperty("titl")
	@Schema(description = "자료실 리스트 상세 제목", example = "자료실 관리 리스트 제목입니다.")
	private String titl;

	@JsonProperty("cont")
	@Schema(description = "자료실 리스트 상세 설명", example ="자료실 관리 리스트 설명입니다.")
	private String cont;

	@JsonProperty("dowlUseYn")
	@Schema(description = "자료실 리스트 상세 파일 다운로드 가능여부", example = "Y or N")
	private String dowlUseYn;

	@JsonProperty("openLvlCd")
	@Schema(description = "자료실 리스트 상세 공개 타입", example = "Public-PUB, Private-PRV, Partially Open-PTL")
	private String openLvlCd;

	@JsonProperty("fileInfoResponses")
	@Schema(description = "자료실 리스트 상세 파일 경로", example = "파일정보")
	private List<FileInfoResponse> fileInfoResponses;

	@JsonProperty("crtrDt")
	@Schema(description = "자료실 리스트 상세 등록일자", example = "2023-07-05")
	private String crtrDt;

	@JsonProperty("mdfDt")
	@Schema(description = "자료실 리스트 상세 변경일자", example = "2023-07-06")
	private String mdfDt;

	public DataboxManualsDetailResponse(TbdLibr tbdLibr) {
		this.librNum = tbdLibr.getLibrCatNum().getId();
		this.librCatNum = String.valueOf(tbdLibr.getId());
		this.titl = tbdLibr.getTitl();
		this.cont = tbdLibr.getCont();
		this.dowlUseYn = tbdLibr.getDowlUseYn();
		this.openLvlCd = tbdLibr.getOpenLvlCd();
		this.crtrDt = DefaultDateTimeConverter.convertDateTime(tbdLibr.getCrtDt());
		this.mdfDt = DefaultDateTimeConverter.convertDateTime(tbdLibr.getMdfDt());
	}
}
