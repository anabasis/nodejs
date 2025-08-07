package com.seegene.main.domain.join.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.seegene.main.domain.authority.entity.TrlUsrRol;
import com.seegene.main.domain.authority.entity.TrlUsrRolApl;
import com.seegene.main.domain.corporate.entity.TusCorp;
import com.seegene.main.domain.corporate.repository.TusCorpRepository;
import com.seegene.main.domain.join.dto.JoinInviteRequest;
import com.seegene.main.domain.join.dto.JoinInviteResponse;
import com.seegene.main.domain.join.dto.JoinRegPasswordRequest;
import com.seegene.main.domain.join.dto.JoinSignupRequest;
import com.seegene.main.domain.join.dto.TusTermsAgrResponse;
import com.seegene.main.domain.join.entity.TusTermsAgr;
import com.seegene.main.domain.join.entity.TusTermsVer;
import com.seegene.main.domain.join.repository.TusTermsAgrRepository;
import com.seegene.main.domain.join.repository.TusTermsConditRepository;
import com.seegene.main.domain.join.repository.TusTermsVerRepository;
import com.seegene.main.domain.join.repository.mapper.JoinMapper;
import com.seegene.main.domain.user.constant.UserStatusCode;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.domain.user.repository.TrlUsrRolAplRepository;
import com.seegene.main.domain.user.repository.TrlUsrRolRepository;
import com.seegene.main.domain.user.repository.TusUsrRepository;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.exception.EntityNotFoundException;
import com.seegene.main.global.function.ExceptionInterface;
import com.seegene.main.global.util.Sha256EncryUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-03        khhong        최초작성
 * </PRE>
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class JoinService implements ExceptionInterface {

	private final TusUsrRepository tusUsrRepository;
	private final TusCorpRepository tusCorpRepository;
	private final TusTermsConditRepository tusTermsConditRepository;
	private final TusTermsAgrRepository tusTermsAgrRepository;
	private final TrlUsrRolRepository trlUsrRolRepository;
	private final TusTermsVerRepository tusTermsVerRepository;
	private final TrlUsrRolAplRepository trlUsrRolAplRepository;
	private final JoinMapper joinMapper;

	public List<TusTermsAgrResponse> getJoinConfirmEmail(String emailId) {
		log.info(String.format("[getConfirmEmail] emailId: %s", emailId));
		TusUsr tusUsr = tusUsrRepository.findByEmlId(emailId).orElseThrow(() -> new EntityNotFoundException());
		var tusTermsAgrs = tusTermsAgrRepository.findByTusUsr(tusUsr).orElseThrow(null);
		if (tusTermsAgrs.isEmpty()) {
			businessException.accept(ErrorCode.TERMS_DATA_NOT_EXIST);
		}
		return TusTermsAgrResponse.fromEntity(tusTermsAgrs);
	}

	public List<JoinInviteResponse> getAgreementHqList(PlatformUserInfo platformUserInfo, String langCode) {
		log.info(String.format("[getAgreementHqList] ========"));
		// log.info(String.format("[getAgreementHqList] ======== usrUid:%s, langCode:%s ", platformUserInfo.getUsrUid(), platformUserInfo.getLangCode()));
		// TusUsr tusUsr = tusUsrRepository.findById(platformUserInfo.getUsrUid()).orElseThrow(null);
		// String userCorpInfo = tusUsr.getEmlId().substring(tusUsr.getEmlId().indexOf("@"));
		// TusCorp tusCorp = tusCorpRepository.findTusCorpByDomnNm(userCorpInfo).orElse(null);
		// if (tusCorp == null) {
		// 	businessException.accept(ErrorCode.VALIDATE_DOMAIN_ERROR);
		// }
		return List.of(JoinInviteResponse.builder().build());
	}

	public List<JoinInviteResponse> getAgreementList(String emailId, String langCode) {
		String userCorpInfo = emailId.substring(emailId.indexOf("@"));
		TusCorp tusCorp = tusCorpRepository.findTusCorpByDomnNm(userCorpInfo).orElse(null);
		if (tusCorp == null) {
			businessException.accept(ErrorCode.VALIDATE_DOMAIN_ERROR);
		}
		log.info(String.format("[getAgreementNewCoList] ======== emailId: %s, cntryCode: %s", emailId, tusCorp.getCntryCd()));

		return getJoinInviteResponses(langCode, tusCorp);
	}

	private List<JoinInviteResponse> getJoinInviteResponses(String langCode, TusCorp tusCorp) {
		var joinAgreementVos = joinMapper.findByJoinInvite(Map.of("cntryCode", tusCorp.getCntryCd(), "langCodeA", langCode, "langCodeB", langCode));
		if (joinAgreementVos.size() == 0) {
			joinAgreementVos = joinMapper.findByJoinInvite(Map.of("cntryCode", tusCorp.getCntryCd(), "langCodeA", "en", "langCodeB", "en"));
		}
		return joinAgreementVos.stream().map(JoinInviteResponse::fromVo).collect(Collectors.toList());
	}

	public void createAgreement(List<JoinInviteRequest> joinInviteRequestList) {

		joinInviteRequestList.stream().forEach(joinInviteRequest -> {
			log.info(String.format("[createAgreement] emailId: %s, termsCatCode: %s", joinInviteRequest.getEmailId(), joinInviteRequest.getTermsVerNum()));
			JoinInviteRequest joinInviteValue = JoinInviteRequest.builder()
				.emailId(joinInviteRequest.getEmailId())
				.termsVerNum(joinInviteRequest.getTermsVerNum())
				.agrYn(joinInviteRequest.getAgrYn()).build();
			saveTusTermsAgr(joinInviteValue);
		});
	}

	private void saveTusTermsAgr(JoinInviteRequest joinInviteValue) {
		TusUsr findUsr = tusUsrRepository.findByEmlId(joinInviteValue.getEmailId()).orElseThrow(() -> new EntityNotFoundException());
		TusTermsVer tusTermsVer = tusTermsVerRepository.findById(joinInviteValue.getTermsVerNum()).orElseThrow(() -> new EntityNotFoundException());
		TusTermsAgr tusTermsAgr = joinInviteValue.toEntity(findUsr, tusTermsVer, joinInviteValue);
		tusTermsAgrRepository.save(tusTermsAgr);
	}

	public TusTermsAgrResponse getAgreementDetail(String termsVerNum, String langCd) {
		log.info(String.format("[getAgreementDetail] termsVerNum: %s, langCd: %s", termsVerNum, langCd));
		return tusTermsConditRepository.findByUserTermsCatCode(termsVerNum, langCd).orElse(TusTermsAgrResponse.builder().build());
	}

	public void getValidUserEmail(String emailId) {
		log.info(String.format("[createManualMemberEmail] emailId: %s", emailId));
		if (!emailId.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
			businessException.accept(ErrorCode.VALIDATE_EMAIL_REGEX);
		}
		String userCorpInfo = emailId.substring(emailId.indexOf("@"));
		TusCorp tusCorp = tusCorpRepository.findTusCorpByDomnNm(userCorpInfo).orElse(null);
		if (tusCorp == null) {
			businessException.accept(ErrorCode.VALIDATE_DOMAIN_ERROR);
		}

		TusUsr tusUsr = tusUsrRepository.findByEmlId(emailId).orElse(null);
		if (tusUsr != null) {
			businessException.accept(ErrorCode.USER_EXISTS_IN_PLATFORM);
		}
	}

	public void createUserPwdSetting(JoinRegPasswordRequest joinRegPasswordRequest) {
		log.info(String.format("[createUserPwdSetting] emailId: %s", joinRegPasswordRequest.getEmailId()));
		// TusUsr tusUsr = tusUsrRepository.findByEmlId(joinRegPasswordRequest.getEmailId()).orElseThrow(() -> new EntityNotFoundException());
		// tusUsrRepository.save(tusUsr);
		// tusPwdChgRepository.save(TusPwdChg.builder().pwdChgDt(LocalDateTime.now()).tusUsr(tusUsr).build());
	}

	public void createUserSignUp(JoinSignupRequest joinSignupRequest) {
		log.info(String.format("[createUserSignUp] emailId: %s", joinSignupRequest.getEmailId()));
		String userCorpInfo = joinSignupRequest.getEmailId().substring(joinSignupRequest.getEmailId().indexOf("@"));

		TusUsr checkUser = tusUsrRepository.findByEmlId(joinSignupRequest.getEmailId()).orElse(null);
		if (checkUser != null) {
			businessException.accept(ErrorCode.USER_EXISTS_IN_PLATFORM);
		}

		TusCorp tusCorp = tusCorpRepository.findTusCorpByDomnNm(userCorpInfo).orElse(null);
		if (!tusCorp.getCorpStsCd().equals("ACT")) {
			businessException.accept(ErrorCode.CORP_NOT_ACTIVE_ERROR);
		}
		if (tusCorp==null) {
			businessException.accept(ErrorCode.VALIDATE_DOMAIN_ERROR);
		}
		TusUsr tusUsr = TusUsr.builder()
			.id(UUID.randomUUID().toString().replaceAll("-", "").toUpperCase())
			.emlId(joinSignupRequest.getEmailId())
			.tusCorp(tusCorp)
			.usrNm(joinSignupRequest.getUserName())
			.loginPwd(Sha256EncryUtil.ShaEncoder(joinSignupRequest.getPassword()))
			.orgnNm(joinSignupRequest.getOrganization())
			.jobTitl(joinSignupRequest.getJobTitle())
			.lstAlmInqrDt(LocalDateTime.now())
			.joinTpCd(joinSignupRequest.getJoinTypeCode())
			.usrStsCd(UserStatusCode.getUserStatusCode(UserStatusCode.APW))
			.cntryCd("US").langCd("en").adSynYn("N").otpAuthYn("N").emlAuthYn("N")
			.build();

		TusUsr savedUser = tusUsrRepository.save(tusUsr);
		TrlUsrRol trlUsrRol = trlUsrRolRepository.findById(11004L).orElse(TrlUsrRol.builder().build());
		TrlUsrRolApl trlUsrRolApl = TrlUsrRolApl.builder().tusUsr(savedUser).trlUsrRol(trlUsrRol).build();

		trlUsrRolAplRepository.save(trlUsrRolApl);
	}
}
