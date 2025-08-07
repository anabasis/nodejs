
package com.seegene.main.domain.project.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TcdCdGrpCode {
	PURPOSE_CD_GRP_ID("PFM015"),
	DISEASE_CD_GRP_ID("PFM020"),
	RGLTR_CD_GRP_ID("PFM023"),
	FILE_TYPE_CD_GRP_ID("PFM024"),
	FILE_STATUS_CD_GRP_ID("PFM065"),
	PROCESS_STATUS_CD_GRP_ID("PFM025"),
	PROJECT_STATUS_CD_GRP_ID("PFM027");
	private final String code;
}
