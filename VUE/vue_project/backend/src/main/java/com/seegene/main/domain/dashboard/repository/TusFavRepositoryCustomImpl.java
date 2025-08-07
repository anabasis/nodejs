package com.seegene.main.domain.dashboard.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seegene.main.domain.common.entity.QTsyFl;
import com.seegene.main.domain.corporate.entity.QTusCorp;
import com.seegene.main.domain.dashboard.dto.*;
import com.seegene.main.domain.dashboard.entity.QTpjTool;
import com.seegene.main.domain.dashboard.entity.QTpjToolPrtlyOpen;
import com.seegene.main.domain.dashboard.entity.QTusFav;
import com.seegene.main.domain.notice.contant.OpenLvlCd;
import com.seegene.main.domain.user.entity.QTusUsr;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class TusFavRepositoryCustomImpl implements TusFavRepositoryCustom{
    private final JPAQueryFactory jpaQueryFactory;
    QTsyFl file = QTsyFl.tsyFl;
    QTusFav tusFav = QTusFav.tusFav;
    QTpjTool tpjTool = QTpjTool.tpjTool;
    QTusUsr user = QTusUsr.tusUsr;
    QTusCorp tusCorp = QTusCorp.tusCorp;

    QTpjToolPrtlyOpen tpjToolPrtlyOpen = QTpjToolPrtlyOpen.tpjToolPrtlyOpen;
    @Override
    public List<ToolResponse> findByUserUidAndFavTpCd(String userUid, String favTpCd) {
        List<ToolResponse> result = jpaQueryFactory.select(new QToolResponse(
        tusFav.id, tpjTool.id, tpjTool.toolNm, tpjTool.toolLnkUrl, new QToolRauncherIcon(file.flNm,
                        file.dspFlNm,
                        file.flExtn,
                        file.flPath,
                        file.flSz)
        )).from(tusFav)
                .join(tpjTool).on(tusFav.toolNum.eq(tpjTool.id))
                .leftJoin(file).on(tpjTool.iconFlNum.eq(file.id))
                .where(tusFav.tusUsr.id.eq(userUid))
                .where(tusFav.favTpCd.eq(favTpCd))
                .fetch();
        return result;
    }

    @Override
    public List<ToolListResponse> findAllByUserUid(String userUid) {
        List<ToolListResponse> result = jpaQueryFactory.select(new QToolListResponse(
                        tpjTool.id, tpjTool.toolNm, tpjTool.toolLnkUrl, new QToolRauncherIcon(file.flNm,
                        file.dspFlNm,
                        file.flExtn,
                        file.flPath,
                        file.flSz)
                )).from(tpjTool)
                .leftJoin(file).on(tpjTool.iconFlNum.eq(file.id))
                .where(
                        tpjTool.openLvlCd.eq(OpenLvlCd.PUB.getCode())
                                .or(tpjTool.openLvlCd.eq(OpenLvlCd.PTL.getCode())
                                        .and(
                                                JPAExpressions.selectOne()
                                                        .from(tpjToolPrtlyOpen)
                                                        .where(tpjToolPrtlyOpen.tpjTool.id.eq(tpjTool.id))
                                                        .where(tpjToolPrtlyOpen.tusCorp.id.eq(
                                                                        JPAExpressions.select(tusCorp.id)
                                                                                .from(user)
                                                                                .innerJoin(user.tusCorp, tusCorp)
                                                                                .where(user.id.eq(userUid))
                                                                )
                                                        )
                                                        .exists()
                                        )
                                )
                ).orderBy(tpjTool.crtDt.desc())
                .fetch();
        return result;
    }
}
