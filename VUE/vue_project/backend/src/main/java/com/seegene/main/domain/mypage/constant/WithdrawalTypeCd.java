package com.seegene.main.domain.mypage.constant;

import java.util.Collections;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum WithdrawalTypeCd {
	SLF("SLF","직접탈퇴"),
	AMF("AMF","관리자강제탈퇴"),
	ATM("ATM","비활성사용자동탈퇴"),
	;

	@Getter
	private final String code;

	@Getter
	private final String value;

	private static final Map<String, WithdrawalTypeCd> codes = Collections.unmodifiableMap(
		Stream.of(values()).collect(Collectors.toMap(WithdrawalTypeCd::getCode, Function.identity())));

	private static final Map<String, WithdrawalTypeCd> values = Collections.unmodifiableMap(
		Stream.of(values()).collect(Collectors.toMap(WithdrawalTypeCd::getValue, Function.identity())));

	public static WithdrawalTypeCd findByCode(String code){
		return codes.get(code);
	}

	public static WithdrawalTypeCd findByValue(String value){
		return values.get(value);
	}
}
