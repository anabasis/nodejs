package com.seegene.main.domain.mypage.constant;

import java.util.Collections;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum WithdrawalReasonCd {
	WD01("WD01","퇴사"),
	WD02("WD02","직무변경"),
	WD03("WD03","기업삭제"),
	WD99("WD99","기타")
	;

	@Getter
	private final String code;

	@Getter
	private final String value;

	private static final Map<String, WithdrawalReasonCd> codes = Collections.unmodifiableMap(
		Stream.of(values()).collect(Collectors.toMap(WithdrawalReasonCd::getCode, Function.identity())));

	private static final Map<String, WithdrawalReasonCd> values = Collections.unmodifiableMap(
		Stream.of(values()).collect(Collectors.toMap(WithdrawalReasonCd::getValue, Function.identity())));

	public static WithdrawalReasonCd findByCode(String code){
		return codes.get(code);
	}

	public static WithdrawalReasonCd findByValue(String value){
		return values.get(value);
	}
}
