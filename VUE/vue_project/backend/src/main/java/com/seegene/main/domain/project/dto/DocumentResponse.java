package com.seegene.main.domain.project.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.seegene.main.domain.common.dto.FileInfoResponse;
import com.seegene.main.domain.project.vo.ProjectDocumentListVo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DocumentResponse {

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "파일 타입", example = "pdf")
	private String fileType;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "파일 최종 여부", example = "Y", requiredMode = Schema.RequiredMode.REQUIRED)
	private String fnlYn;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "파일 DTO", requiredMode = Schema.RequiredMode.REQUIRED)
	private FileInfoResponse fileInfoResponse;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "작성자 명", example = "seegene", requiredMode = Schema.RequiredMode.REQUIRED)
	private String usrNm;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "작성자 아이디", example = "ASDF")
	private String usrUid;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	@Schema(description = "파일 등록 날짜", example = "2023-09-09 12:00:00", requiredMode = Schema.RequiredMode.REQUIRED)
	private LocalDateTime mdfDt;

	public static DocumentResponse planningOf(ProjectDocumentListVo projectDocumentListVo){
		return DocumentResponse.builder()
			.fileType(projectDocumentListVo.getPrjFlTpCd())
			.fnlYn(projectDocumentListVo.getFnlYn())
			.usrNm(projectDocumentListVo.getUsrNm())
			.usrUid(projectDocumentListVo.getUsrUid())
			.mdfDt(projectDocumentListVo.getMdfDt())
			.fileInfoResponse(FileInfoResponse.builder()
				.flNum(projectDocumentListVo.getFlNum())
				.flNm(projectDocumentListVo.getFlNm())
				.dspFlNm(projectDocumentListVo.getDspFlNm())
				.flExtn(projectDocumentListVo.getFlExtn())
				.flPath(projectDocumentListVo.getFlPath())
				.flSz(projectDocumentListVo.getFlSz())
				.stogTpCd(projectDocumentListVo.getStogTpCd())
				.tblNm(projectDocumentListVo.getTblNm())
					.build()
				)
			.build();
	}

	public static DocumentResponse oligoDesignOf(ProjectDocumentListVo projectDocumentListVo){
		return DocumentResponse.builder()
			.usrNm(projectDocumentListVo.getUsrNm())
			.mdfDt(projectDocumentListVo.getMdfDt())
			.fileInfoResponse(FileInfoResponse.builder()
				.flNum(projectDocumentListVo.getFlNum())
				.flNm(projectDocumentListVo.getFlNm())
				.dspFlNm(projectDocumentListVo.getDspFlNm())
				.flExtn(projectDocumentListVo.getFlExtn())
				.flPath(projectDocumentListVo.getFlPath())
				.flSz(projectDocumentListVo.getFlSz())
				.stogTpCd(projectDocumentListVo.getStogTpCd())
				.tblNm(projectDocumentListVo.getTblNm())
				.build()
			)
			.build();
	}

}
