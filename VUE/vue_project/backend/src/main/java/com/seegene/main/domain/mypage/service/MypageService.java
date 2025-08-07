package com.seegene.main.domain.mypage.service;

import com.seegene.main.domain.authority.entity.*;
import com.seegene.main.domain.corporate.constant.CorporateLvlCd;
import com.seegene.main.domain.external.dto.NotiSenderRequest;
import com.seegene.main.domain.external.service.ExternalService;
import com.seegene.main.domain.join.entity.TusTermsAgr;
import com.seegene.main.domain.join.repository.TusTermsAgrRepository;
import com.seegene.main.domain.login.constant.VerifycationMethodCode;
import com.seegene.main.domain.login.dto.LoginAuthenticateRequest;
import com.seegene.main.domain.mypage.constant.WithdrawalReasonCd;
import com.seegene.main.domain.mypage.constant.WithdrawalTypeCd;
import com.seegene.main.domain.mypage.dto.*;
import com.seegene.main.domain.mypage.repository.TrlAdmRolAplHstRepository;
import com.seegene.main.domain.mypage.repository.TrlUsrRolAplHstRepository;
import com.seegene.main.domain.mypage.repository.mapper.MypageMapper;
import com.seegene.main.domain.mypage.repository.mapper.TusUserMapper;
import com.seegene.main.domain.project.constant.HstDvsCd;
import com.seegene.main.domain.project.constant.ProjectManagerYn;
import com.seegene.main.domain.project.entity.TpjPrjMbr;
import com.seegene.main.domain.project.repository.TpjPrjMbrRepository;
import com.seegene.main.domain.user.constant.UserStatusCode;
import com.seegene.main.domain.user.entity.TsrWthdUsr;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.domain.user.entity.TusUsrIdtfVerf;
import com.seegene.main.domain.user.entity.TusUsrSt;
import com.seegene.main.domain.user.entity.TusUsrWdrl;
import com.seegene.main.domain.user.repository.*;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.dto.MailSenderDto;
import com.seegene.main.global.exception.BusinessException;
import com.seegene.main.global.exception.DataNotFoundException;
import com.seegene.main.global.util.AES256Util;
import com.seegene.main.global.util.HexRandomGenerator;
import com.seegene.main.global.util.Sha256EncryUtil;
import com.seegene.main.global.util.ses.MailUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.seegene.main.domain.login.constant.VerifycationMethodCode.EML;

@Service
@RequiredArgsConstructor
@Slf4j
public class MypageService {
	private final TusUsrWdrlRepository tusUsrWdrlRepository;
	private final TrlAdmRolAplHstRepository trlAdmRolAplHstRepository;
	private final TrlUsrRolAplHstRepository trlUsrRolAplHstRepository;
	private final TsrWthdUsrRepository tsrWthdUsrRepository;

	private final AES256Util aes256Util;

	private final MailUtils mailUtils;
	private final MypageMapper mypageMapper;
	private final TrlUsrRolRepository trlUsrRolRepository;
	private final TrlAdmRolRepository trlAdmRolRepository;
	private final TusUsrRepository tusUsrRepository;
	private final TusUsrIdtfVerfRepository tusUsrIdtfVerfRepository;
	private final TrlUsrRolAplRepository trlUsrRolAplRepository;
	private final TrlAdmRolAplRepository trlAdmRolAplRepository;
	private final TrlUsrRolReqRepository trlUsrRolReqRepository;
	private final TrlAdmRolReqRepository trlAdmRolReqRepository;
	private final TrlAdmRolReqTgRepository trlAdmRolReqTgRepository;
	private final TpjPrjMbrRepository tpjPrjMbrRepository;
	private final TusTermsAgrRepository tusTermsAgrRepository;
	private final TusUsrStRepository tusUsrStRepository;

	private final ExternalService externalService;
	private final TusUserMapper tusUserMapper;

