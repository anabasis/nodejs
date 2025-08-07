package com.seegene.main.domain.join.constant;

/**
 * JoinCode
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-31        khhong        최초작성
 * </PRE>
 */
public enum JoinCode {


	// 초대[IVT]
	IVT("IVT"),
	// 셀프[SLF]
	SLF("SLF");

	private String code;

	JoinCode(String code) {
		this.code = code;
	}

	public static String getJoinCode(String code) {
		switch (code) {
			case "SLF":
				return SLF.code;
			default :
				return IVT.code;
		}
	}
}
