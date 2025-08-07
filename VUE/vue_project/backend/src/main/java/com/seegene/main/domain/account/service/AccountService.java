package com.seegene.main.domain.account.service;

import com.seegene.main.domain.account.constant.NotfRolCode;
import com.seegene.main.domain.account.dto.*;
import com.seegene.main.domain.account.entity.TusUsrNotfSetg;
import com.seegene.main.domain.account.repository.TswLicnRepository;
import com.seegene.main.domain.account.repository.TusTermsRepository;
import com.seegene.main.domain.account.repository.TusUsrNotfSetgRepository;
import com.seegene.main.domain.common.entity.TcdCntryGrp;
import com.seegene.main.domain.common.entity.TcdCntryGrpTg;
import com.seegene.main.domain.common.repository.TcdCntryGrpTgRepository;
import com.seegene.main.domain.common.repository.TcdLangRepository;
import com.seegene.main.domain.datacodemanagement.repository.TcdCdItmRepository;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.domain.user.repository.TusUsrRepository;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.exception.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : @mz.co.kr
 *
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1                 최초작성
 * </PRE>
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AccountService {

	private final TswLicnRepository tswLicnRepository;
	private final TusUsrRepository tusUsrRepository;
	private final TusTermsRepository tusTermsRepository;
	private final TcdCntryGrpTgRepository tcdCntryGrpTgRepository;
	private final TcdLangRepository tcdLangRepository;
	private final TusUsrNotfSetgRepository tusUsrNotfSetgRepository;
	private final TcdCdItmRepository tcdCdItmRepository;

	public List<AccountTermsListResponse> getTermsList(PlatformUserInfo user, String country) {
		List<String> cntryGrpList = tcdCntryGrpTgRepository.findByCntryCd_Id(country)
				.stream()
				.map(TcdCntryGrpTg::getCntryGrp)
				.map(TcdCntryGrp::getCntryGrpId)
				.toList();
		// user table 의 country code 에 맞는 약관 조회
		return tusTermsRepository.getTermsList(cntryGrpList, user.getLangCode());
	}

	public List<TermsFilterResponse> getTermsFilter(String categoryCd, String countryGroupId, String version) {
		return tusTermsRepository.getTermsFilter(categoryCd, countryGroupId, version);
	}

	public List<TermsCountryGroupListResponse> getTermsCountryGroupList(String categoryCd) {
		return tusTermsRepository.getTermsCountryGroupList(categoryCd);
	}

	public TermsResponse getTermsDetail(String categoryCd, String countryGroupId, String version, String languageCode, PlatformUserInfo user) {
		return tusTermsRepository.getTermsDetail(categoryCd, countryGroupId, version, languageCode, user.getLangCode()).orElseThrow(EntityNotFoundException::new);
	}

	public List<LicenseListResponse> getLicenseList(PlatformUserInfo user) {
		return tswLicnRepository.findLicnList(user.getLangCode());
	}

	public LicenseDetailResponse getLicenseDetail(long licenseId, PlatformUserInfo user) {
		return tswLicnRepository.findByLicnId(licenseId, user.getLangCode()).orElseThrow(EntityNotFoundException::new);
	}

	public String getLanguageInfo(PlatformUserInfo user) {
		TusUsr tusUsr = tusUsrRepository.findTusUsrById(user.getUsrUid()).orElseThrow(EntityNotFoundException::new);
		return tusUsr.getLangCd();
	}

	public List<LanguageResponse> getLanguageList() {
		return tcdLangRepository.findTcdLangByUseYn("Y").stream().map(LanguageResponse::entityToDto).toList();
	}

	@Transactional
	public void updateLanguageInfo(AccountUpdateLanguageRequest accountUpdateLanguageRequest, PlatformUserInfo user) {
		TusUsr tusUsr = tusUsrRepository.findTusUsrById(user.getUsrUid()).orElseThrow(EntityNotFoundException::new);
		tusUsr.updateLangCd(accountUpdateLanguageRequest.getLanguageCode());
	}

	public List<AccountNotfResponse> getMyNotificationSetting(PlatformUserInfo user) {
		List<String> roles = user.getRoles();
		List<AccountNotfResponse> myNotiList = new ArrayList<>();

		if(roles.contains(NotfRolCode.SERVICE.getName())){
			myNotiList.addAll(getMyNotiList(NotfRolCode.SERVICE.getCode()));
		}
		if(roles.contains(NotfRolCode.PLATFORM.getName())){
			myNotiList.addAll(getMyNotiList(NotfRolCode.PLATFORM.getCode()));
		}
		if(roles.contains(NotfRolCode.OPERATION.getName()) || roles.contains(NotfRolCode.IT.getName())){
			myNotiList.addAll(getMyNotiList(NotfRolCode.OPERATION.getCode()));
		}
		if(myNotiList.isEmpty()){
			myNotiList.addAll(getMyNotiList(NotfRolCode.USER.getCode()));
		}

		myNotiList = myNotiList.stream()
				.filter(distinctByKey(AccountNotfResponse::getNotiCd))
				.sorted(Comparator.comparing(AccountNotfResponse::getNotiCd))
				.toList();

		// 내 알림 세팅 정보를 가져온다 (허용된 알림 아이디)
		List<String> receiveNotfList = tusUsrNotfSetgRepository.findByUsrUidOrderByNotfTpCd(user.getUsrUid())
				.stream()
				.filter(tusUsrNotfSetg -> tusUsrNotfSetg.getRecvYn().equals("Y"))
				.map(TusUsrNotfSetg::getNotfTpCd)
				.toList();

		// 허용된 알림을 "Y" 값으로 변경
		for (AccountNotfResponse notf : myNotiList) {
			if(receiveNotfList.contains(notf.getNotiCd())) {
				notf.updateRecvYn("Y");
			}
		}
		return myNotiList;
	}

	public static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
		Set<Object> seen = ConcurrentHashMap.newKeySet();
		return t -> seen.add(keyExtractor.apply(t));
	}

	public List<AccountNotfResponse> getMyNotiList(String code) {
		return tcdCdItmRepository.findTcdCdItmByCdGrpId(code).stream().map(AccountNotfResponse::defaultNotf).toList();
	}

	@Transactional
	public void updateMyNotificationSetting(AccountNotiRequest accountNotiRequest, PlatformUserInfo user) {
		if(tusUsrNotfSetgRepository.existsByNotfTpCdAndUsrUid(accountNotiRequest.getNotiCd(), user.getUsrUid())){
			TusUsrNotfSetg tusUsrNotfSetg = tusUsrNotfSetgRepository.findByNotfTpCdAndUsrUid(accountNotiRequest.getNotiCd(), user.getUsrUid()).orElseThrow(EntityNotFoundException::new);
			if(tusUsrNotfSetg.getRecvYn().equals("Y")) {
				tusUsrNotfSetg.updateRecvYn("N");
			}else {
				tusUsrNotfSetg.updateRecvYn("Y");
			}
		}else {
			TusUsrNotfSetg tusUsrNotfSetg = TusUsrNotfSetg.builder()
					.usrUid(user.getUsrUid())
					.notfTpCd(accountNotiRequest.getNotiCd())
					.recvYn("Y")
					.build();
			tusUsrNotfSetgRepository.save(tusUsrNotfSetg);
		}
	}

	public TermsResponse getTermsLoginDetail(String categoryCode, String countryGroupId, String version, String languageCode) {
		return tusTermsRepository.getTermsLoginDetail(categoryCode, countryGroupId, version, languageCode).orElseThrow(EntityNotFoundException::new);
	}
}