	public MypageResponse getMyInfo(String id) {

		TusUsr tusUsr = tusUsrRepository.findById(id).orElseThrow(() -> {
			return new BusinessException(ErrorCode.NO_SUCH_USR_UUID_ERROR);
		});

		Optional<TrlUsrRolApl> trlUsrRolAplList = trlUsrRolAplRepository.findById(id);
		List<TrlAdmRolApl> trlAdmRolAplList = trlAdmRolAplRepository.findByTusUsr(tusUsr);

		return MypageResponse.of(
			Optional.ofNullable(mypageMapper.getMypage(Map.of("id", id))).get().stream().map(v->MyInfoResponse.of(
				v.getUsrUid(),
				v.getEmlId(),
				v.getPrflFlNum(),
				v.getUsrNm(),
				v.getCorpNm(),
				v.getOrgnNm(),
				v.getJobTitl(),
				v.getCrtDt(),
				(v.getLoginDt() ==  null ? "" : v.getLoginDt() + " / ")
						+ (v.getIpAddr() == null ? "" : String.valueOf(aes256Util.decryptText(v.getIpAddr())) + " / ")
						+ (v.getLastAccessDate() == null ? "" : v.getLastAccessDate())
			)).collect(Collectors.toList()),
			trlUsrRolAplList.stream().map(v->MyInfoUserRolResponse.of(v)).collect(Collectors.toList()),
			trlAdmRolAplList.stream().map(v->MyInfoAdmRolResponse.of(v)).collect(Collectors.toList()),
			Optional.ofNullable(mypageMapper.getLoginLog(Map.of("id", id))).get().stream().map(v->LoginLogResponse.of(v)).collect(Collectors.toList())
		);
	}

	public MyInfoRoleResponse getMyInfoRole() {

		String admRolNm = "LV1"; // Corporate Level Code(#CD_GRP_ID=US003:(씨젠HQ[LV1],New.Co[LV2]) )

		List<TrlUsrRol> userRolList = trlUsrRolRepository.findByCorpLvlCd(admRolNm);
		List<TrlAdmRol> admRolList = trlAdmRolRepository.findAll();

		return MyInfoRoleResponse.of(
			userRolList.stream().map(v->UserRolResponse.of(v)).sorted(Comparator.comparing(UserRolResponse::getUsrRolNm).thenComparing(UserRolResponse::getUsrRolNum)).collect(Collectors.toList()),
			admRolList.stream().map(v->AdminRolResponse.of(v)).sorted(Comparator.comparing(AdminRolResponse::getAdmRolNm).thenComparing(AdminRolResponse::getAdmRolNm)).collect(Collectors.toList())
		);
	}

	@Transactional
	public void updateMyInfo(String id, MyInfoRequest myInfoRequest) {

		TusUsr tusUsr = tusUsrRepository.findById(id).orElseThrow(() -> {
			return new BusinessException(ErrorCode.NO_SUCH_USR_UUID_ERROR);
		});

		tusUsr.setJobNm(myInfoRequest.getJobNm());

	}

