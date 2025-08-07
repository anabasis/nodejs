package com.seegene.main.domain.software.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seegene.main.domain.common.dto.QFileInfoResponse;
import com.seegene.main.domain.common.entity.QTsyFl;
import com.seegene.main.domain.software.constant.IvdRuoCode;
import com.seegene.main.domain.software.dto.QSoftwareListReleaseResponse;
import com.seegene.main.domain.software.dto.QSoftwareListResponse;
import com.seegene.main.domain.software.dto.SoftwareListResponse;
import com.seegene.main.domain.software.entity.QTswSw;
import com.seegene.main.domain.software.entity.QTswSwRels;
import com.seegene.main.global.util.QueryDslUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.seegene.main.domain.common.entity.QTsyFl.tsyFl;
import static com.seegene.main.domain.software.entity.QTswSw.tswSw;
import static com.seegene.main.domain.software.entity.QTswSwRels.tswSwRels;
import static org.springframework.util.ObjectUtils.isEmpty;

@RequiredArgsConstructor
public class TswSwRepositoryCustomImpl implements TswSwRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;
    QTsyFl lastFile = new QTsyFl("lastFile");
    QTswSwRels tswSwRelsSub = new QTswSwRels("tswSwRelsSub");
    QTswSw tswSwSub = new QTswSw("tswSwSub");
    QTswSwRels tswSwRelsAll = new QTswSwRels("tswSwRelsAll");
    QTswSwRels tswSwRelsByLimit = new QTswSwRels("tswSwRelsByLimit");
    QTswSw tswSwByLimit = new QTswSw("tswSwByLimit");

    @Override
    public Page<SoftwareListResponse> findAllSoftwareManagement(String keywordName,
                                                                String keyword,
                                                                String type,
                                                                LocalDateTime startDt,
                                                                LocalDateTime endDt,
                                                                Pageable pageable
    ) {
        List<OrderSpecifier> ORDERS = getAllOrderSpecifier(pageable);
        List<SoftwareListResponse> result = jpaQueryFactory.select(
                    new QSoftwareListResponse(
                            tswSw.id,
                            tswSw.swNm,
                            new QSoftwareListReleaseResponse(
                                    tswSwRels.id,
                                    tswSwRels.ver,
                                    new QFileInfoResponse(
                                            lastFile.id,
                                            lastFile.flNm,
                                            lastFile.dspFlNm,
                                            lastFile.flExtn,
                                            lastFile.flPath,
                                            lastFile.flSz,
                                            lastFile.stogTpCd,
                                            lastFile.tblNm
                                    ).skipNulls()
                            ),
                            tswSw.dscrp,
                            new QFileInfoResponse(
                                    tsyFl.id,
                                    tsyFl.flNm,
                                    tsyFl.dspFlNm,
                                    tsyFl.flExtn,
                                    tsyFl.flPath,
                                    tsyFl.flSz,
                                    tsyFl.stogTpCd,
                                    tsyFl.tblNm
                            ),
                            tswSw.ivruDvsCd,
                            tswSw.crtDt,
                            tswSw.crtrUid,
                            tswSw.mdfDt,
                            tswSw.mdfrUid
                    )
                )
                .from(tswSw)
                .leftJoin(tswSw.iconFile, tsyFl)
                .leftJoin(tswSw.tswSwRelsEntities, tswSwRels).on(
                        JPAExpressions
                                .select(tswSwRelsSub.id)
                                .from(tswSwSub)
                                .leftJoin(tswSwSub.tswSwRelsEntities, tswSwRelsSub).on(tswSw.id.eq(tswSwRelsSub.tswSw.id))
                                .where(tswSwSub.id.eq(tswSw.id))
                                .where(
                                        (
                                                JPAExpressions
                                                        .select(tswSwRelsByLimit.crtDt.max())
                                                        .from(tswSwByLimit)
                                                        .leftJoin(tswSwByLimit.tswSwRelsEntities, tswSwRelsByLimit).on(tswSw.id.eq(tswSwRelsByLimit.tswSw.id))
                                                        .where(tswSwByLimit.id.eq(tswSw.id))
                                        ).eq(tswSwRelsSub.crtDt)
                                )
                                .eq(tswSwRels.id)
                )
                .leftJoin(tswSwRels.swfile, lastFile)
                .where(keywordNull(keywordName, keyword))
                .where(eqAll(type))
                .where(dateNull(startDt, endDt))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(ORDERS.toArray(OrderSpecifier[]::new))
                .fetch();

        return new PageImpl<>(result, pageable, getTotalSize(keywordName, keyword, type, startDt, endDt));
    }
    private Long getTotalSize(String keywordName,
                              String keyword,
                              String type,
                              LocalDateTime startDt,
                              LocalDateTime endDt) {
        return jpaQueryFactory.select(tswSw.id.countDistinct())
                .from(tswSw)
                .leftJoin(tswSw.tswSwRelsEntities, tswSwRelsAll)
                .where(keywordNull(keywordName, keyword))
                .where(eqAll(type))
                .where(dateNull(startDt, endDt))
                .fetchFirst();
    }
    private BooleanExpression eqAll(String code) {
        if(ObjectUtils.isEmpty(code)){
            return null;
        }
        return code.equals(IvdRuoCode.All.value()) ? null : tswSw.ivruDvsCd.eq(code);
    }

    private BooleanExpression keywordNull(String keywordName, String keyword) {
        if(!StringUtils.hasText(keyword)){
            return null;
        }else {
            return switch (keywordName) {
                case "AppName" -> tswSw.swNm.contains(keyword);
                case "Description" -> tswSw.dscrp.contains(keyword);
                case "ReleaseNote" -> (
                        JPAExpressions.selectOne()
                                .from(tswSwSub)
                                .leftJoin(tswSw.tswSwRelsEntities, tswSwRelsSub)
                                .where(tswSwSub.id.eq(tswSw.id))
                                .where(tswSwRelsSub.relsNte.contains(keyword)).exists()
                );
                default -> null;
            };
        }
    }

    private BooleanExpression dateNull(LocalDateTime startDt, LocalDateTime endDt) {
        return (startDt != null && endDt != null) ? (tswSw.crtDt.between(startDt, endDt)).or(tswSw.mdfDt.between(startDt, endDt)) : null;
    }

    private List<OrderSpecifier> getAllOrderSpecifier(Pageable pageable) {
        List<OrderSpecifier> orders = new ArrayList<>();

        if(!isEmpty(pageable.getSort())){
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;

                switch (order.getProperty()) {
                    case "crtDt" -> {
                        OrderSpecifier<?> crtDt = QueryDslUtil.getSortedColumn(direction, tswSw, "crtDt");
                        orders.add(crtDt);
                    }
                    case "mdfDt" -> {
                        OrderSpecifier<?> mdfDt = QueryDslUtil.getSortedColumn(direction, tswSw, "mdfDt");
                        orders.add(mdfDt);
                    }
                    default -> {
                    }
                }
            }
        }
        return orders;
    }
}
