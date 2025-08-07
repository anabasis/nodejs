package com.seegene.main.domain.project.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProjectStatusCode {
	ONGOING("ONG")
	, ABORTED("ABR")
	, COMPLETED("CMP");
	private final String code;
}
