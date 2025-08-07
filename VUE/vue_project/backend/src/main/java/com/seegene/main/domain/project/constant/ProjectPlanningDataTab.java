package com.seegene.main.domain.project.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProjectPlanningDataTab {

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
	None(null),
	Quantitative("QUA"),
	Qualitative("QUL"),
	Mutation("MUT");
	private final String code;

	}