	@Transactional
	public void createUserRuleReq(String id, MyInfoRoleRequest myInfoRole, PlatformUserInfo user) {

		// User Role Request insert
		TrlUsrRolReq trlUsrRolReq = new TrlUsrRolReq();
		trlUsrRolReq.setTusUsr(tusUsrRepository.getReferenceById(id));
		trlUsrRolReq.setUsrRolNum(trlUsrRolRepository.getReferenceById(Long.valueOf(myInfoRole.getRolNum())));
		trlUsrRolReqRepository.save(trlUsrRolReq);

		//알림 설정(역할 변경요청자에게 발송)
		sendAlarm("C205", id, Map.of(), user);

		//알림설정(관리자에게 발송)할
		//1. hq/newco 인지 확인
		//2. hq : 서비스관리자 / newCo : 플랫폼관리자
		TusUsr reqUser = tusUsrRepository.findById(id).orElseThrow(DataNotFoundException::new);
		TrlUsrRol reqUserRole = trlUsrRolRepository.findById(Long.valueOf(myInfoRole.getRolNum())).orElseThrow(()-> new BusinessException(
			ErrorCode.NO_SUCH_USR_ROLE_NUM_ERROR));

		if(reqUser.getTusCorp().getCorpLvlCd().equals(CorporateLvlCd.LV1.getCode())){
			//hq
			List<TrlAdmRolApl> platformManagerList= trlAdmRolAplRepository.findByTrlAdmRolAdmRolCd("A-SV");
			for (TrlAdmRolApl targetAdminUser : platformManagerList) {
				sendAlarm("C021"
					, targetAdminUser.getTusUsr().getId()
					, Map.of("{%%%}",reqUser.getUsrNm()
						, "{사용자/어드민 역할}",reqUserRole.getUsrRolNm())
					, user);
			}
		}else{
			//newCo
			List<TrlAdmRolApl> platformManagerList= trlAdmRolAplRepository.findByTrlAdmRolAdmRolCd("A-PF");

			for (TrlAdmRolApl targetAdminUser : platformManagerList) {
				sendAlarm("C024"
					, targetAdminUser.getTusUsr().getId()
					, Map.of("{%%%}",reqUser.getUsrNm()
						, "{사용자 역할}",reqUserRole.getUsrRolNm())
					, user);
			}
		}

	}

	@Transactional
	public void createAdminRuleReq(String id, MyInfoRoleRequest myInfoRole ,PlatformUserInfo user) {

		// Admin Role Request insert
		TrlAdmRolReq trlAdmRolReq = new TrlAdmRolReq();
		trlAdmRolReq.setReqUsrUidTusUsr(tusUsrRepository.getReferenceById(id));
		trlAdmRolReqRepository.save(trlAdmRolReq);

		// Admin Role Request Number search
		TrlAdmRolReq trlAdmRolReqOne = trlAdmRolReqRepository.findTop1ByReqUsrUidTusUsr_IdOrderByIdDesc(id);

		// Admin Role Request Target insert
		String[] rolNums = myInfoRole.getRolNum().split(",");

		List<TrlAdmRolReqTg> trlAdmRolReqTgs = new ArrayList<>();

		Arrays.stream(rolNums).forEach(
				v->{
					TrlAdmRolReqTg trlAdmRolReqTg = TrlAdmRolReqTg.builder()
							.trlAdmRolReq(trlAdmRolReqRepository.getReferenceById(trlAdmRolReqOne.getId()))
							.trlAdmRol(trlAdmRolRepository.getReferenceById(Long.valueOf(v)))
							.usrUid(id)
							.build();
					trlAdmRolReqTgs.add(trlAdmRolReqTg);
				}
		);

		trlAdmRolReqTgRepository.saveAll(trlAdmRolReqTgs);

		//알림 설정
		TusUsr reqUser = tusUsrRepository.findById(id).orElseThrow(DataNotFoundException::new);
		TrlAdmRol reqUserRole = trlAdmRolRepository.findById(Long.valueOf(myInfoRole.getRolNum())).orElseThrow(()-> new BusinessException(
			ErrorCode.NO_SUCH_USR_ROLE_NUM_ERROR));

		//(역할 변경요청자에게 발송)
		final String notificationCd = "C001";
		sendAlarm(notificationCd, id, Map.of(), user);

		//서비스 관리자에게 발송
		List<TrlAdmRolApl> platformManagerList= trlAdmRolAplRepository.findByTrlAdmRolAdmRolCd("A-SV");
		for (TrlAdmRolApl targetAdminUser : platformManagerList) {
			sendAlarm("C021"
				, targetAdminUser.getTusUsr().getId()
				, Map.of("{%%%}",reqUser.getUsrNm()
					, "{사용자/어드민 역할}",reqUserRole.getAdmRolNm())
				, user);
		}

	}

//	public Page<LoginLogResponse> selectLoginLog(Pageable pageable) {
//		// Page<LoginLogResponse> page = Page.empty(pageable);
//		// return page;
//
//		List<LoginLogResponse> dummyData = new ArrayList<>();
//		dummyData.add(0,
//			LoginLogResponse.builder().loginDatetime("2024-04-25 17:52:45").ipAddress("59.180.63.522").build());
//		dummyData.add(1,
//			LoginLogResponse.builder().loginDatetime("2024-04-26 12:30:15").ipAddress("59.180.63.522").build());
//		dummyData.add(2,
//			LoginLogResponse.builder().loginDatetime("2024-04-30 09:25:15").ipAddress("59.180.63.522").build());
//		dummyData.add(3,
//			LoginLogResponse.builder().loginDatetime("2024-04-01 08:30:55").ipAddress("59.180.63.522").build());
//		dummyData.add(4,
//			LoginLogResponse.builder().loginDatetime("2024-04-12 15:45:00").ipAddress("59.180.63.522").build());
//
//		int start = (int)pageable.getOffset();
//		int end = Math.min((start + pageable.getPageSize()), dummyData.size());
//		List<LoginLogResponse> content = dummyData.subList(start, end);
//
//		return new PageImpl<>(dummyData, pageable, dummyData.size());
//	}

