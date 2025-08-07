package com.seegene.main.domain.join.vo;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-10-11        khhong        최초작성
 * </PRE>
 */
@Schema(description = "약관 동의 목록 VO")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JoinAgreementVo {

	private String termsCatCd;
	private String termsVerNum;
	private String essYn;
	private String cntryGrpId;
	private String ver;
	private String cdNm;
	private String cont;
	private String langCode;
	private LocalDateTime crtDt;
}
