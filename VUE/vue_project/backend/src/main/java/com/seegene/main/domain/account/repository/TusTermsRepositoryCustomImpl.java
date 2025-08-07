package com.seegene.main.domain.account.repository;


import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seegene.main.domain.account.dto.*;
import com.seegene.main.global.function.ExceptionInterface;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import static com.seegene.main.domain.common.entity.QTcdCntryGrp.tcdCntryGrp;
import static com.seegene.main.domain.common.entity.QTcdLang.tcdLang;
import static com.seegene.main.domain.datacodemanagement.entity.QTcdCdItm.tcdCdItm;
import static com.seegene.main.domain.datacodemanagement.entity.QTcdCdItmMlg.tcdCdItmMlg;
import static com.seegene.main.domain.account.entity.QAccountTusTerms.accountTusTerms;
import static com.seegene.main.domain.account.entity.QAccountTusTermsVer.accountTusTermsVer;
import static com.seegene.main.domain.account.entity.QAccountTusTermsCondit.accountTusTermsCondit;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;

@RequiredArgsConstructor
public class TusTermsRepositoryCustomImpl implements TusTermsRepositoryCustom, ExceptionInterface {
    private final JPAQueryFactory jpaQueryFactory;

    public List<AccountTermsListResponse> getTermsList(List<String> cntryCdList, String langCd) {
        return jpaQueryFactory.select(
                    new QAccountTermsListResponse(
                            tcdCdItmMlg.cdNm.coalesce(tcdCdItm.dftcdNm),
                            accountTusTerms.termsCatCd
                    )
                ).from(accountTusTerms)
                .leftJoin(tcdCdItm).on(tcdCdItm.cd.eq(accountTusTerms.termsCatCd))
                .leftJoin(tcdCdItm.tcdCdItmMlgList, tcdCdItmMlg).on(tcdCdItmMlg.langCd.eq(langCd))
                .where(accountTusTerms.cntryGrpId.in(cntryCdList))
                .fetch();
    }

    public Optional<TermsResponse> getTermsDetail(String categoryCd, String countryGroupId, String ver, String langCd, String userLangCd) {
        TermsResponse result = jpaQueryFactory.select(
                        new QTermsResponse(
                                accountTusTerms.id,
                                tcdCdItmMlg.cdNm.coalesce(tcdCdItm.dftcdNm),
                                accountTusTerms.cntryGrpId,
                                new QTermsVerResponse(
                                        accountTusTermsVer.id,
                                        accountTusTermsVer.ver,
                                        accountTusTermsVer.aplDt,
                                        new QTermsConditionsResponse(
                                                accountTusTermsCondit.id,
                                                accountTusTermsCondit.langCd,
                                                accountTusTermsCondit.cont,
                                                accountTusTermsCondit.crtrUid,
                                                accountTusTermsCondit.crtDt,
                                                accountTusTermsCondit.mdfrUid,
                                                accountTusTermsCondit.mdfDt
                                        )
                                )
                        )
                ).from(accountTusTerms)
                .leftJoin(accountTusTerms.accountTusTermsVerList, accountTusTermsVer)
                .leftJoin(accountTusTermsVer.accountTusTermsConditList, accountTusTermsCondit)
                .leftJoin(tcdCdItm).on(tcdCdItm.cd.eq(accountTusTerms.termsCatCd))
                .leftJoin(tcdCdItm.tcdCdItmMlgList, tcdCdItmMlg).on(tcdCdItmMlg.langCd.eq(userLangCd))
                .where(accountTusTerms.termsCatCd.eq(categoryCd))
                .where(groupCodeNull(countryGroupId))
                .where(versionNull(ver))
                .where(langCdNull(langCd))
                .orderBy(accountTusTermsCondit.crtDt.desc())
                .limit(1)
                .fetchOne();
        return Optional.ofNullable(result);
    }

