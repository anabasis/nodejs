package com.seegene.main.global.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : @mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1                 최초작성
 * </PRE>
 */
@Getter
@Setter
public class InvalidArguments {

	private static final long serialVersionUID = 1L;

	private final String field;
	private final Object value;
	private final String message;

	public InvalidArguments(String field, Object value, String message) {
		this.field = field;
		this.value = value;
		this.message = message;
	}
}
