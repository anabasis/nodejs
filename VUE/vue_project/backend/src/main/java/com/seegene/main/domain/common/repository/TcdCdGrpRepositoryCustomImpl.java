package com.seegene.main.domain.common.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seegene.main.domain.common.dto.DslCommonCodeItemMapResponse;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.seegene.main.domain.common.entity.QTcdCdMap.tcdCdMap;
import static com.seegene.main.domain.datacodemanagement.entity.QTcdCdItm.tcdCdItm;
import static com.seegene.main.domain.datacodemanagement.entity.QTcdCdItmMlg.tcdCdItmMlg;


@RequiredArgsConstructor
public class TcdCdGrpRepositoryCustomImpl implements TcdCdGrpRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<DslCommonCodeItemMapResponse> dslFindBySourceCodeItemNumAndLangCdOrderBySortNum(Long sourceCodeItemNum, String langCd) {
        return jpaQueryFactory.select(Projections.constructor(DslCommonCodeItemMapResponse.class,
               tcdCdItm.id,
                tcdCdItmMlg.cdNm,
                tcdCdItm.sortNum
                        )).from(tcdCdMap)
                .join(tcdCdItm).on(tcdCdMap.tgCdItmNum.eq(tcdCdItm.id))
                .join(tcdCdItmMlg).on(tcdCdItmMlg.cdItm.id.eq(tcdCdItm.id))
                .where(tcdCdMap.srcCdItmNum.eq(sourceCodeItemNum).and(tcdCdItmMlg.langCd.eq(langCd)))
                .orderBy(tcdCdItm.sortNum.asc())
                .fetch();

    }
}