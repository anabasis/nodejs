package com.seegene.main.domain.notice.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.seegene.main.domain.common.entity.TsyFl;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDetailFlResponse {

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "파일 이름", example = "file 1", requiredMode = Schema.RequiredMode.REQUIRED)
	private String fileName;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "파일 형식", example = "png", requiredMode = Schema.RequiredMode.REQUIRED)
	private String fileExtension;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "파일 경로", example = "some file path", requiredMode = Schema.RequiredMode.REQUIRED)
	private String filePath;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "파일 사이즈", example = "1111", requiredMode = Schema.RequiredMode.REQUIRED)
	private Long fileSize;

	public static NoticeDetailFlResponse of(TsyFl tsyFl) {
		return NoticeDetailFlResponse.builder()
			.fileName(tsyFl.getFlNm())
			.fileExtension(tsyFl.getFlExtn())
			.filePath(tsyFl.getFlPath())
			.fileSize(tsyFl.getFlSz())
			.build();
	}

}