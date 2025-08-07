package com.seegene.main.domain.account.constant;


public enum CdGrpCode {

	TERMS("Terms Category Code", "PFM047"),
	SYSTEM("System Code", "PFM031");

	private final String name;
	private final String code;

	CdGrpCode(String name, String code) {
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
