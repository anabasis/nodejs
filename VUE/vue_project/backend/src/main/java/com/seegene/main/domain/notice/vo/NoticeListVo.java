package com.seegene.main.domain.notice.vo;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class NoticeListVo {
	private Long ntcNum;
	private String ntcTpCd;
	private String ntcCatCd;
	private String titl;
	private LocalDateTime crtDt;
	private String usrNm;

}
