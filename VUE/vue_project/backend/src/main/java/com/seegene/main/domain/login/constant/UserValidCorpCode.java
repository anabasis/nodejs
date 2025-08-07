package com.seegene.main.domain.login.constant;

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
 *   1 2023-09-18        khhong        최초작성
 * </PRE>
 */
public enum UserValidCorpCode {

	SEEGENE("SEEGENE"),
	NEWCO("NEWCO"),
	ETC("ETC");

	private final String code;

	UserValidCorpCode(String code) {
		this.code = code;
	}

	public static String getUserValidCorpCode(String userCode) {
		switch (userCode) {
			case "NEWCO":
				return NEWCO.code;
			case "ETC":
				return ETC.code;
			default:
				return SEEGENE.code;
		}
	}
}