    @Override
    public List<TermsFilterResponse> getTermsFilter(String categoryCd, String countryGroupId, String ver) {
        return jpaQueryFactory
                .from(accountTusTerms)
                .leftJoin(accountTusTerms.accountTusTermsVerList, accountTusTermsVer)
                .leftJoin(accountTusTermsVer.accountTusTermsConditList, accountTusTermsCondit)
                .leftJoin(tcdLang).on(accountTusTermsCondit.langCd.eq(tcdLang.langCd))
                .where(accountTusTerms.termsCatCd.eq(categoryCd))
                .where(accountTusTerms.cntryGrpId.eq(countryGroupId))
                .where(versionNull(ver))
                .transform(
                        groupBy(accountTusTermsVer.ver).list(
                                new QTermsFilterResponse (
                                        accountTusTerms.id,
                                        accountTusTermsVer.ver,
                                        list(
                                            new QTermsFilterLangResponse(
                                                    accountTusTermsCondit.langCd,
                                                    tcdLang.ntvNm
                                            ).skipNulls()
                                        )
                                )
                        )
                );
    }

    @Override
    public List<TermsCountryGroupListResponse> getTermsCountryGroupList(String categoryCd) {
        return jpaQueryFactory.select(
                        new QTermsCountryGroupListResponse(
                                tcdCntryGrp.cntryGrpNm,
                                accountTusTerms.cntryGrpId
                        )
                ).from(accountTusTerms)
                .leftJoin(tcdCntryGrp).on(tcdCntryGrp.cntryGrpId.eq(accountTusTerms.cntryGrpId))
                .where(accountTusTerms.termsCatCd.eq(categoryCd))
                .fetch();
    }

    private BooleanExpression versionNull(String ver) {
        return (ver == null || ver.isEmpty()) ? null : accountTusTermsVer.ver.eq(ver);
    }

    private BooleanExpression groupCodeNull(String cntryGrpId) {
        return (cntryGrpId == null || cntryGrpId.isEmpty()) ? null : accountTusTerms.cntryGrpId.eq(cntryGrpId);
    }

    private BooleanExpression langCdNull(String langCd) {
        return (langCd == null || langCd.isEmpty()) ? null : accountTusTermsCondit.langCd.eq(langCd);
    }

    public Optional<TermsResponse> getTermsLoginDetail(String categoryCd, String countryGroupId, String ver, String langCd) {
        TermsResponse result = jpaQueryFactory.select(
                        new QTermsResponse(
                                accountTusTerms.id,
                                tcdCdItmMlg.cdNm.coalesce(tcdCdItm.dftcdNm),
                                accountTusTerms.cntryGrpId,
                                new QTermsVerResponse(
                                        accountTusTermsVer.id,
                                        accountTusTermsVer.ver,
                                        accountTusTermsVer.aplDt,
                                        new QTermsConditionsResponse(
                                                accountTusTermsCondit.id,
                                                accountTusTermsCondit.langCd,
                                                accountTusTermsCondit.cont,
                                                accountTusTermsCondit.crtrUid,
                                                accountTusTermsCondit.crtDt,
                                                accountTusTermsCondit.mdfrUid,
                                                accountTusTermsCondit.mdfDt
                                        )
                                )
                        )
                ).from(accountTusTerms)
                .leftJoin(accountTusTerms.accountTusTermsVerList, accountTusTermsVer)
                .leftJoin(accountTusTermsVer.accountTusTermsConditList, accountTusTermsCondit)
                .leftJoin(tcdCdItm).on(tcdCdItm.cd.eq(accountTusTerms.termsCatCd))
                .leftJoin(tcdCdItm.tcdCdItmMlgList, tcdCdItmMlg).on(tcdCdItmMlg.langCd.eq("en"))
                .where(accountTusTerms.termsCatCd.eq(categoryCd))
                .where(groupCodeNull(countryGroupId))
                .where(versionNull(ver))
                .where(accountTusTermsCondit.langCd.eq(
                            new CaseBuilder()
                                    .when(
                                            JPAExpressions.selectOne()
                                                    .from(accountTusTerms)
                                                    .leftJoin(accountTusTerms.accountTusTermsVerList, accountTusTermsVer)
                                                    .leftJoin(accountTusTermsVer.accountTusTermsConditList, accountTusTermsCondit)
                                                    .where(accountTusTermsCondit.langCd.eq(langCd))
                                                    .exists()
                                    ).then(langCd)
                                    .otherwise("en")
                        )
                )
                .orderBy(accountTusTermsVer.ver.desc())
                .limit(1)
                .fetchOne();
        return Optional.ofNullable(result);
    }
}
