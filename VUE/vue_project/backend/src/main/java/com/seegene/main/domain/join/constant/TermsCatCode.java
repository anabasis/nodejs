package com.seegene.main.domain.join.constant;

/**
 * Terms Category Code Enum
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-08-01        khhong        최초작성
 * </PRE>
 */
public enum TermsCatCode {

	// 서비스 이용 약관[TM01]
	TM01("TM01"),
	// 개인정보 처리 방침[TM02]
	TM02("TM02"),
	// 정보보보호 서약서[TM03]
	TM03("TM03"),
	// 쿠키사용동의[TM04]
	TM04("TM04");

	private String code;

	TermsCatCode(String code) {
		this.code = code;
	}

	public static String getTermsCatCode(TermsCatCode termsCatCode) {
		switch (termsCatCode) {
			case TM02:
				return TM02.code;
			case TM03:
				return TM03.code;
			case TM04:
				return TM04.code;
			default :
				return TM01.code;
		}

	}

}
