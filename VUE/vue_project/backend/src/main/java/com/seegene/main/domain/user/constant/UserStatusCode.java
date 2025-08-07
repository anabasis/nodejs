package com.seegene.main.domain.user.constant;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : @mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1                 최초작성
 * </PRE>
 */
public enum UserStatusCode {
	// 승인대기
	APW("APW"),
	//휴면
	DWT("DWT"),
	// 탈퇴
	WDR("WDR"),
	// 정상
	NRM("NRM"),
	// 작성중
	WRG("WRG"),

	//승인거절
	RJT("RJT")

	;

	private final String code;

	UserStatusCode(String code) {
		this.code = code;
	}

	public static String getUserStatusCode(UserStatusCode userStatusCode) {
		switch (userStatusCode) {
			case NRM:
				return NRM.code;
			case DWT:
				return DWT.code;
			case WDR:
				return WDR.code;
			case WRG:
				return WRG.code;
			case RJT:
				return RJT.code;
			default:
				return APW.code;
		}
	}
}
