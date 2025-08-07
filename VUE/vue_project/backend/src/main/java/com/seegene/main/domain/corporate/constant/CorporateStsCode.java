package com.seegene.main.domain.corporate.constant;

import com.seegene.main.domain.login.constant.IdtfVerfCatCode;

/**
 * Corporate Status Code
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-10-12        khhong        최초작성
 * </PRE>
 */
public enum CorporateStsCode {

	// 계약 진행 중
	ONG("ONG"),

	// 활성
	ACT("ACT"),

	// 비활성
	INC("INC"),

	// 삭제
	DEL("DEL");

	private final String code;

	CorporateStsCode(String code) {
		this.code = code;
	}

	public static String getCorporateStsCode(CorporateStsCode corporateStsCode) {
		switch (corporateStsCode) {
			case ONG:
				return ONG.code;
			case INC:
				return INC.code;
			case DEL:
				return DEL.code;
			default:
				return ACT.code;
		}
	}
}
