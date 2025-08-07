package com.seegene.main.domain.corporate.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum CorporateLvlCd {
	LV2("LV2","Other"),
	LV1("LV1","Seegene HQ");


	private final String code;

	private final String value;

}
