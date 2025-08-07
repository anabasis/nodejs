package com.seegene.main.domain.notice.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seegene.main.domain.corporate.entity.QTusCorp;
import com.seegene.main.domain.datacodemanagement.entity.QTcdCdItm;
import com.seegene.main.domain.datacodemanagement.entity.QTcdCdItmMlg;
import com.seegene.main.domain.notice.contant.NoticeCodeGroup;
import com.seegene.main.domain.notice.contant.OpenLvlCd;
import com.seegene.main.domain.notice.dto.DashboardNoticeListResponse;
import com.seegene.main.domain.notice.dto.NoticeListResponse;
import com.seegene.main.domain.notice.dto.QDashboardNoticeListResponse;
import com.seegene.main.domain.notice.entity.QTbdNtc;
import com.seegene.main.domain.notice.entity.QTbdNtcMlg;
import com.seegene.main.domain.notice.entity.QTbdNtcPrtlyOpen;
import com.seegene.main.domain.user.entity.QTusUsr;
import com.seegene.main.global.util.QueryDslUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.util.ObjectUtils.isEmpty;


@RequiredArgsConstructor
public class TbdNtcRepositoryCustomImpl implements TbdNtcRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;
    QTbdNtc tbdNtc = QTbdNtc.tbdNtc;
    QTusUsr user = QTusUsr.tusUsr;
    QTusCorp tusCorp = QTusCorp.tusCorp;
    QTbdNtcMlg tbdNtcMlg = QTbdNtcMlg.tbdNtcMlg;
    QTbdNtcMlg subMlg = new QTbdNtcMlg("subMlg");
    QTbdNtc subNtc = new QTbdNtc("subNtc");
    QTcdCdItm tcdCdItm = QTcdCdItm.tcdCdItm;
    QTcdCdItmMlg tcdCdItmMlg = QTcdCdItmMlg.tcdCdItmMlg;


    QTbdNtcPrtlyOpen tbdNtcPrtlyOpen = QTbdNtcPrtlyOpen.tbdNtcPrtlyOpen;



    private List<OrderSpecifier> getAllOrderSpecifier(Pageable pageable) {
        List<OrderSpecifier> orders = new ArrayList<>();

        if (!isEmpty(pageable.getSort())) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;

                switch (order.getProperty()) {
                    case "crtDt":
                        OrderSpecifier<?> crtDt = QueryDslUtil.getSortedColumn(direction, tbdNtc,
                                "crtDt");
                        orders.add(crtDt);
                        break;

                    case "mdfDt":
                        OrderSpecifier<?> mdfDt = QueryDslUtil.getSortedColumn(direction, tbdNtc,
                                "mdfDt");
                        orders.add(mdfDt);
                        break;

                    default:
                        break;
                }
            }
        }
        return orders;
    }

    @Override
    public List<DashboardNoticeListResponse> findHomeNotice(String langCd, String userUid) {

        return jpaQueryFactory.select(
                        new QDashboardNoticeListResponse(
                                tbdNtc.id
                                ,tbdNtc.ntcTpCd
                                ,JPAExpressions.select(tcdCdItmMlg.cdNm.coalesce(tcdCdItm.dftcdNm))
                                .from(tcdCdItm)
                                .leftJoin(tcdCdItm.tcdCdItmMlgList, tcdCdItmMlg).on(tcdCdItmMlg.langCd.eq(langCd))
                                .where(tcdCdItm.cd.eq(tbdNtc.ntcTpCd))
                                .where(tcdCdItm.cdGrp.id.eq(NoticeCodeGroup.TYPE.getCode()))
                                ,tbdNtc.ntcCatCd
                                ,JPAExpressions.select(tcdCdItmMlg.cdNm.coalesce(tcdCdItm.dftcdNm))
                                .from(tcdCdItm)
                                .leftJoin(tcdCdItm.tcdCdItmMlgList, tcdCdItmMlg).on(tcdCdItmMlg.langCd.eq(langCd))
                                .where(tcdCdItm.cd.eq(tbdNtc.ntcCatCd))
                                .where(tcdCdItm.cdGrp.id.eq(NoticeCodeGroup.CATEGORY.getCode()))
                                ,tbdNtcMlg.titl
                                ,tbdNtc.crtDt
                        )
                )
                .from(tbdNtc)
                .innerJoin(tbdNtcMlg).on(tbdNtc.id.eq(tbdNtcMlg.tbdNtc.id))
                .where(
                        tbdNtc.openLvlCd.eq(OpenLvlCd.PUB.getCode())
                                .or(tbdNtc.openLvlCd.eq(OpenLvlCd.PTL.getCode())
                                        .and(
                                                JPAExpressions.selectOne()
                                                        .from(tbdNtcPrtlyOpen)
                                                        .where(tbdNtcPrtlyOpen.tbdNtc.id.eq(tbdNtc.id))
                                                        .where(tbdNtcPrtlyOpen.tusCorp.id.eq(
                                                                        JPAExpressions.select(tusCorp.id)
                                                                                .from(user)
                                                                                .innerJoin(user.tusCorp, tusCorp)
                                                                                .where(user.id.eq(userUid))
                                                                )
                                                        )
                                                        .exists()
                                        )
                                )
                )
                .where(tbdNtcMlg.langCd.eq(langCd))
                .where(tbdNtc.expsrEndDt.after(LocalDateTime.now()))
                .orderBy(tbdNtc.crtDt.desc())
                .limit(5)
                .fetch();
   }
}
