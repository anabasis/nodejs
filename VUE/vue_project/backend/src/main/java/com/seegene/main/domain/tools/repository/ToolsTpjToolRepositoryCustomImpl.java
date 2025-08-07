package com.seegene.main.domain.tools.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seegene.main.domain.common.entity.QTsyFl;
import com.seegene.main.domain.corporate.entity.QTusCorp;
import com.seegene.main.domain.notice.contant.OpenLvlCd;
import com.seegene.main.domain.tools.dto.QToolsListResponse;
import com.seegene.main.domain.tools.dto.QToolsRauncherIcon;
import com.seegene.main.domain.tools.dto.ToolsListResponse;
import com.seegene.main.domain.tools.entity.QToolsTpjTool;
import com.seegene.main.domain.tools.entity.QToolsTpjToolPrtlyOpen;
import com.seegene.main.domain.user.entity.QTusUsr;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ToolsTpjToolRepositoryCustomImpl implements ToolsTpjToolRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;
    QTsyFl file = QTsyFl.tsyFl;
    QToolsTpjTool tpjTool = QToolsTpjTool.toolsTpjTool;
    QTusUsr user = QTusUsr.tusUsr;
    QTusCorp tusCorp = QTusCorp.tusCorp;
    QToolsTpjToolPrtlyOpen tpjToolPrtlyOpen = QToolsTpjToolPrtlyOpen.toolsTpjToolPrtlyOpen;

    @Override
    public List<ToolsListResponse> findAllByUserUid(String userUid) {

        List<ToolsListResponse> result = jpaQueryFactory.select(new QToolsListResponse(
                tpjTool.id, tpjTool.toolNm, tpjTool.dscrp, tpjTool.toolLnkUrl,
                new QToolsRauncherIcon(file.flNm,
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
