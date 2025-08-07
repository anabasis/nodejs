package com.seegene.main.global.util.s3.constant;





public enum StogTpCd {

	PUBLIC("Public", "PUB"),

	PRIVATE("Private", "PRV");

	private final String name;
	private final String code;

	StogTpCd(String name, String code) {
		this.name = name;
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public String getCode() {
		return code;
	}

}
