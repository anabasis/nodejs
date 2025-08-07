package com.seegene.main.domain.project.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ProjectDocumentListVo {

	private Long flNum;
	private String prjFlTpCd;
	private String fnlYn;
	private String flNm;
	private String dspFlNm;
	private String flExtn;
	private String flPath;
	private Long flSz;
	private String stogTpCd;
	private String tblNm;
	private String usrUid;
	private String usrNm;
	private LocalDateTime mdfDt;
}
