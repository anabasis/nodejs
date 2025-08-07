package com.seegene.main.domain.project.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProjectPlanningDocumentStatusTab {

	/**
	 * ProjectListResponse
	 * <PRE>
	 * </PRE>
	 * @author   : wwsoh@seegene.com
	 *
	 * @History
	 * <PRE>
	 * No  Date           Author            Desc
	 *---- ------------ ---------------- ------------------------------------
	 *   1 2023-07-07        wwsoh        최초작성
	 * </PRE>
	 */

	최종("Y"),
	일반("N"),
	;

	private final String code;

}
