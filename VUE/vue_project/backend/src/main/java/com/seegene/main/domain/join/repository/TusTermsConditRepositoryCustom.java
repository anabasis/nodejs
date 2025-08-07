package com.seegene.main.domain.join.repository;

import java.util.List;
import java.util.Optional;

import com.seegene.main.domain.join.dto.TusTermsAgrResponse;

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
public interface TusTermsConditRepositoryCustom {

	Optional<TusTermsAgrResponse> findByUserTermsCatCode(String termsVerNum, String langCd);
}
