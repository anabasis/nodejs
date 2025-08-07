package com.seegene.main.domain.user.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seegene.main.domain.login.dto.LoginInactiveRequest;
import com.seegene.main.domain.login.dto.LoginVerifyAuthenticateRequest;
import com.seegene.main.domain.user.entity.QTusUsr;
import com.seegene.main.domain.user.entity.QTusUsrIdtfVerf;

import lombok.RequiredArgsConstructor;

/**
 * TusUsrIdtfVerfRepositoryCustomImpl
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-24        khhong        최초작성
 * </PRE>
 */
@RequiredArgsConstructor
public class TusUsrIdtfVerfRepositoryCustomImpl implements TusUsrIdtfVerfRepositoryCustom{

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public Optional<LoginVerifyAuthenticateRequest> findByVerfKey(String emailId, String idtfVerfCatCd, String authKey) {
		QTusUsrIdtfVerf qTusUsrIdtfVerf = QTusUsrIdtfVerf.tusUsrIdtfVerf;
		QTusUsr qTusUsr = QTusUsr.tusUsr;
		LoginVerifyAuthenticateRequest value = jpaQueryFactory.select(Projections.constructor(LoginVerifyAuthenticateRequest.class, qTusUsrIdtfVerf.emlId, qTusUsrIdtfVerf.idtfVerfCatCd, qTusUsrIdtfVerf.verfKey))
				.from(qTusUsrIdtfVerf).join(qTusUsr).on(qTusUsrIdtfVerf.usrUid.id.eq(qTusUsr.id)).where(qTusUsr.emlId.eq(emailId)
				.and(qTusUsrIdtfVerf.verfKey.eq(authKey))
				.and(qTusUsrIdtfVerf.exprDt.goe(LocalDateTime.now()))).fetchOne();
		if(value == null) {
			return Optional.empty();
		}
		return Optional.of(value);
	}
}
