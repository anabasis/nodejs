package com.seegene.main.domain.project.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProjectAlarmCode {
	PROJECT_PROCESS_ALARM("C011"),
	PROJECT_MANAGER_ALARM("C010"),
	PROJECT_INFO_ALARM("C009");
	private final String code;
}
