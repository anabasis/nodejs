package com.seegene.main.global.external.api.support;

import com.seegene.main.global.function.ExceptionInterface;

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
public interface AbstractApiCallSupport extends ExceptionInterface {

	/**
	 * 응답 본문 데이터 추출.
	 * @param source 외부 API로 부터 전송받은 응답 본문.
	 * @return 응답 본문.
	 */
	default <T> T unwrap(final T source) {
		return source;
	}
}
