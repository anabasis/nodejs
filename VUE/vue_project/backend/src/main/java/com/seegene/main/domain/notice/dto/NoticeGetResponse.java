package com.seegene.main.domain.notice.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.notice.entity.TbdNtc;
import com.seegene.main.domain.notice.vo.NoticeListVo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : wwsoh@seegene.com
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-07        wwsoh        최초작성
 * </PRE>
 */
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NoticeGetResponse {

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "등록 순서 (자동)", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
	private Long ntcNum;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "타입", example = "NTN", requiredMode = Schema.RequiredMode.REQUIRED)
	private String ntcTpCd;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "카테고리", example = "SVG", requiredMode = Schema.RequiredMode.REQUIRED)
	private String ntcCatCd;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "제목", example = "Lorem ipsum.", requiredMode = Schema.RequiredMode.REQUIRED)
	private String titl;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "공지사항 작성자", example = "Annonymous", requiredMode = Schema.RequiredMode.REQUIRED)
	private String usrNm;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	@Schema(description = "공지사항 생성일자", example = "2023-08-30 12:00:00", requiredMode = Schema.RequiredMode.REQUIRED)
	private LocalDateTime crtDt;

	public static NoticeGetResponse of(NoticeListVo noticeListVo){
		return NoticeGetResponse.builder()
			.ntcNum(noticeListVo.getNtcNum())
			.ntcTpCd(noticeListVo.getNtcTpCd())
			.ntcCatCd(noticeListVo.getNtcCatCd())
			.titl(noticeListVo.getTitl())
			.crtDt(noticeListVo.getCrtDt())
			.usrNm(noticeListVo.getUsrNm())
			.build();
	}
}