package com.seegene.main.domain.board.repository;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seegene.main.domain.board.constant.QnaCdGrpCode;
import com.seegene.main.domain.board.dto.QPrtnUserResponse;
import com.seegene.main.domain.board.dto.QQnaAttachResponse;
import com.seegene.main.domain.board.dto.QQnaResponse;
import com.seegene.main.domain.board.dto.QnaResponse;
import com.seegene.main.domain.board.entity.QTbdQna;
import com.seegene.main.domain.board.entity.QTbdQnaAtch;
import com.seegene.main.domain.board.entity.QTbdQnaPrtlyOpen;
import com.seegene.main.domain.common.entity.QTsyFl;
import com.seegene.main.domain.datacodemanagement.entity.QTcdCdItm;
import com.seegene.main.domain.datacodemanagement.entity.QTcdCdItmMlg;
import com.seegene.main.domain.user.entity.QTusUsr;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.set;

@RequiredArgsConstructor
public class TbdQnaRepositoryCustomImpl implements TbdQnaRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;
    QTbdQna qna = QTbdQna.tbdQna;
    QTbdQnaAtch qnaAttach = QTbdQnaAtch.tbdQnaAtch;
    QTusUsr user = QTusUsr.tusUsr;
    QTcdCdItm tcdCdItm = QTcdCdItm.tcdCdItm;
    QTcdCdItmMlg tcdCdItmMlg = QTcdCdItmMlg.tcdCdItmMlg;
    QTbdQnaPrtlyOpen prtlyOpen = QTbdQnaPrtlyOpen.tbdQnaPrtlyOpen;
    QTsyFl file = QTsyFl.tsyFl;
    @Override
    public QnaResponse findByQnaNum(Long qnaNum) {
        Map<Long, QnaResponse> transform = jpaQueryFactory
                .from(qna)
                .leftJoin(user).on(qna.tusUsr.id.eq(user.id))
                .leftJoin(qna.tbdQnaAtches, qnaAttach).on(qna.id.eq(qnaAttach.tbdQna.id))
                .leftJoin(file).on(qnaAttach.qnaAttach.id.eq(file.id))
                .leftJoin(qna.tbdQnaPrtlyOpens, prtlyOpen).on(qna.id.eq(prtlyOpen.tbdQna.id))
                .where(qna.id.eq(qnaNum))
                .transform(groupBy(qna.id).as(
                                new QQnaResponse(qna.id
                                        , ExpressionUtils.as(JPAExpressions
                                        .select(tcdCdItmMlg.cdNm)
                                        .from(tcdCdItm)
                                        .leftJoin(tcdCdItm.tcdCdItmMlgList, tcdCdItmMlg).on(tcdCdItm.cd.eq(qna.qnaTpCd))
                                        .where(tcdCdItm.cdGrp.id.eq(QnaCdGrpCode.TYPE.getCode()))
                                        .where(tcdCdItmMlg.langCd.eq("en")), "qnaTpCd")
                                        , qna.qnaTpCd.as("type")
                                        , ExpressionUtils.as(JPAExpressions
                                        .select(tcdCdItmMlg.cdNm)
                                        .from(tcdCdItm)
                                        .leftJoin(tcdCdItm.tcdCdItmMlgList, tcdCdItmMlg).on(tcdCdItm.cd.eq(qna.qnaCatCd))
                                        .where(tcdCdItm.cdGrp.id.eq(QnaCdGrpCode.CATEGORY.getCode()))
                                        .where(tcdCdItmMlg.langCd.eq("en")), "qnaCatCd")
                                        , qna.qnaCatCd.as("category")
                                        , ExpressionUtils.as(JPAExpressions
                                        .select(tcdCdItmMlg.cdNm)
                                        .from(tcdCdItm)
                                        .leftJoin(tcdCdItm.tcdCdItmMlgList, tcdCdItmMlg).on(tcdCdItm.cd.eq(qna.mdlTpCd))
                                        .where(tcdCdItm.cdGrp.id.eq(QnaCdGrpCode.MODULE.getCode()))
                                        .where(tcdCdItmMlg.langCd.eq("en")), "mdlTpCd")
                                        , qna.mdlTpCd.as("module")
                                        , ExpressionUtils.as(JPAExpressions
                                        .select(tcdCdItmMlg.cdNm)
                                        .from(tcdCdItm)
                                        .leftJoin(tcdCdItm.tcdCdItmMlgList, tcdCdItmMlg).on(tcdCdItm.cd.eq(qna.openLvlCd))
                                        .where(tcdCdItm.cdGrp.id.eq(QnaCdGrpCode.OPENLEVEL.getCode()))
                                        .where(tcdCdItmMlg.langCd.eq("en")), "openLevel")
                                        , qna.openLvlCd
                                        ,  set(new QPrtnUserResponse(prtlyOpen.id,
                                                                prtlyOpen.tusUsr.id
                                ).skipNulls())
                                        , qna.inqrTitl
                                        , qna.inqrCont
                                        , qna.tusUsr.id
                                        , user.usrNm
                                        , ExpressionUtils.as(JPAExpressions
                                        .select(tcdCdItmMlg.cdNm)
                                        .from(tcdCdItm)
                                        .leftJoin(tcdCdItm.tcdCdItmMlgList, tcdCdItmMlg).on(tcdCdItm.cd.eq(qna.qnaStsCd))
                                        .where(tcdCdItm.cdGrp.id.eq(QnaCdGrpCode.STATUS.getCode()))
                                        .where(tcdCdItmMlg.langCd.eq("en")), "qnaStsCd")
                                        , qna.qnaStsCd.as("status")
                                        , qna.crtDt
                                        , qna.mdfDt,
                                        set(
                                                new QQnaAttachResponse(
                                                        file.id,
                                                        file.flNm,
                                                        file.dspFlNm,
                                                        file.flPath,
                                                        file.flExtn,
                                                        file.flSz,
                                                        file.stogTpCd,
                                                        file.tblNm
                                                ).skipNulls()
                                        )
                                )
                        )
                );
        return transform.get(qnaNum);
    }
}