	// public List<WithdrawalResponse> selectTermsConditions(){
	// 	List<WithdrawalResponse> termsConditions = new ArrayList<>();
	// 	termsConditions.add(0,WithdrawalResponse.builder().termsCatCd("001").cont("탈퇴 후 개인정보 및 서비스 이용기록은 모두 삭제 되는 것에 동의합니다.").build());
	// 	termsConditions.add(1,WithdrawalResponse.builder().termsCatCd("002").cont("탈퇴 후에도 서비스에등록한 게시물 및 업무 기록을 보관하는 것에 동의합니다.").build());
	// 	termsConditions.add(2,WithdrawalResponse.builder().termsCatCd("003").cont("계정을 이용하여 다른 서비스(ODS,SG-IDEA등의 시스템 툴)계정까지 일괄적으로 탈퇴 하는 것에 동의합니다.").build());
	// 	termsConditions.add(3,WithdrawalResponse.builder().termsCatCd("004").cont("안내 사항을 모두 확인하였으며,이에 동의합니다.").build());
	//
	// 	return termsConditions;
	// }

	public WithdrawalResponse getWithdrawalCode(String id){

		// 인증코드
		String authKey = HexRandomGenerator.generateHexRandom();

		// 사용자 조회
		TusUsr tusUsr = tusUsrRepository.findById(id).orElseThrow(() -> {
			return new BusinessException(ErrorCode.NO_SUCH_USR_UUID_ERROR);
		});

		// 인증번호 insert
		LoginAuthenticateRequest loginAuthenticateRequest = LoginAuthenticateRequest.builder()
				.userUid(tusUsr.getId())
				.userName(tusUsr.getUsrNm())
				.emailId(tusUsr.getEmlId())
				.authType(VerifycationMethodCode.getVerifycationMethodCode(EML)) // 발송타입 : 메일
				.idtfVerfCode("IDV02") // 탈퇴인증
				.authKey(authKey) // 인증번호 난수 생성
				.build();

		TusUsrIdtfVerf tusUsrIdtfVerf = LoginAuthenticateRequest.toEntity(loginAuthenticateRequest, tusUsr);
		tusUsrIdtfVerfRepository.save(tusUsrIdtfVerf);

		// send mail
		Map<String, Object> sendMap = new HashMap<>();
		sendMap.put("authKey", loginAuthenticateRequest.getAuthKey());
		sendMap.put("userName", loginAuthenticateRequest.getUserName());
		MailSenderDto senderDto = MailSenderDto.builder()
				.subject("인증번호 전송")
				.data(sendMap)
				.to(loginAuthenticateRequest.getEmailId())
				.build();
		mailUtils.sendMessage("dormantUser", senderDto);

		return WithdrawalResponse.setWithdrawal(authKey);

	}

	public String codeChack(String withdrawalCode,String emlAddr){
		//사용자가 입력한 코드값 과 이메일로 전송한 코드값 비교 로직
		String codeCheck = "xxxxx";
		return  codeCheck;
	}

