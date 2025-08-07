package com.seegene.main.domain.project.repository;


import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seegene.main.domain.corporate.constant.CorporateLvlCd;
import com.seegene.main.domain.dashboard.dto.CountryStatusResponse;
import com.seegene.main.domain.dashboard.dto.QCountryStatusResponse;
import com.seegene.main.domain.project.constant.ProjectDevelopmentPurposeCode;
import com.seegene.main.domain.project.constant.ProjectStatusCode;
import com.seegene.main.domain.project.dto.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.seegene.main.domain.datacodemanagement.entity.QTcdCdItm.tcdCdItm;
import static com.seegene.main.domain.project.entity.QTpjPrj.tpjPrj;
import static com.seegene.main.domain.project.entity.QTpjPrjTgMakt.tpjPrjTgMakt;
import static com.seegene.main.domain.datacodemanagement.entity.QTcdCntry.tcdCntry;
import static com.seegene.main.domain.corporate.entity.QTusCorp.tusCorp;


@RequiredArgsConstructor
public class TpjPrjRepositoryCustomImpl implements TpjPrjRepositoryCustom {

	private final JPAQueryFactory jpaQueryFactory;

//	private final QTcdCdItmMlg tcdCdItmMlgPj001 = new QTcdCdItmMlg("tcdCdItmMlgPj001");
//	private final QTcdCdItmMlg tcdCdItmMlgPj006 = new QTcdCdItmMlg("tcdCdItmMlgPj006");
//
//	private final QTcdCntry cntry1 = new QTcdCntry("cntry1");
//
//	private final QTcdCntry cntry2 = new QTcdCntry("cntry2");
//
//	@Override
//	public Optional<ProjectInfoResponse> dslFindByIdAndLangCd(Long projectId, String langCd) {
//		ProjectInfoResponse response = jpaQueryFactory.select(Projections.constructor(
//			ProjectInfoResponse.class
//				, tpjPrj.id
//				, tpjPrj.dissCatCd
//				, tcdCdItmMlgPj006.cdNm
//			    , tpjPrj.devPupsCd
//				, tcdCdItmMlgPj001.cdNm
//			    , tpjPrj.startDat
//				, tpjPrj.endDat
//				, tpjPrj.prjNm
//				, tpjPrj.prjMemo
//			))
//			.from(tpjPrj)
//			.innerJoin(tcdCdItmMlgPj001).on(tpjPrj.devPupsCd.eq(tcdCdItmMlgPj001.cdItm.cd).and(tcdCdItmMlgPj001.cdItm.cdGrp.id.eq("PJ001")).and(tcdCdItmMlgPj001.langCd.eq(langCd)))
//			.innerJoin(tcdCdItmMlgPj006).on(tpjPrj.dissCatCd.eq(tcdCdItmMlgPj006.cdItm.cd).and(tcdCdItmMlgPj006.cdItm.cdGrp.id.eq("PJ006")).and(tcdCdItmMlgPj006.langCd.eq(langCd)))
//			.where(tpjPrj.id.eq(projectId).and(tpjPrj.delYn.eq("N")))
//			.fetchOne();
//		return Optional.ofNullable(response);
//	}
//
//	@Override
//	public Optional<ProjectAdditionalInfoResponse> dslFindByIdAndLangCdAddInfo(Long projectId, String langCd) {
//		ProjectAdditionalInfoResponse response = jpaQueryFactory
//			.select(Projections.constructor(ProjectAdditionalInfoResponse.class
//				, tpjPrj.prdNm.as("productName")
//				, tpjPrj.taskCd.as("taskCode")
////				, tpjPrj.tgMaktCntryCd.as("targetMarketCode")
//				, new CaseBuilder()
//					.when(Expressions.asString(langCd).eq("ko")).then(cntry2.korCntryNm)
//					.when(Expressions.asString(langCd).eq("en")).then(cntry2.engCntryNm)
//					.otherwise(cntry2.mothrCntryNm).as("targetMarket")
////				, tpjPrj.rgltrAfrCd.as("regulatoryCode")
//				, new CaseBuilder()
//					.when(Expressions.asString(langCd).eq("ko")).then(cntry1.korCntryNm)
//					.when(Expressions.asString(langCd).eq("en")).then(cntry1.engCntryNm)
//					.otherwise(cntry1.mothrCntryNm).as("regulatory")
//			))
//			.from(tpjPrj)
////			.leftJoin(cntry1).on(tpjPrj.rgltrAfrCd.eq(cntry1.cntryCd))
////			.leftJoin(cntry2).on(tpjPrj.tgMaktCntryCd.eq(cntry2.cntryCd))
//			.where(tpjPrj.id.eq(projectId).and(tpjPrj.delYn.eq("N")))
//			.fetchOne();
//
//		return Optional.ofNullable(response);
//	}

