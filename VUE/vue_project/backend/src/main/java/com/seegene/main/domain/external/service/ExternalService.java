package com.seegene.main.domain.external.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.seegene.main.domain.external.dto.GuideListResponse;
import com.seegene.main.domain.external.repository.TguDtlGudRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.JsonParser;
import com.seegene.main.domain.account.entity.TusUsrNotfSetg;
import com.seegene.main.domain.account.repository.TusUsrNotfSetgRepository;
import com.seegene.main.domain.dashboard.repository.mongo.VistPageRepository;
import com.seegene.main.domain.datacodemanagement.entity.TcdCdItm;
import com.seegene.main.domain.datacodemanagement.entity.TcdCdItmMlg;
import com.seegene.main.domain.datacodemanagement.repository.TcdCdItmMlgRepository;
import com.seegene.main.domain.datacodemanagement.repository.TcdCdItmRepository;
import com.seegene.main.domain.external.dto.NotiSenderRequest;
import com.seegene.main.domain.external.dto.ProjectProcessInfoResponse;
import com.seegene.main.domain.external.dto.VistPageRequest;
import com.seegene.main.domain.external.entity.mongo.Alarm;
import com.seegene.main.domain.external.entity.mongo.VistPage;
import com.seegene.main.domain.notification.entity.TbdNotf;
import com.seegene.main.domain.notification.entity.TbdNotfMlg;
import com.seegene.main.domain.notification.repository.TbdNotfMlgRepository;
import com.seegene.main.domain.notification.repository.TbdNotfRepository;
import com.seegene.main.domain.notification.repository.mongo.AlarmRepository;
import com.seegene.main.domain.project.repository.TpjPrjPrcsRepository;
import com.seegene.main.domain.project.repository.TpjPrjRepository;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.domain.user.repository.TusUsrRepository;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.dto.ExternalMailSenderDto;
import com.seegene.main.global.exception.BusinessException;
import com.seegene.main.global.util.ses.MailUtils;

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
 *   1 2023-09-13        khhong        최초작성
 * </PRE>
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ExternalService {

	private final MailUtils mailUtils;

	private final TbdNotfRepository tbdNotfRepository;
	private final TbdNotfMlgRepository tbdNotfMlgRepository;
	private final TusUsrRepository tusUsrRepository;
	private final TcdCdItmRepository tcdCdItmRepository;
	private final TcdCdItmMlgRepository tcdCdItmMlgRepository;
	private final TpjPrjRepository tpjPrjRepository;
	private final TpjPrjPrcsRepository tpjPrjPrcsRepository;
	private final AlarmRepository alarmRepository;
	private final VistPageRepository vistPageRepository;
	private final TusUsrNotfSetgRepository tusUsrNotfSetgRepository;
	private final TguDtlGudRepository tguDtlGudRepository;

	@Value("${recaptcha.verify_url}")
	private String url;
	@Value("${recaptcha.secret_key}")
	private String key;
	private static final double HALF = 0.5;
	public void mailSend(ExternalMailSenderDto externalMailSenderDto) {
		mailUtils.sendMessageForExternal(externalMailSenderDto);
	}

	public void sendNotification(NotiSenderRequest notiSenderRequest, PlatformUserInfo user) {
		// 메일템플릿정보를 불러온다 > 발송 메시지와 병합한다 > 몽고DB에 적재한다.
	   	TusUsr tusUsr = tusUsrRepository.findById(notiSenderRequest.getToUsrUid()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_USR_UUID_ERROR));
	   	List<TbdNotf> tbdNotfs = tbdNotfRepository.findByNotfCd(notiSenderRequest.getNotfCd());

		TbdNotf tbdNotf;
		if(tbdNotfs.isEmpty()) {
		  throw new BusinessException(ErrorCode.NO_SUCH_NOTIFICATION_NUM);
		} else {
		   tbdNotf = tbdNotfs.get(0);
		}

		// 해당언어의 템플릿이 없는경우 영어를 기본으로 한다.
		TbdNotfMlg tbdNotfMlg = tbdNotfMlgRepository.findByNotfNumAndLangCd(tbdNotf, tusUsr.getLangCd()).orElse(tbdNotfMlgRepository.findByNotfNumAndLangCd(tbdNotf, "en").get());

		TcdCdItm tcdCdItm = tcdCdItmRepository.findByCdGrpIdAndCd("PFM046", tbdNotf.getNotfTpCd()).orElseThrow(()-> new BusinessException(ErrorCode.NO_SUCH_CODE_GROUP_ID_AND_DISS_CODE_ERROR));

		TcdCdItmMlg tcdCdItmMlg = tcdCdItmMlgRepository.findByCdItmAndLangCd(tcdCdItm, tusUsr.getLangCd()).orElse(tcdCdItmMlgRepository.findByCdItmAndLangCd(tcdCdItm, "en").get());

		// 메시지, URL 병합
		String txt = tbdNotfMlg.getTxt();
		String url = tbdNotf.getLndgUrl();
		if(notiSenderRequest.getContent() != null) {
			for (Map.Entry<String, Object> item : notiSenderRequest.getContent().entrySet()) {
				txt = txt.replace(item.getKey(), item.getValue().toString());
				url = url.replace(item.getKey(), item.getValue().toString());
			}
		}

		// 통합 설정내 on/off 에 따라 알림발송처리
		Optional<TusUsrNotfSetg> oTusUsrNotfSetg = tusUsrNotfSetgRepository.findByNotfTpCdAndUsrUid(tbdNotf.getNotfTpCd(), tusUsr.getId());

		if(oTusUsrNotfSetg != null) {
			if (oTusUsrNotfSetg.isPresent()) {
				if ("Y".equals(oTusUsrNotfSetg.get().getRecvYn())) {
					Alarm alarm = Alarm.builder()
						.title(tcdCdItmMlg.getCdNm())
						.desc(notiSenderRequest.getDescription())
						.content(txt)
						.notfCd(tbdNotf.getNotfCd())
						.notfTpCd(tbdNotf.getNotfTpCd())
						.lndgUrl(url)
						.langCd(tbdNotfMlg.getLangCd())
						.prjNm(notiSenderRequest.getPrjNm())
						.dissCatCd(notiSenderRequest.getDissCatCd())
						.toUsrUid(notiSenderRequest.getToUsrUid())
						.crtDt(LocalDateTime.now())
						.crtrUid(user.getUsrUid())
						.mdfDt(LocalDateTime.now())
						.mdfrUid(user.getUsrUid())
						.build();

					alarmRepository.save(alarm);
				} else {
					//throw new BusinessException(ErrorCode.SEND_ALARM_REJECT);
				}
			} else {
				//throw new BusinessException(ErrorCode.SEND_ALARM_NOT);
			}
		}
	}

	public List<ProjectProcessInfoResponse> getProjectProcessInfo(PlatformUserInfo user) {

		log.info("[External] getProjectProcessInfo userUid: %s ====", user.getUsrUid());
		TusUsr tusUsr = tusUsrRepository.findById(user.getUsrUid()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_USR_UUID_ERROR));
		return tpjPrjPrcsRepository.findByPrjPrcsPrjId(tusUsr.getId()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_PROJECT_PROCESS_ROLE_INFO));
	}

	public ProjectProcessInfoResponse getProjectProcessRoleCheck(PlatformUserInfo user, Long prjectId, Long processId, String procsRoleCode) {
		return tpjPrjPrcsRepository.existsByTpjPrjIdAndprocessIdAndPrcsRoleCd(user.getUsrUid(), prjectId, processId, procsRoleCode).orElseThrow(()-> new BusinessException(ErrorCode.NO_SUCH_PROJECT_PROCESS_ROLE_INFO));
	}

	public void sendVistPage(VistPageRequest vistPageRequest, PlatformUserInfo user) {
		//최근 방문한 페이지
		VistPage vistPage = VistPage.builder()
			.pageUrl(vistPageRequest.getPageUrl())
			.title(vistPageRequest.getTitle())
			.content(vistPageRequest.getContent())
			.crtDt(LocalDateTime.now())
			.crtrUid(user.getUsrUid())
			.mdfDt(LocalDateTime.now())
			.mdfrUid(user.getUsrUid())
			.build();
		vistPageRepository.save(vistPage);
	}

	public Map<String, Object> verifyToken(String token) {
		try {
			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

			MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
			map.add("secret", key);
			map.add("response", token);

			HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, httpHeaders);
			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

			JsonObject jsonObject = JsonParser.parseString(response.getBody()).getAsJsonObject();

			return getMapFromJsonObject(jsonObject);

		} catch (BusinessException e) {
			Map<String, Object> map = new HashMap<>();
			map.put("success", false);
			map.put("error-codes", e.getMessage() );
			return map;
		}
	}
	public static Map<String, Object> getMapFromJsonObject(JsonObject jsonObj){
		Map<String, Object> map = null;

		try {
			map = new ObjectMapper().readValue(jsonObj.toString(), Map.class);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}

	public List<GuideListResponse> getGuideManageMentList(String parameterValue) {
		return tguDtlGudRepository.findTguDtlGudByParmVal(parameterValue)
				.stream()
				.map(GuideListResponse::of)
				.toList();
	}
}