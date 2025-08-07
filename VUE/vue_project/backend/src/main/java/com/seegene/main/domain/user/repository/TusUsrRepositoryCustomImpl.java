package com.seegene.main.domain.user.repository;

import static com.seegene.main.domain.user.entity.QTusDmntUsr.*;
import static com.seegene.main.domain.user.entity.QTusUsr.*;

import java.util.List;
import java.util.Optional;

import com.seegene.main.domain.user.constant.UserStatusCode;
import org.springframework.util.StringUtils;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seegene.main.domain.board.dto.QQnaSearchResponse;
import com.seegene.main.domain.board.dto.QnaSearchResponse;
import com.seegene.main.domain.common.dto.QFileInfoResponse;
import com.seegene.main.domain.common.entity.QTcdCntryGrpTg;
import com.seegene.main.domain.common.entity.QTsyFl;
import com.seegene.main.domain.corporate.entity.QTusCorp;
import com.seegene.main.domain.datacodemanagement.entity.QTcdCdItm;
import com.seegene.main.domain.datacodemanagement.entity.QTcdCdItmMlg;
import com.seegene.main.domain.join.dto.JoinInviteResponse;
import com.seegene.main.domain.join.entity.QTusTerm;
import com.seegene.main.domain.join.entity.QTusTermsAgr;
import com.seegene.main.domain.join.entity.QTusTermsCat;
import com.seegene.main.domain.join.entity.QTusTermsCondit;
import com.seegene.main.domain.join.entity.QTusTermsVer;
import com.seegene.main.domain.login.dto.LoginApprovalResponse;
import com.seegene.main.domain.login.dto.LoginValidResponse;
import com.seegene.main.domain.login.dto.WakeupAccountResponse;
import com.seegene.main.domain.user.entity.QTusLoginLog;
import com.seegene.main.domain.user.entity.QTusUsr;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * TusUsrRepositoryCustomImpl
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-24        khhong        최초작성
 * </PRE>
 */
@Slf4j
@RequiredArgsConstructor
public class TusUsrRepositoryCustomImpl implements TusUsrRepositoryCustom{

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public Optional<LoginApprovalResponse> findByTusUsrSts(String emailId) {
		QTusUsr qTusUsr = tusUsr;
		LoginApprovalResponse loginApprovalResponse = jpaQueryFactory.select(
			Projections.constructor(LoginApprovalResponse.class, qTusUsr))
			.from(qTusUsr)
			.where(qTusUsr.emlId.eq(emailId)).fetchOne();
		return Optional.of(loginApprovalResponse);
	}

	@Override
	public Optional<WakeupAccountResponse> findByDormantUser(String emailId) {

		QTusLoginLog qTusLoginLog = QTusLoginLog.tusLoginLog;

		WakeupAccountResponse dmt = jpaQueryFactory.select(Projections.constructor(WakeupAccountResponse.class, tusUsr.id, tusUsr.emlId, qTusLoginLog.loginDt, tusDmntUsr.crtDt))
			.from(tusUsr)
			.join(qTusLoginLog)
			.on(qTusLoginLog.tusUsr.id.eq(tusUsr.id))
			.join(tusDmntUsr).on(tusDmntUsr.usrUid.id.eq(tusUsr.id))
			.where(tusUsr.emlId.eq(emailId).and(tusUsr.usrStsCd.eq("DMT")))
			.orderBy(qTusLoginLog.loginDt.desc()).orderBy(tusDmntUsr.wkupDt.desc()).limit(1).fetchOne();
		log.info("findByDormantUser=== > "+ dmt);
		if (dmt == null) {
			return Optional.empty();
		}
		return Optional.of(dmt);
	}

