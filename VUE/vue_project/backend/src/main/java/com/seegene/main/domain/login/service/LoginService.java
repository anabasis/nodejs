package com.seegene.main.domain.login.service;

import static com.seegene.main.domain.corporate.constant.CorporateStsCode.*;
import static com.seegene.main.domain.login.constant.VerifycationMethodCode.*;
import static com.seegene.main.domain.user.constant.UserStatusCode.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import com.seegene.main.domain.corporate.entity.TusCorp;
import com.seegene.main.domain.corporate.repository.TusCorpRepository;
import com.seegene.main.domain.login.constant.IdtfVerfCatCode;
import com.seegene.main.domain.login.constant.UserValidCorpCode;
import com.seegene.main.domain.login.constant.VerifycationMethodCode;
import com.seegene.main.domain.login.dto.LoginApprovalResponse;
import com.seegene.main.domain.login.dto.LoginAuthenticateRequest;
import com.seegene.main.domain.login.dto.LoginFailedResponse;
import com.seegene.main.domain.login.dto.LoginFindAuthenticateRequest;
import com.seegene.main.domain.login.dto.LoginInactiveRequest;
import com.seegene.main.domain.login.dto.LoginInquiryRequest;
import com.seegene.main.domain.login.dto.LoginPasswordSettingRequest;
import com.seegene.main.domain.login.dto.LoginValidResponse;
import com.seegene.main.domain.login.dto.LoginVerifyAuthenticateRequest;
import com.seegene.main.domain.login.dto.WakeupAccountResponse;
import com.seegene.main.domain.login.entity.TusPwdChg;
import com.seegene.main.domain.login.entity.TusPwdReset;
import com.seegene.main.domain.login.repository.TusPwdChgRepository;
import com.seegene.main.domain.login.repository.TusPwdResetRepository;
import com.seegene.main.domain.login.repository.mapper.LoginMapper;
import com.seegene.main.domain.login.vo.LoginFailedVo;
import com.seegene.main.domain.user.entity.TusLoginLog;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.domain.user.repository.TusLoginLogRepository;
import com.seegene.main.domain.user.repository.TusUsrAprvRepository;
import com.seegene.main.domain.user.repository.TusUsrIdtfVerfRepository;
import com.seegene.main.domain.user.repository.TusUsrRepository;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.convert.DefaultDateTimeConverter;
import com.seegene.main.global.convert.DefaultDateTimeFormat;
import com.seegene.main.global.dto.MailSenderDto;
import com.seegene.main.global.exception.EntityNotFoundException;
import com.seegene.main.global.function.ExceptionInterface;
import com.seegene.main.global.util.AES256Util;
import com.seegene.main.global.util.HexRandomGenerator;
import com.seegene.main.global.util.Sha256EncryUtil;
import com.seegene.main.global.util.props.FrontUrlProperties;
import com.seegene.main.global.util.ses.MailUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Login Service
 * <PRE>
 * </PRE>
 * @author   : @mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1                 최초작성
 * </PRE>
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService implements ExceptionInterface {

	private final MailUtils mailUtils;
	private final TusUsrRepository tusUsrRepository;
	private final TusUsrIdtfVerfRepository tusUsrIdtfVerfRepository;
	private final TusLoginLogRepository tusLoginLogRepository;
	private final TusUsrAprvRepository tusUsrAprvRepository;
	private final TusPwdChgRepository tusPwdChgRepository;
	private final TusPwdResetRepository tusPwdResetRepository;
	private final TusCorpRepository tusCorpRepository;
	private final AES256Util aes256Util;
	private final FrontUrlProperties frontUrlProperties;
	private final MessageSource messageSource;
	private final LoginMapper loginMapper;

	public void sendInquiryRequest(Locale locale, LoginInquiryRequest loginInquiryDto) {
		log.info(String.format("[sendInquiryRequest] Response EmailId: %s", loginInquiryDto.getEmailId()));
		Map<String, Object> mailFormat = new HashMap<>();
		mailFormat.put("regDate", DefaultDateTimeConverter.convertDateTime(ZonedDateTime.now(ZoneId.of("UTC")), DefaultDateTimeFormat.DATE_FORMAT));
		mailFormat.put("accountType", loginInquiryDto.getAccountType());
		mailFormat.put("inquiryType", loginInquiryDto.getInquiryType());
		mailFormat.put("inquiryTitle", loginInquiryDto.getInquirySubejct());
		mailFormat.put("inquiryContent", loginInquiryDto.getInquiryContent());
		mailFormat.put("emailId", loginInquiryDto.getEmailId());
		mailFormat.put("title", messageSource.getMessage("inquiryreg", null, locale));

		MailSenderDto senderDto = MailSenderDto.builder()
			.subject(loginInquiryDto.getInquirySubejct())
			.data(mailFormat)
			.to(loginInquiryDto.getEmailId())
			.build();

		mailUtils.sendMessage("inquiry", senderDto);
	}

	public LoginApprovalResponse getLoginApproval(String emailId) {
		log.info(String.format("[getLoginApproval] emailId: %s ", emailId));
		LoginApprovalResponse loginApprovalResponse = tusUsrRepository.findByTusUsrSts(emailId).orElseThrow(() -> new EntityNotFoundException());
		if (loginApprovalResponse.getUserStatusCode().equals("RJT")) {
			businessException.accept(ErrorCode.USER_APPROVAL_DENIEND_ERROR);
		}
		return loginApprovalResponse;
	}

	public void sendfindPwd(LoginFindAuthenticateRequest loginFindAuthenticateRequest) {
		log.info(String.format("[sendfindPwd] emailId: %s", loginFindAuthenticateRequest.getEmailId()));
		LoginAuthenticateRequest loginAuthenticateRequest = LoginAuthenticateRequest.builder()
			.emailId(loginFindAuthenticateRequest.getEmailId())
			.authKey(HexRandomGenerator.generateHexRandom())
			.authType(loginFindAuthenticateRequest.getAuthType())
			.idtfVerfCode(loginFindAuthenticateRequest.getIdtfVerfCode())
			.build();
		var findTusUsr = tusUsrRepository.findByEmlId(loginAuthenticateRequest.getEmailId()).orElseThrow(() -> new EntityNotFoundException());
		var tusUsrIdtfVerf = loginAuthenticateRequest.toEntity(loginAuthenticateRequest, findTusUsr);
		tusUsrIdtfVerfRepository.save(tusUsrIdtfVerf);
		Map<String, Object> sendMap = new HashMap<>();
		sendMap.put("authKey", loginAuthenticateRequest.getAuthKey());
		sendMap.put("userName", findTusUsr.getUsrNm());
		sendMap.put("moveUrl", frontUrlProperties.getFrontUrl());

		MailSenderDto senderDto = MailSenderDto.builder()
			.subject("비밀번호 재설정을 위한 인증코드 안내")
			.data(sendMap)
			.to(loginFindAuthenticateRequest.getEmailId())
			.build();
		mailUtils.sendMessage("findPassword", senderDto);
	}

	public void getVerifyAuthNumber(LoginVerifyAuthenticateRequest loginVerifyAuthenticateRequest) {
		log.info(String.format("[saveAuthNumber] emailId: %s, authKey: %s ", loginVerifyAuthenticateRequest.getEmailId(), loginVerifyAuthenticateRequest.getAuthKey()));
		var result = tusUsrIdtfVerfRepository.findByVerfKey(loginVerifyAuthenticateRequest.getEmailId(), loginVerifyAuthenticateRequest.getIdtfVerfCode(), loginVerifyAuthenticateRequest.getAuthKey()).orElse(null);
		verifyValueCheck(result);
	}

	public void updatePwd(LoginPasswordSettingRequest loginPasswordSettingRequest) {
		log.info(String.format("[updatePwd] emailId: %s, password: %s ", loginPasswordSettingRequest.getEmailId(), loginPasswordSettingRequest.getPassword()));
		var tusUsr = tusUsrRepository.findByEmlId(loginPasswordSettingRequest.getEmailId()).orElseThrow(() -> new EntityNotFoundException());
		tusUsr.setLoginPwd(Sha256EncryUtil.ShaEncoder(loginPasswordSettingRequest.getPassword()));
		tusPwdChgRepository.save(TusPwdChg.builder().tusUsr(tusUsr).pwdChgDt(LocalDateTime.now()).build());
		tusPwdResetRepository.save(TusPwdReset.builder().tusUsr(tusUsr).resetDt(LocalDateTime.now()).build());
		tusUsrRepository.save(tusUsr);
	}

	public WakeupAccountResponse getInactiveAccount(String emailId) {
		log.info(String.format("[getInactiveAccount] emailId: %s", emailId));
		var wakeupAccountResponse = tusUsrRepository.findByDormantUser(emailId).orElseThrow(() -> new EntityNotFoundException());
		return WakeupAccountResponse.builder()
			.usrUid(wakeupAccountResponse.getUsrUid())
			.emailId(wakeupAccountResponse.getEmailId())
			.lastAccessDate(wakeupAccountResponse.getLastAccessDate())
			.wakeupAccountDate(wakeupAccountResponse.getWakeupAccountDate())
			.emailId(emailId).build();
	}

	public void sendEmailAuthApply(String emailId) {
		log.info(String.format("[sendEmailAuthApply] emailId: %s ", emailId));
		// to-be : findByUsrUid
		var findTusUsr = tusUsrRepository.findByEmlId(emailId).orElseThrow(() -> new EntityNotFoundException());
		var loginAuthenticateRequest = LoginAuthenticateRequest.builder()
			.userUid(findTusUsr.getId())
			.userName(findTusUsr.getUsrNm())
			.idtfVerfCode(IdtfVerfCatCode.getIdtfVerfCatCode(IdtfVerfCatCode.IDV01))
			.emailId(emailId)
			.authType(VerifycationMethodCode.getVerifycationMethodCode(EML))
			.authKey(HexRandomGenerator.generateHexRandom())
			.build();
		var tusUsrIdtfVerf = LoginAuthenticateRequest.toEntity(loginAuthenticateRequest, findTusUsr);
		tusUsrIdtfVerfRepository.save(tusUsrIdtfVerf);
		Map<String, Object> sendMap = new HashMap<>();
		sendMap.put("authKey", loginAuthenticateRequest.getAuthKey());
		sendMap.put("userName", loginAuthenticateRequest.getUserName());
		sendMap.put("moveUrl", frontUrlProperties.getFrontUrl());

		MailSenderDto senderDto = MailSenderDto.builder()
			.subject("인증번호 전송")
			.data(sendMap)
			.to(emailId)
			.build();
		mailUtils.sendMessage("dormantUser", senderDto);
	}

	public void updateVerifyAndAccountActivate(LoginInactiveRequest loginInactiveRequest) {
		log.info(String.format("[updateVerifyAndAccountActivate] emailId: %s, authKey: %s ", loginInactiveRequest.getEmailId(), loginInactiveRequest.getAuthKey()));
		var result = tusUsrIdtfVerfRepository.findByVerfKey(loginInactiveRequest.getEmailId(), loginInactiveRequest.getIdtfVerfCode(), loginInactiveRequest.getAuthKey()).orElse(null);
		verifyValueCheck(result);
		var tusUsr = tusUsrRepository.findByEmlId(loginInactiveRequest.getEmailId()).orElseThrow(() -> new EntityNotFoundException());
		tusUsr.setUsrStsCd(getUserStatusCode(NRM));
		tusUsrRepository.save(tusUsr);
		log.info(String.format("[updateVerifyAndAccountActivate] result : %s", tusUsr.getEmlId()));
	}

	private void verifyValueCheck(LoginVerifyAuthenticateRequest result) {
		if (result == null) {
			businessException.accept(ErrorCode.EXPIRE_AUTHKEY_ERROR);
		}
	}

	public LoginValidResponse getUserInfoValidList(PlatformUserInfo user) {

		log.info(String.format("[getUserInfoValidList] UserUid:%s", user.getUsrUid()));
		// HQ회원에서 가입된 사용자가 존재하지 않을경우 (UsrUid 가 null) tusUsr 은 null 처리한다.

		if(user.getUsrUid() == null) {
			user.setUsrUid("");
		}

		TusUsr tusUsr = tusUsrRepository.findById(user.getUsrUid()).orElse(null);
		var loginValidResponse = tusUsrRepository.findByTusValidInfo(user.getUsrUid()).orElse((LoginValidResponse.builder().build()));


		if (tusUsr == null) {
			loginValidResponse.setLanguageCode("");
			loginValidResponse.setOtpAuthYn("N");
			loginValidResponse.setAdSynchYn("N");
			loginValidResponse.setIsSignUp("N");
			loginValidResponse.setEmailAuthYn("N");
			loginValidResponse.setUserCode(UserValidCorpCode.ETC);
			loginValidResponse.setUserStatusCode("EMPTY");
			loginValidResponse.setEmailId(user.getName());

			return loginValidResponse;
		}

		var joinInviteResponses = tusUsrRepository.findByJoinInviteUser(user.getUsrUid(), user.getLangCode()).orElse(null);
		var loginPasswordUpdateUser = loginMapper.findLoginPwdUpateUser(user.getUsrUid()).orElse(null);
		var tusUsrAprv = tusUsrAprvRepository.findById(tusUsr.getId()).orElse(null);

		loginValidResponse.setIsSignUp("Y");
		if (!loginValidResponse.getCorpStsCd().equals(getCorporateStsCode(ACT))) {
			loginValidResponse.setUserStatusCode("");
		}
		if (tusUsr.getUsrStsCd().equals(getUserStatusCode(RJT))) {
			loginValidResponse.setDenyReasonCode(tusUsrAprv.getDnyResnCd());
		}

		loginValidResponse.setIsTermsAgr("N");
		loginValidResponse.setIsPwdUpdate("N");
		if (joinInviteResponses.size() > 0) {
			// 약관 동의에 대한 최신 버전 및 약관 동의를 해야하는 정보가 존재하면
			loginValidResponse.setIsTermsAgr("Y");
		}
		if(loginPasswordUpdateUser != null) {
			if (loginPasswordUpdateUser.getIsPwdUpdate().equals("Y")) {
				loginValidResponse.setIsPwdUpdate("Y");
			}
		}

		return loginValidResponse;
	}

	public void createUserLoginHistory(PlatformUserInfo user, String address, String city, String country, String countryName, String countryRegionName, String timezone) {
		var tusUsr = tusUsrRepository.findById(user.getUsrUid()).orElseThrow(() -> new EntityNotFoundException());
		log.info(String.format("[createUserLoginHistory] email:%s", tusUsr.getEmlId()));
		TusLoginLog tusLoginLog = TusLoginLog.builder()
			.tusUsr(tusUsr)
			.loginDt(LocalDateTime.now())
			.cntryCd(country)
			.cntryNm(countryName)
			.ctyNm(city)
			.tmZnNm(timezone)
			.rgnNm(countryRegionName)
			.ipAddr(aes256Util.encryptText(address))
			.build();
		tusLoginLogRepository.save(tusLoginLog);
	}

	public LoginFailedResponse getUserPasswordFailedCount(String emailId) {
		String userCorpInfo = emailId.substring(emailId.indexOf("@"));
		TusCorp tusCorp = tusCorpRepository.findTusCorpByDomnNm(userCorpInfo).orElse(null);
		if (tusCorp == null) {
			businessException.accept(ErrorCode.VALIDATE_DOMAIN_ERROR);
		}
		var loginFailedResponse = loginMapper.findLoginPwdCountByUser(emailId).orElse(LoginFailedVo.builder().emlId(emailId).failCnt(0L).build());
		return LoginFailedResponse.builder().emailId(loginFailedResponse.getEmlId()).loginFailedCount(loginFailedResponse.getFailCnt()).build();
	}
}
