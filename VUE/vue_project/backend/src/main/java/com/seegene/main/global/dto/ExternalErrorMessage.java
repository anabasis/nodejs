package com.seegene.main.global.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-09-20        khhong        최초작성
 * </PRE>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExternalErrorMessage {

	private int statusCode;
	private String message;
	private String description;
	private String timestamp;
}