	@Override
	public Optional<List<JoinInviteResponse>> findByJoinInvite(String cntryCode, String langCode) {
		var qTusTerms = QTusTerm.tusTerm;
		var qTusTermsCat = QTusTermsCat.tusTermsCat;
		var qTusTermsCondit = QTusTermsCondit.tusTermsCondit;
		var qTcdCdItmMlg = QTcdCdItmMlg.tcdCdItmMlg;
		var qTcdCdItm = QTcdCdItm.tcdCdItm;
		var qTusTermsVer = QTusTermsVer.tusTermsVer;
		var tusTermsVer = QTusTermsVer.tusTermsVer;
		var qTcdCntryGrpTg = QTcdCntryGrpTg.tcdCntryGrpTg;

		List<JoinInviteResponse> result = jpaQueryFactory.select(Projections.constructor(JoinInviteResponse.class, qTusTermsCat.id, qTusTermsCondit.tusTermsVer.id, qTusTerms.tcdCntryGrp.cntryGrpId, tusTermsVer.ver, qTcdCdItmMlg.cdNm, qTusTermsCondit.cont, qTusTermsCat.essYn, qTusTermsCondit.langCd, qTusTermsVer.crtDt))
			.from(qTusTermsCat)
			.join(qTusTerms)
			.on(qTusTerms.tusTermsCat.id.eq(qTusTermsCat.id))
			.join(qTcdCdItm)
			.on(qTcdCdItm.cdGrp.id.eq("PFM047").and(qTcdCdItm.cd.eq(qTusTermsCat.id)))
			.join(qTcdCdItmMlg)
			.on(qTcdCdItmMlg.cdItm.eq(qTcdCdItm).and(qTcdCdItmMlg.langCd.eq(langCode)))
			.leftJoin(qTusTermsVer)
			.on(qTusTermsVer.tusTerm.eq(qTusTerms)
				.and(qTusTermsVer.ver.eq(JPAExpressions.select(tusTermsVer.ver.max())
					.from(tusTermsVer)
					.where(tusTermsVer.tusTerm.eq(qTusTerms))
					.orderBy(tusTermsVer.tusTerm.id.desc()))))
			.leftJoin(qTusTermsCondit)
			.on(qTusTermsCondit.tusTermsVer.eq(qTusTermsVer).and(qTusTermsCondit.langCd.eq(langCode)))
			.where(qTusTerms.tcdCntryGrp.cntryGrpId.eq(JPAExpressions.select(qTcdCntryGrpTg.cntryGrp.cntryGrpId)
				.from(qTcdCntryGrpTg)
				.where(qTcdCntryGrpTg.cntryCd.id.eq(cntryCode)))).fetch();

		if (result == null) {
			return Optional.empty();
		}
		return Optional.of(result);
	}

	@Override
	public Optional<List<JoinInviteResponse>> findByJoinInviteUser(String userUid, String langCode) {
		var qTermsAgr = QTusTermsAgr.tusTermsAgr;
		var qTusTerms = QTusTerm.tusTerm;

		var qTusTermsCat = QTusTermsCat.tusTermsCat;
		var qTusTermsCondit = QTusTermsCondit.tusTermsCondit;
		var qTcdCdItmMlg = QTcdCdItmMlg.tcdCdItmMlg;
		var qTcdCdItm = QTcdCdItm.tcdCdItm;
		var qTusTermsVer = QTusTermsVer.tusTermsVer;
		var tusTermsVer = QTusTermsVer.tusTermsVer;
		var qTcdCntryGrpTg = QTcdCntryGrpTg.tcdCntryGrpTg;

		List<JoinInviteResponse> result = jpaQueryFactory.select(Projections.constructor(JoinInviteResponse.class, qTusTermsCat.id, qTusTermsCondit.tusTermsVer.id, qTusTerms.tcdCntryGrp.cntryGrpId, qTusTermsVer.ver, qTcdCdItmMlg.cdNm, qTusTermsCondit.cont,  qTermsAgr.agrYn, qTusTermsCat.essYn, qTusTermsCondit.langCd, qTusTermsVer.aplDt))
			.from(qTusTermsCat)
			.join(qTusTerms)
			.on(qTusTerms.tusTermsCat.id.eq(qTusTermsCat.id))
			.join(qTcdCdItm)
			.on(qTcdCdItm.cdGrp.id.eq("PFM047").and(qTcdCdItm.cd.eq(qTusTermsCat.id)))
			.join(qTcdCdItmMlg)
			.on(qTcdCdItmMlg.cdItm.eq(qTcdCdItm).and(qTcdCdItmMlg.langCd.eq(langCode)))
			.leftJoin(qTusTermsVer)
			.on(qTusTermsVer.tusTerm.eq(qTusTerms)
				.and(qTusTermsVer.ver.eq(JPAExpressions.select(tusTermsVer.ver.max()).from(tusTermsVer).where(tusTermsVer.tusTerm.eq(qTusTerms)).orderBy(tusTermsVer.tusTerm.id.desc()))))
			.leftJoin(qTusTermsCondit)
			.on(qTusTermsCondit.tusTermsVer.eq(qTusTermsVer).and(qTusTermsCondit.langCd.eq(langCode)))
			.leftJoin(qTermsAgr)
			.on(qTermsAgr.tusUsr.id.eq(userUid).and(qTermsAgr.tusTermsVer.eq(qTusTermsVer)))
			.where(qTermsAgr.agrYn.eq("N").and(qTusTerms.tcdCntryGrp.cntryGrpId.in(JPAExpressions.select(qTcdCntryGrpTg.cntryGrp.cntryGrpId)
				.from(tusUsr)
				.join(qTcdCntryGrpTg)
				.on(qTcdCntryGrpTg.cntryCd.id.eq(tusUsr.cntryCd))))).fetch();

		if (result == null) {
			return Optional.empty();
		}
		return Optional.of(result);
	}

