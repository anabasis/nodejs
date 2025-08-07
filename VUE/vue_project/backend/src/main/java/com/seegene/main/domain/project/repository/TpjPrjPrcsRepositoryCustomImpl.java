package com.seegene.main.domain.project.repository;

import static com.seegene.main.domain.datacodemanagement.entity.QTcdCdItm.*;
import static com.seegene.main.domain.datacodemanagement.entity.QTcdCdItmMlg.*;
import static com.seegene.main.domain.project.entity.QTcdPrcs.*;
import static com.seegene.main.domain.project.entity.QTpjPrjPrcs.*;

import java.util.List;
import java.util.Optional;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seegene.main.domain.external.dto.ProjectProcessInfoResponse;
import com.seegene.main.domain.project.dto.ProjectProcessResponse;
import com.seegene.main.domain.project.dto.ProjectProcessUserResponse;
import com.seegene.main.domain.project.entity.QTpjPrj;
import com.seegene.main.domain.project.entity.QTpjPrjMbr;
import com.seegene.main.domain.project.entity.QTpjPrjPrcs;
import com.seegene.main.domain.project.entity.QTpjPrjPrcsMbr;
import com.seegene.main.domain.user.entity.QTusUsr;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TpjPrjPrcsRepositoryCustomImpl implements TpjPrjPrcsRepositoryCustom{
    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public List<ProjectProcessResponse> getProjectProcessDetailList(Long prjNum, String langCd) {
        return jpaQueryFactory.select(Projections.constructor(
                ProjectProcessResponse.class,
                tpjPrjPrcs.tpjPrj.id.as("prjNumber"),
                tpjPrjPrcs.id.as(       "prjPrcsNumber"),
                tpjPrjPrcs.prcsCd.as(   "prcsCode"),
                tcdPrcs.prcsNm.as(      "prcsName"),
                tpjPrjPrcs.prcsStsCd.as("prcsStsCode"),
                ExpressionUtils.as(JPAExpressions.select(tcdCdItmMlg.cdNm)
                .from(tcdCdItm)
                .innerJoin(tcdCdItmMlg)
                .on(tcdCdItm.id.eq(tcdCdItmMlg.cdItm.id)
                .and(tcdCdItmMlg.langCd.eq(langCd))
                ).where(tcdCdItm.cd.eq(tpjPrjPrcs.prcsStsCd))
                .limit(1)
                ,"prcsStsName")
        )).from(tpjPrjPrcs)
        .innerJoin(tcdPrcs).on(tpjPrjPrcs.prcsCd.eq(tcdPrcs.id))
        .where(tpjPrjPrcs.tpjPrj.id.eq(prjNum))
        .orderBy(tpjPrjPrcs.id.asc())
        .fetch();
    }

    @Override
    public Optional<List<ProjectProcessInfoResponse>> findByPrjPrcsPrjId(String usrUid) {
        var tpjPrj = QTpjPrj.tpjPrj;
        var tpjPrjMbr = QTpjPrjMbr.tpjPrjMbr;
        var tpjPrjPrcs = QTpjPrjPrcs.tpjPrjPrcs;
        var tpjPrjPrcsMbr = QTpjPrjPrcsMbr.tpjPrjPrcsMbr;
        var tusUsr = QTusUsr.tusUsr;

        var result = jpaQueryFactory.select(Projections.constructor(ProjectProcessInfoResponse.class, tpjPrjMbr.id, tpjPrjMbr.tpjPrj.id, tpjPrj.prjNm, tpjPrjMbr.tusUsr.id, tusUsr.usrNm, tusUsr.emlId, tpjPrjMbr.prjRolCd, tpjPrjPrcs.prcsCd,  tpjPrjPrcsMbr.prcsRolCd))
                .from(tpjPrjMbr)
                .join(tpjPrj).on(tpjPrj.id.eq(tpjPrjMbr.tpjPrj.id))
                .join(tusUsr).on(tusUsr.id.eq(tpjPrjMbr.tusUsr.id))
                .leftJoin(tpjPrjPrcsMbr).on(tpjPrjPrcsMbr.tpjPrjMbr.id.eq(tpjPrjMbr.id))
                .leftJoin(tpjPrjPrcs).on(tpjPrjPrcs.id.eq(tpjPrjPrcsMbr.tpjPrjPrcs.id))
                .where(tpjPrjMbr.tusUsr.id.eq(usrUid))
                .fetch();
        if (result.size() == 0) {
            return Optional.empty();
        }
        return Optional.of(result);
    }

    @Override
    public List<ProjectProcessUserResponse> findByNoteToUserList(Long prjNum, Long prjPrcsNum) {
        var tpjPrjMbr       = QTpjPrjMbr.tpjPrjMbr;
        var tpjPrjPrcsMbr   = QTpjPrjPrcsMbr.tpjPrjPrcsMbr;
        return jpaQueryFactory.select(Projections.constructor(ProjectProcessUserResponse.class,
                tpjPrjMbr.tusUsr.id.as("usrUid")
            )).from(tpjPrjMbr)
            .innerJoin(tpjPrjPrcsMbr)
            .on(tpjPrjMbr.id.eq(tpjPrjPrcsMbr.tpjPrjMbr.id)
            .and(tpjPrjMbr.tpjPrj.id.eq(prjNum))
            .and(tpjPrjPrcsMbr.tpjPrjPrcs.id.eq(prjPrcsNum))
            ).fetch();
    }

    @Override
    public Optional<ProjectProcessInfoResponse> existsByTpjPrjIdAndprocessIdAndPrcsRoleCd(String usrUid, Long prjNum, Long processId, String procsRoleCode) {

        var tpjPrj = QTpjPrj.tpjPrj;
        var tpjPrjMbr = QTpjPrjMbr.tpjPrjMbr;
        var tpjPrjPrcs = QTpjPrjPrcs.tpjPrjPrcs;
        var tpjPrjPrcsMbr = QTpjPrjPrcsMbr.tpjPrjPrcsMbr;
        var tusUsr = QTusUsr.tusUsr;

        var result = jpaQueryFactory.select(Projections.constructor(ProjectProcessInfoResponse.class, tpjPrjMbr.id, tpjPrjMbr.tpjPrj.id, tpjPrj.prjNm, tpjPrjMbr.tusUsr.id, tusUsr.usrNm, tusUsr.emlId, tpjPrjMbr.prjRolCd, tpjPrjPrcs.prcsCd,  tpjPrjPrcsMbr.prcsRolCd))
            .from(tpjPrjMbr)
            .join(tpjPrj).on(tpjPrj.id.eq(tpjPrjMbr.tpjPrj.id))
            .join(tusUsr).on(tusUsr.id.eq(tpjPrjMbr.tusUsr.id))
            .leftJoin(tpjPrjPrcsMbr).on(tpjPrjPrcsMbr.tpjPrjMbr.id.eq(tpjPrjMbr.id))
            .leftJoin(tpjPrjPrcs).on(tpjPrjPrcs.id.eq(tpjPrjPrcsMbr.tpjPrjPrcs.id))
            .where(tpjPrjMbr.tusUsr.id.eq(usrUid).and(tpjPrj.id.eq(prjNum)).and(tpjPrjPrcs.id.eq(processId)).and(tpjPrjPrcsMbr.prcsRolCd.eq(procsRoleCode)))
            .fetchOne();

        if (result == null) {
            return Optional.of(result);
        }
        return Optional.of(result);
    }

}
