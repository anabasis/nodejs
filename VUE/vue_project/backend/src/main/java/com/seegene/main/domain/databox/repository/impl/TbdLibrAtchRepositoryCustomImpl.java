package com.seegene.main.domain.databox.repository.impl;

import static org.springframework.util.ObjectUtils.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seegene.main.domain.databox.dto.DataboxManualsDetailResponse;
import com.seegene.main.domain.databox.dto.DataboxManualsResponse;
import com.seegene.main.domain.databox.entity.QTbdLibr;
import com.seegene.main.domain.databox.entity.QTbdLibrCat;
import com.seegene.main.domain.databox.repository.TbdLibrAtchRepositoryCustom;
import com.seegene.main.domain.user.entity.QTusUsr;
import com.seegene.main.global.util.QueryDslUtil;

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
 *   1 2023-08-01        khhong        최초작성
 * </PRE>
 */
@RequiredArgsConstructor
public class TbdLibrAtchRepositoryCustomImpl implements TbdLibrAtchRepositoryCustom {

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public Optional<List<DataboxManualsResponse>> findAllDataboxManuals(Pageable pageable) {
		List<OrderSpecifier> orders = getAllOrderSpecifierTbdLibrCat(pageable);

		QTbdLibrCat qTbdLibrCat = QTbdLibrCat.tbdLibrCat;
		QTbdLibr qTbdLibr = QTbdLibr.tbdLibr;
		//
		List<DataboxManualsResponse> result = jpaQueryFactory.select(Projections.constructor(DataboxManualsResponse.class, qTbdLibrCat.id, qTbdLibrCat.librCatNm, qTbdLibr.librCatNum.count(), qTbdLibrCat.dscrp, qTbdLibrCat.sortNum, qTbdLibrCat.iconFlNm, qTbdLibrCat.crtDt, qTbdLibrCat.mdfDt))
			.from(qTbdLibrCat)
			.leftJoin(qTbdLibr).on(qTbdLibrCat.id.eq(qTbdLibr.librCatNum.id))
			.groupBy(qTbdLibrCat.id)
			.orderBy(orders.stream().toArray(OrderSpecifier[]::new))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize()).fetch();

		return Optional.of(result);
	}

	@Override
	public Optional<List<DataboxManualsDetailResponse>> findAllDataboxManualsList(Long librCatNum, LocalDateTime startDate, LocalDateTime endDate, String type, String keyword, Pageable pageable) {

		List<OrderSpecifier> orders = getAllOrderSpecifierTbdLibr(pageable);

		QTbdLibr qTbdLibr = QTbdLibr.tbdLibr;
		QTbdLibrCat qTbdLibrCat = QTbdLibrCat.tbdLibrCat;
		QTusUsr qTusUsr = QTusUsr.tusUsr;

		BooleanExpression searchType = null;

		if(type.equals("title")){
			searchType = qTbdLibrCat.id.eq(librCatNum).and(qTbdLibr.crtDt.between(startDate, endDate)).and(qTbdLibr.titl.eq(keyword));
		} else if (type.equals("cont")) {
			searchType = qTbdLibrCat.id.eq(librCatNum).and(qTbdLibr.crtDt.between(startDate, endDate)).and(qTbdLibr.cont.contains(keyword));
		} else {
			searchType = qTbdLibrCat.id.eq(librCatNum);
		}

		List<DataboxManualsDetailResponse> result = jpaQueryFactory.select(Projections.constructor(DataboxManualsDetailResponse.class, qTbdLibr))
			.from(qTbdLibr)
			.join(qTbdLibrCat).on(qTbdLibrCat.id.eq(qTbdLibr.librCatNum.id))
			.join(qTusUsr).on(qTusUsr.id.eq(qTbdLibr.usrUid.id))
			.where(searchType)
			.orderBy(orders.stream().toArray(OrderSpecifier[]::new))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize()).fetch();
		return Optional.of(result);
	}

	private List<OrderSpecifier> getAllOrderSpecifierTbdLibr(Pageable pageable) {
		List<OrderSpecifier> orders = new ArrayList<>();

		if(!isEmpty(pageable.getSort())){
			for (Sort.Order order : pageable.getSort()) {
				Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;

				switch (order.getProperty()) {
					case "crtDt":
						OrderSpecifier<?> crtDt = QueryDslUtil.getSortedColumn(direction, QTbdLibr.tbdLibr, "crtDt");
						orders.add(crtDt);
						break;
					case "mdfDt":
						OrderSpecifier<?> mdfDt = QueryDslUtil.getSortedColumn(direction, QTbdLibr.tbdLibr, "mdfDt");
						orders.add(mdfDt);
						break;
					case "librNum":
						OrderSpecifier<?> librNum = QueryDslUtil.getSortedColumn(direction, QTbdLibr.tbdLibr, "id");
						orders.add(librNum);
						break;
					default:
						break;
				}
			}
		}
		return orders;
	}

	private List<OrderSpecifier> getAllOrderSpecifierTbdLibrCat(Pageable pageable) {
		List<OrderSpecifier> orders = new ArrayList<>();

		if(!isEmpty(pageable.getSort())){
			for (Sort.Order order : pageable.getSort()) {
				Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;

				switch (order.getProperty()) {
					case "crtDt":
						OrderSpecifier<?> crtDt = QueryDslUtil.getSortedColumn(direction, QTbdLibrCat.tbdLibrCat, "crtDt");
						orders.add(crtDt);
						break;
					case "mdfDt":
						OrderSpecifier<?> mdfDt = QueryDslUtil.getSortedColumn(direction, QTbdLibrCat.tbdLibrCat, "mdfDt");
						orders.add(mdfDt);
						break;
					case "sortNum":
						OrderSpecifier<?> sortNum = QueryDslUtil.getSortedColumn(direction, QTbdLibrCat.tbdLibrCat, "sortNum");
						orders.add(sortNum);
						break;
					default:
						break;
				}
			}
		}
		return orders;
	}
}