	@Transactional
	public void updateWithdrawal(String id){

		TusUsr tusUsr = tusUsrRepository.findById(id).orElseThrow(() -> {
			return new BusinessException(ErrorCode.NO_SUCH_USR_UUID_ERROR);
		});

		// 사용자가 프로젝트 관리자 여부 조회
		Long tpjPrjMbrCnt = tpjPrjMbrRepository.countDistinctByTusUsr_IdAndPrjRolCdAllIgnoreCase(id, "PJM");

		if(tpjPrjMbrCnt == 1) {
			throw new BusinessException(ErrorCode.PROJECT_MANAGER_ERROR);
		}else{
			// 회원 탈퇴 상태 수정
			tusUsr.setUsrStsCd("WDR");
		}

		//탈퇴시 분리보관 로직
		String wdrlResnCd = WithdrawalReasonCd.WD99.getCode();
		withdrawMembership(tusUsr,wdrlResnCd);
	}

	@Transactional
	public void withdrawMembership(TusUsr tusUsr , String wdrlResnCd){
		//탈퇴시 적용되는 사항
		//탈퇴멤버가 프로젝트관리자일 경우 관리자 변경후 탈퇴가능 안내메세지 -> 상위로직에 있음
		//1.TUS_USR 테이블 상태코드 변경 (NRM->WDR) , 개인정보 비식별화
		//2.TUS_USR_STS 테이블 이력 저장
		//3.사용자 역할,어드민 역할 삭제
		//4.동의한 약관동의 철회
		//5.TSR_DMNT_USR 테이블 분리보관(TUS_USR --> TSR_WTHD_USR)
		//6.TUS_USR_WDRL 테이블 저장

		//1.TUS_USR 테이블 상태코드 변경 (NRM->WDR) ,개인정보 비식별화
		UUID uuid = UUID.randomUUID();
		String anonymization = uuid.toString().replace("-", "").toUpperCase();

		Map<String, Object> param = new HashMap<>();
		param.put("emailId", anonymization);
		param.put("usrUid", tusUsr.getId());
		tusUserMapper.updateTusUsr(param);

		//2.TUS_USR_STS 테이블 이력 저장
		TusUsrSt tusUsrSt = TusUsrSt.builder()
			.tusUsr(tusUsr)
			.stsDt(LocalDateTime.now())
			.usrStsCd(UserStatusCode.WDR.name())
			.build();
		tusUsrStRepository.save(tusUsrSt);

		//3.사용자 역할,어드민 역할 삭제(hq : 사용자/어드민 역할 삭제 , newCo : 사용자 역할 삭제)
		processByCorpLvl(tusUsr);

		//4.동의한 약관동의 철회
		//약관 동의여부 조회 후 동의여부 Y->N 변경
		List<TusTermsAgr> checkTermsAcceptance = tusTermsAgrRepository.findByTusUsrId(tusUsr.getId());
		if (checkTermsAcceptance != null) {
			checkTermsAcceptance.forEach(data -> data.setAgrYn("N"));
		}

		//5.TSR_DMNT_USR 테이블 분리보관(TUS_USR --> TSR_WTHD_USR)
		TsrWthdUsr tsrWthdUsr = TsrWthdUsr.builder()
			.id(tusUsr.getId())
			.corpNum(tusUsr.getTusCorp().getId())
			.emlId(tusUsr.getEmlId())
			.usrNm(tusUsr.getUsrNm())
			.orgnNm(tusUsr.getOrgnNm())
			.jobTitl(tusUsr.getJobTitl())
			.jobNm(tusUsr.getJobNm())
			.prflFlNum(tusUsr.getTsyFl() != null ? tusUsr.getTsyFl().getId() : null)
			.joinTpCd(tusUsr.getJoinTpCd())
			.cntryCd(tusUsr.getCntryCd())
			.langCd(tusUsr.getLangCd())
			.usrStsCd(tusUsr.getUsrStsCd())
			.otpAuthYn(tusUsr.getOtpAuthYn())
			.emlAuthYn(tusUsr.getEmlAuthYn())
			.adSynYn(tusUsr.getAdSynYn())
			.lstAlmInqrDt(tusUsr.getLstAlmInqrDt())
			.seperDt(LocalDateTime.now())
			.build();
		tsrWthdUsrRepository.save(tsrWthdUsr);

		//6.TUS_USR_WDRL 테이블 저장
		TusUsrWdrl tusUsrWdrl = TusUsrWdrl.builder()
			.usrUid(tusUsr.getId())
			.wdrlResnCd(wdrlResnCd)//탈퇴사유
			.wdrlTpCd(WithdrawalTypeCd.AMF.getCode())//탈퇴타입
			.wdrlDt(LocalDateTime.now())
			.build();

		tusUsrWdrlRepository.save(tusUsrWdrl);
	}

