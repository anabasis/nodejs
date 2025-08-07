package com.seegene.main.domain.project.vo;

import java.time.LocalDateTime;

import lombok.Data;
@Data
public class ProjectAuthorityVo {
	private long id;
	private String aprvRslCd;
	private String reqTpCd;
	private String userNm;
	private String orgnNm;
	private String prcsAuth;
	private String flPath;
	private String flNm;
	private String flExtn;
	private LocalDateTime crtDt;
}
