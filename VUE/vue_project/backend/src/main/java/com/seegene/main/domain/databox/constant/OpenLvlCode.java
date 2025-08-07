package com.seegene.main.domain.databox.constant;

/**
 * OpenLvlCode enum
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
public enum OpenLvlCode {
	// Public
	PUB("PUB"),
	// Private
	PRV("PRV"),
	// Partially Open
	PTL("PTL");

	private String code;

	OpenLvlCode(String code) {
		this.code = code;
	}

	public static String getOpenLvlCode(OpenLvlCode openLvlCode) {

		switch (openLvlCode) {
			case PRV:
				return PRV.code;
			case PTL:
				return PTL.code;
			default:
				return PUB.code;
		}
	}
}
