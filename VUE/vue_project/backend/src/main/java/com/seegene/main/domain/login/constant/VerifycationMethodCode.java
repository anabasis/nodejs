package com.seegene.main.domain.login.constant;

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
public enum VerifycationMethodCode {
	EML("EML"),
	SMS("SMS");

	private final String code;

	VerifycationMethodCode(String code) {
		this.code = code;
	}

	public static String getVerifycationMethodCode(String verifycationMethodCode) {
		switch (verifycationMethodCode) {
			case "sms":
			case "SMS":
				return SMS.code;
			default:
				return EML.code;
		}
	}
	public static String getVerifycationMethodCode(VerifycationMethodCode verifycationMethodCode) {
		switch (verifycationMethodCode) {
			case SMS:
				return SMS.code;
			default:
				return EML.code;
		}
	}
}
