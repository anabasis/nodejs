package com.seegene.main.global.function;

import java.util.function.Consumer;

import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.exception.BusinessException;

/**
 * ExceptionInterface
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-08-02        khhong        최초작성
 * </PRE>
 */
public interface ExceptionInterface {
	Consumer<ErrorCode> businessException = errorCode -> {
		throw new BusinessException(errorCode, errorCode.getDefaultMessage());
	};

	// Consumer<ErrorCode> domainException = errorCode -> {
	// 	throw new BusinessException(errorCode, errorCode.getDefaultMessage());
	// };

}
