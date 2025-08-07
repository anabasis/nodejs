package com.seegene.main.domain.join.repository.impl;

import java.util.List;
import java.util.Optional;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seegene.main.domain.join.dto.TusTermsAgrResponse;
import com.seegene.main.domain.join.entity.QTusTermsCondit;
import com.seegene.main.domain.join.repository.TusTermsConditRepositoryCustom;

import lombok.RequiredArgsConstructor;

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
 *   1 2023-08-07        khhong        최초작성
 * </PRE>
 */
@RequiredArgsConstructor
public class TusTermsConditRepositoryCustomImpl implements TusTermsConditRepositoryCustom {

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public Optional<TusTermsAgrResponse> findByUserTermsCatCode(String termsVerNum, String langCd) {
		QTusTermsCondit qTusTermsCondit = QTusTermsCondit.tusTermsCondit;

		var result = jpaQueryFactory.select(
			Projections.constructor(TusTermsAgrResponse.class, qTusTermsCondit.id, qTusTermsCondit.tusTermsVer.id, qTusTermsCondit.langCd, qTusTermsCondit.cont))
			.from(qTusTermsCondit)
			.where(qTusTermsCondit.tusTermsVer.id.eq(Long.parseLong(termsVerNum)).and(qTusTermsCondit.langCd.eq(langCd)))
			.orderBy(qTusTermsCondit.tusTermsVer.id.desc()).fetchOne();
		if (result == null) {
			return Optional.empty();
		}
		return Optional.of(result);
	}
}
