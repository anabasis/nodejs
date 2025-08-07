package com.seegene.main.domain.notice.contant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

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
@Getter
@RequiredArgsConstructor
public enum NoticeKeywordTab {

	Title("Title")
	, Content("Content");
	private final String code;

	}
