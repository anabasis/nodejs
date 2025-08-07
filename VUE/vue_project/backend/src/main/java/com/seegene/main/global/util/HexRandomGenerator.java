package com.seegene.main.global.util;

import java.security.SecureRandom;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
 *   1 2023-07-24        khhong        최초작성
 * </PRE>
 */
public class HexRandomGenerator {

	private static final String PATTERN = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+\\[\\]\\{}-]";


	private static final int PASSWORD_LENGTH = 10;
	private static final int ACCREDITATION_LENGTH = 6;

	public static String generateHexRandom() {
		Random random = new Random();
		StringBuilder sb = new StringBuilder(ACCREDITATION_LENGTH);
		for (int i = 0; i < ACCREDITATION_LENGTH; i++) {
			int randomInt = random.nextInt(16); // 0부터 15까지의 난수 생성
			char hexDigit = (randomInt < 10) ? (char) ('0' + randomInt) : (char) ('A' + (randomInt - 10));
			sb.append(hexDigit);
		}
		return sb.toString();
	}

	public static String generateRandomString() {
		SecureRandom random = new SecureRandom();
		StringBuilder sb = new StringBuilder(PASSWORD_LENGTH);
		for (int i = 0; i < PASSWORD_LENGTH; i++) {
			int randomIndex = random.nextInt(PATTERN.length());
			char randomChar = PATTERN.charAt(randomIndex);
			sb.append(randomChar);
		}
		return sb.toString();
	}

	public static boolean validateString(String abd) {
		Pattern pattern = Pattern.compile(PATTERN);
		Matcher matcher = pattern.matcher(abd);
		return matcher.matches() && abd.length() == 10;
	}

}
