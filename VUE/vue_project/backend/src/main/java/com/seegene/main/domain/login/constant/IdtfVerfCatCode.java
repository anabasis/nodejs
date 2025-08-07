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
 *   1 2023-07-25        khhong        최초작성
 * </PRE>
 */
public enum IdtfVerfCatCode {
	// 휴면회원 복원 인증 - IDV01
	IDV01("IDV01"),
	// 탈퇴인증 - IDV02
	IDV02("IDV02"),
	// 비밀번호 재설정 인증 - IDV03
	IDV03("IDV03");

	private final String code;

	IdtfVerfCatCode(String code) {
		this.code = code;
	}



	public static String getIdtfVerfCatCode(String idtfVerfCatCode) {
		switch (idtfVerfCatCode) {
			case "IDV02":
				return IDV02.code;
			case "IDV03":
				return IDV03.code;
			default:
				return IDV01.code;
		}

	}

	public static String getIdtfVerfCatCode(IdtfVerfCatCode idtfVerfCatCode) {
		switch (idtfVerfCatCode) {
			case IDV02:
				return IDV02.code;
			case IDV03:
				return IDV03.code;
			default:
				return IDV01.code;
		}

	}
}