	public void processByCorpLvl(TusUsr tusUsr){
		//3.사용자 역할,어드민 역할 삭제(hq : 사용자/어드민 역할 삭제 , newCo : 사용자 역할 삭제)
		//newCO / HQ 확인
		if(tusUsr.getTusCorp().getCorpLvlCd().equals(CorporateLvlCd.LV1.getCode())){
			//hq : 사용자/어드민 역할 삭제
			List<TrlAdmRolApl> findAdminRole = trlAdmRolAplRepository.findByTusUsr(tusUsr);
			if(findAdminRole != null){
				//어드민 롤 삭제
				trlAdmRolAplRepository.deleteAll(findAdminRole);

				//히스토리 테이블 insert
				findAdminRole.forEach(data -> {
					TrlAdmRolAplHst trlAdmRolAplHst = TrlAdmRolAplHst.builder()
						.usrUid(tusUsr.getId())
						.admRolNum(data.getTrlAdmRol().getId())
						.hstDt(LocalDateTime.now())
						.hstDvsCd(HstDvsCd.DEL.name())
						.build();
					trlAdmRolAplHstRepository.save(trlAdmRolAplHst);
				});
			}
		}

		//유저롤 찾기
		Optional<TrlUsrRolApl> findUserRole = trlUsrRolAplRepository.findById(tusUsr.getId());

		if(findUserRole.isPresent()){
			//유저롤 삭제
			trlUsrRolAplRepository.delete(findUserRole.get());

			TrlUsrRolAplHst trlUsrRolAplHst = TrlUsrRolAplHst.builder()
				.usrUid(tusUsr.getId())
				.hstDt(LocalDateTime.now())
				.hstDvsCd(HstDvsCd.DEL.name())
				.usrRolNum(findUserRole.get().getTrlUsrRol().getId())
				.build();
			trlUsrRolAplHstRepository.save(trlUsrRolAplHst);
		}
	}

	public ResultValue getPwdInfo(String id, String loginPwd) {

		// 사용자 조회
		TusUsr tusUsr = tusUsrRepository.findById(id).orElseThrow(() -> {
			return new BusinessException(ErrorCode.NO_SUCH_USR_UUID_ERROR);
		});

		//사용자가 입력한 값 / 저장된 비밀번호가 같은지 확인
		return Sha256EncryUtil.ShaEncoder(loginPwd).equals(tusUsr.getLoginPwd())?ResultValue.Y:ResultValue.N;

	}

	public void updatePwd(String id, String loginPwd, String newPwd) {

		// 사용자 조회
		TusUsr tusUsr = tusUsrRepository.findById(id).orElseThrow(() -> {
			return new BusinessException(ErrorCode.NO_SUCH_USR_UUID_ERROR);
		});

		tusUsr.setLoginPwd(Sha256EncryUtil.ShaEncoder(newPwd));

	}

	//알림
	public void sendAlarm(
		String notificationCd, // 알림 코드
		String usrUid, // 보낼 사용자 uid
		Map<String,Object> content,
		PlatformUserInfo user
	){
		externalService.sendNotification(NotiSenderRequest.builder()
			.usrUid(user.getUsrUid())
			.notfCd(notificationCd)
			.content(content)
			.toUsrUid(usrUid)
			.build(), user);
	}
}
