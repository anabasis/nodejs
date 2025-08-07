package com.seegene.main.domain.project.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProjectPlanningProcessCodeTab {

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
	Follow_Up("FOUP"),
	Feasibliity("FSBT"),
	Oligo_Design("OLDS"),
	Ordering("ORDR"),
	Planning("PLNG"),
	Prototype("PRTP"),
	Validation("VALD"),
	Verification("VRFC");
	private final String code;

}
