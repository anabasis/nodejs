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
public enum ProjectDevelopmentPurposeCode {
	DP01("DP01")
	, DP02("DP02")
	, DP03("DP03")
	, DP04("DP04");
	private final String code;
}
