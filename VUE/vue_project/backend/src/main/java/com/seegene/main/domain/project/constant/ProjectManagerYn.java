package com.seegene.main.domain.project.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ProjectManagerYn {
	Y("PJM"), N("PJB");
	private final String code;
}
