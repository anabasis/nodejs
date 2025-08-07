package com.seegene.main.global.exception;

import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.dto.ErrorMessage;
import com.seegene.main.global.dto.ExternalErrorMessage;

import lombok.Getter;

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
@Getter
public class FeignException extends RuntimeException {

	private ErrorCode errorCode;
	private ExternalErrorMessage externalErrorMessage;

	public FeignException(ErrorCode errorCode, ExternalErrorMessage externalErrorMessage) {
		this.errorCode = errorCode;
		this.externalErrorMessage = externalErrorMessage;
	}
}