	@Override
	public Optional<List<QnaSearchResponse>> findBySearchList(Long corpNm, String keyword) {
		QTsyFl image = new QTsyFl("image");
		QTusUsr user = tusUsr;
		QTusCorp corp = QTusCorp.tusCorp;
		BooleanBuilder booleanBuilder = new BooleanBuilder();

		if(StringUtils.hasText(keyword)){
			booleanBuilder.and(user.orgnNm.contains(keyword));
		}
		if(StringUtils.hasText(keyword)){
			booleanBuilder.or(user.usrNm.contains(keyword));
		}

		Optional<List<QnaSearchResponse>> searchList = Optional.ofNullable(jpaQueryFactory.select(
						new QQnaSearchResponse(
								new QFileInfoResponse(
										image.id,
										image.flNm,
										image.dspFlNm,
										image.flPath,
										image.flExtn,
										image.flSz,
										image.stogTpCd,
										image.tblNm
								),
								user.id,
								user.usrNm,
								corp.id,
								user.orgnNm
						)
				).from(user)
				.join(corp).on(corp.id.eq(user.tusCorp.id))
				.leftJoin(user.tsyFl, image)
				.where(user.tusCorp.id.eq(corp.id))
				.where(user.usrStsCd.eq(UserStatusCode.NRM.name()))
				.where(corp.id.eq(corpNm))
				.where(booleanBuilder)
				.orderBy(user.usrNm.desc())
				.fetch());

		return searchList;
	}

	@Override
	public Optional<List<QnaSearchResponse>> findBySearchList(String corpLvlCd, String keyword) {
		QTusUsr user = tusUsr;
		QTsyFl image = new QTsyFl("image");
		QTusCorp corp = QTusCorp.tusCorp;

		BooleanBuilder booleanBuilder = new BooleanBuilder();

		if(StringUtils.hasText(keyword)){
			booleanBuilder.and(user.orgnNm.contains(keyword));
		}
		if(StringUtils.hasText(keyword)){
			booleanBuilder.or(user.usrNm.contains(keyword));
		}

		Optional<List<QnaSearchResponse>> searchList = Optional.ofNullable(jpaQueryFactory.select(
						new QQnaSearchResponse(
								new QFileInfoResponse(
										image.id,
										image.flNm,
										image.dspFlNm,
										image.flPath,
										image.flExtn,
										image.flSz,
										image.stogTpCd,
										image.tblNm
								),
								user.id,
								user.usrNm,
								corp.id,
								user.orgnNm
						)
				).from(user)
				.join(corp).on(corp.id.eq(user.tusCorp.id))
				.leftJoin(user.tsyFl, image)
				.where(user.usrStsCd.eq(UserStatusCode.NRM.name()))
				.where(user.tusCorp.id.eq(corp.id))
				.where(corp.corpLvlCd.eq(corpLvlCd))
				.where(booleanBuilder)
				.orderBy(user.usrNm.desc())
				.fetch());

		return searchList;
	}

	@Override
	public Optional<LoginValidResponse> findByTusValidInfo(String usrUid) {
		var qTusCorp = QTusCorp.tusCorp;
		var loginValidResponse = jpaQueryFactory.select(
			Projections.constructor(LoginValidResponse.class, tusUsr.emlId, tusUsr.id, tusUsr.tusCorp.id,
				tusUsr.tusCorp.corpNm, tusUsr.tusCorp.corpLvlCd, tusUsr.usrNm, tusUsr.orgnNm, tusUsr.jobTitl,
				tusUsr.tsyFl.id, tusUsr.joinTpCd, tusUsr.cntryCd, tusUsr.langCd,
				tusUsr.usrStsCd, qTusCorp.corpLvlCd, qTusCorp.rolLvlCd, qTusCorp.corpStsCd,
				tusUsr.otpAuthYn, tusUsr.emlAuthYn, tusUsr.adSynYn, tusUsr.crtrUid,
				tusUsr.crtDt, tusUsr.mdfrUid, tusUsr.mdfDt))
			.from(tusUsr).join(qTusCorp).on(tusUsr.tusCorp.id.eq(qTusCorp.id))
			.where(tusUsr.id.eq(usrUid)).fetchOne();
		if (loginValidResponse == null) {
			return Optional.empty();
		}
		return Optional.of(loginValidResponse);
	}

}