    @Override
    public List<CorporateStatusResponse> findCorporateStatus(String projectStatusCode) {
        return jpaQueryFactory.select(
                        new QCorporateStatusResponse(
                                tpjPrj.tusCorp.id,
                                tusCorp.corpNm,
                                tusCorp.id.count()
                        )
                )
                .from(tpjPrj)
                .innerJoin(tpjPrj.tusCorp, tusCorp)
                .where(tpjPrj.delYn.eq("N"))
                .where(tpjPrj.tusCorp.corpLvlCd.ne(CorporateLvlCd.LV1.getCode()))
                .where(tpjPrj.devPupsCd.ne(ProjectDevelopmentPurposeCode.DP03.getCode()))
                .where(prjStsCheck(projectStatusCode))
                .orderBy(tusCorp.id.count().desc())
                .groupBy(tpjPrj.tusCorp.id)
                .fetch();
    }

    @Override
    public List<PurposeStatusResponse> findPurposeStatus(String projectStatusCode) {
        return jpaQueryFactory.select(
                        new QPurposeStatusResponse(
                                tcdCdItm.dftcdNm,
                                tcdCdItm.dftcdNm.count()
                        )
                ).from(tpjPrj)
                .leftJoin(tcdCdItm).on(tcdCdItm.cd.eq(tpjPrj.devPupsCd))
                .where(tpjPrj.delYn.eq("N"))
                .where(tpjPrj.devPupsCd.ne(ProjectDevelopmentPurposeCode.DP03.getCode()))
                .where(prjStsCheck(projectStatusCode))
                .groupBy(tcdCdItm.dftcdNm)
                .fetch();
    }

    @Override
    public List<RegionStatusResponse> findRegionStatus(String projectStatusCode) {
        return jpaQueryFactory.select(
                    new QRegionStatusResponse(
                            tcdCntry.engContintNm,
                            tcdCntry.engContintNm.count()
                    )
                )
                .from(tpjPrj)
                .innerJoin(tpjPrj.tpjPrjTgMaktList, tpjPrjTgMakt)
                .innerJoin(tcdCntry).on(tpjPrjTgMakt.tgMaktCntryCd.eq(tcdCntry.id))
                .where(tpjPrj.delYn.eq("N"))
                .where(tpjPrj.devPupsCd.ne(ProjectDevelopmentPurposeCode.DP03.getCode()))
                .where(prjStsCheck(projectStatusCode))
                .groupBy(tcdCntry.engContintNm)
                .fetch();
    }

    @Override
    public List<CountryStatusResponse> findByCountryStatus(String projectStsCd) {
        return jpaQueryFactory.select(
                new QCountryStatusResponse(
                        tcdCntry.mothrCntryNm,
                        tcdCntry.mothrCntryNm.count()
                )
            ).from(tpjPrj)
                .innerJoin(tpjPrj.tpjPrjTgMaktList, tpjPrjTgMakt)
                .innerJoin(tcdCntry).on(tpjPrjTgMakt.tgMaktCntryCd.eq(tcdCntry.id))
                .where(tpjPrj.delYn.eq("N"))
                .where(tpjPrj.devPupsCd.ne(ProjectDevelopmentPurposeCode.DP03.getCode()))
                .where(prjStsCheck(projectStsCd))
                .groupBy(tcdCntry.mothrCntryNm)
                .fetch();
    }

    private BooleanExpression prjStsCheck(String projectStatusCode) {
        return projectStatusCode.equals("ACC") ? null : tpjPrj.prjStsCd.eq(ProjectStatusCode.ONGOING.getCode());
    }
}
