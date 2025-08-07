package com.seegene.main.domain.project.repository;

import static com.seegene.main.domain.common.entity.QTsyFl.*;
import static com.seegene.main.domain.project.entity.QTcdPrcs.*;
import static com.seegene.main.domain.project.entity.QTpjPrjMbr.*;
import static com.seegene.main.domain.project.entity.QTpjPrjMbrHst.*;
import static com.seegene.main.domain.project.entity.QTpjPrjPrcsMbr.*;

import java.util.List;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seegene.main.domain.project.dto.ProjectMemberListResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TpjPrjPrcsMbrRepositoryCustomImpl implements TpjPrjPrcsMbrRepositoryCustom{
	private final JPAQueryFactory jpaQueryFactory;

	private BooleanExpression prcsCdCondition(Long prjPrcsNumber) {
		if (prjPrcsNumber != null) {
			return tpjPrjPrcsMbr.tpjPrjPrcs.id.eq(prjPrcsNumber);
		}
		return null;
	}

	@Override
	public List<ProjectMemberListResponse> getProjectMemberList(Long id ,Long prjPrcsNumber ) {

		return jpaQueryFactory.select(Projections.constructor(
			ProjectMemberListResponse.class
			, tpjPrjPrcsMbr.prcsRolCd
			, tpjPrjPrcsMbr.tpjPrjMbr.tusUsr.id
			, tpjPrjPrcsMbr.tpjPrjMbr.tusUsr.usrNm
			, tpjPrjPrcsMbr.tpjPrjMbr.tusUsr.orgnNm
			, tpjPrjPrcsMbr.tpjPrjMbr.tusUsr.usrStsCd
			, tpjPrjPrcsMbr.tpjPrjMbr.tpjPrj.startDat
			, tpjPrjPrcsMbr.tpjPrjMbr.tpjPrj.endDat
			, Expressions.stringTemplate("group_concat({0})", tcdPrcs.prcsNm).concat(",")
			, tpjPrjPrcsMbr.tpjPrjMbr.id
		)).from(tpjPrjPrcsMbr)
			.join(tcdPrcs)
			.on(tcdPrcs.id.eq(tpjPrjPrcsMbr.tpjPrjPrcs.prcsCd))
			.where(tpjPrjPrcsMbr.tpjPrjMbr.tpjPrj.id.eq(id)
				 .and(prcsCdCondition(prjPrcsNumber))
			).groupBy(tpjPrjPrcsMbr.tpjPrjMbr.tusUsr.id,tpjPrjPrcsMbr.prcsRolCd)
			.fetch();
	}
}
