package com.seegene.main.domain.mypage.dto;

public enum ResultValue {
	Y("Y"),
	N("N");

	private final String value;

	ResultValue(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
