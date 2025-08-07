package com.seegene.main.domain.project.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * ProjectTab
 * <PRE>
 * </PRE>
 * @author   : jskim4@seegene.com
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-03        jskim        최초작성
 * </PRE>
 */
@Getter
@RequiredArgsConstructor
public enum ProjectTab {
	MY("my")
	, ALL("all")
	, NEW_CO("newCo"),
	PROJECT("project");
	private final String code;
}
