
package com.seegene.main.domain.project.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TcdCdGrpItmCode {
	PROCESS_ON_GOING("PCNG"),
	PROCESS_NOT_IN_PROGRESS("PCWT"),
	PROCESS_DONE("PCFN"),
	PROCESS_PAUSE("PCST"),

	PROJECT_ON_GOING("ONG"),
	PROJECT_ABORTED("ABR"),
	PROJECT_COMPLETED("CMP");

	private final String code;
}
