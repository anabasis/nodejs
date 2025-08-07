
package com.seegene.main.domain.project.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ProcessRoleCode {
	MGMT("MGMT"),EDIT("EDIT"),VIEW("VIEW");
	private final String code;
}
