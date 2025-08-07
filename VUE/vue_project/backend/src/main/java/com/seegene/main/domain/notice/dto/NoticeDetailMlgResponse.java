package com.seegene.main.domain.notice.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.seegene.main.domain.notice.entity.TbdNtcMlg;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDetailMlgResponse {

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "공지사항 언어코드", example = "EN", requiredMode = Schema.RequiredMode.REQUIRED)
	private String langCode;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "공지사항 타이틀", example = "Title", requiredMode = Schema.RequiredMode.REQUIRED)
	private String title;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "공지사항 내용", example = "Content", requiredMode = Schema.RequiredMode.REQUIRED)
	private String content;

	public static NoticeDetailMlgResponse of (TbdNtcMlg tbdNtcMlg) {
		return NoticeDetailMlgResponse.builder()
			.langCode(tbdNtcMlg.getLangCd())
			.title(tbdNtcMlg.getTitl())
			.content(tbdNtcMlg.getCont())
			.build();
	}

}

