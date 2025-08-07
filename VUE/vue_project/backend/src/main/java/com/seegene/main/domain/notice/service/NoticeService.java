package com.seegene.main.domain.notice.service;

import static com.seegene.main.global.function.ExceptionInterface.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.seegene.main.domain.notice.dto.DashboardNoticeListResponse;
import com.seegene.main.domain.notice.dto.NoticeListResponse;
import com.seegene.main.global.auth.PlatformUserInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.domain.common.repository.TsyFlRepository;
import com.seegene.main.domain.notice.contant.NoticeKeywordTab;
import com.seegene.main.domain.notice.dto.NoticeDetailResponse;
import com.seegene.main.domain.notice.dto.NoticeGetResponse;
import com.seegene.main.domain.notice.entity.TbdNtc;
import com.seegene.main.domain.notice.entity.TbdNtcAtch;
import com.seegene.main.domain.notice.entity.TbdNtcMlg;
import com.seegene.main.domain.notice.repository.TbdNtcMlgRepository;
import com.seegene.main.domain.notice.repository.TbdNtcPrtlyOpenRepository;
import com.seegene.main.domain.notice.repository.TbdNtcRepository;
import com.seegene.main.domain.notice.repository.mapper.NoticeMapper;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.domain.user.repository.TusUsrRepository;
import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.convert.DefaultDateTimeConverter;
import com.seegene.main.global.convert.DefaultDateTimeFormat;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : wwsoh@seegene.com
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-07        wwsoh        최초작성
 * </PRE>
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeService {
	private final TbdNtcRepository tbdNtcRepository;
	private final TbdNtcMlgRepository tbdNtcMlgRepository;
	private final TsyFlRepository tsyFlRepository;
	private final TbdNtcPrtlyOpenRepository tbdNtcPrtlyOpenRepository;
	private final TusUsrRepository tusUsrRepository;
	private final NoticeMapper mapper;
	public Page<NoticeGetResponse> getNoticeList(LocalDateTime startDate, LocalDateTime endDate, NoticeKeywordTab keywordTab, String keyword, String userLanguageCode, String userUid, Pageable pageable) {

		Map<String, Object> param = new HashMap<>();

		Optional<TusUsr> tusUsr = tusUsrRepository.findById(userUid);
		if(!tusUsr.isPresent()){
			businessException.accept(ErrorCode.NO_SUCH_USER_ERROR);
		}
		Long userCorpNum = tusUsr.get().getTusCorp().getId();
		if(userCorpNum == null){
			businessException.accept(ErrorCode.NO_SUCH_USER_CORP_NUM_ERROR);
		}

		// put date
		String startDateLocal = "1900-01-01 00:00:00";
		String endDateLocal = "2999-12-31 23:59:59";

		if(startDate != null){
			startDateLocal = DefaultDateTimeConverter.convertDateTime(DefaultDateTimeConverter.convertStartLocalDateTime(startDate), DefaultDateTimeFormat.DATE_TIME_FORMAT);
		}
		if(endDate != null){
			endDateLocal = DefaultDateTimeConverter.convertDateTime(DefaultDateTimeConverter.convertStartLocalDateTime(endDate), DefaultDateTimeFormat.DATE_TIME_FORMAT);
		}

		param.put("startDate", startDateLocal);
		param.put("endDate", endDateLocal);

		// put keyword search
		param.put("keywordTab", keywordTab == null ? "" : keywordTab.getCode().toString());
		param.put("keyword", keyword == null ? "" : keyword);

		// put user info
		param.put("userLanguageCode", userLanguageCode);
		param.put("userCorpNum", userCorpNum);

		//pagable
		param.put("offset", pageable.getOffset());
		param.put("pageSize", pageable.getPageSize());

		Long totalElement = mapper.getNoticeListCount(param);
		List<NoticeGetResponse> noticeGetResponses = Optional.ofNullable(mapper.getNoticeList(param)).get().stream().map(v->NoticeGetResponse.of(v)).collect(Collectors.toList());

		Page<NoticeGetResponse> pages = new PageImpl<>(noticeGetResponses, pageable, totalElement);

		return pages;
	}

	public NoticeDetailResponse getNoticeDetail(Long noticeNum, String userLanguageCode, String userUid) {
		log.info(String.format("[getNoticeDetail] id: %s", noticeNum));
		Optional<TbdNtc> tbdNtc = tbdNtcRepository.findById(noticeNum);
		if(!tbdNtc.isPresent()){
			businessException.accept(ErrorCode.NO_SUCH_NOTICE_NUM_ERROR);
		}
		Optional<TusUsr> tusUsr = tusUsrRepository.findById(userUid);
		if(!tusUsr.isPresent()){
			businessException.accept(ErrorCode.NO_SUCH_USER_ERROR);
		}
		Long userCorpNum = tusUsr.get().getTusCorp().getId();
		if(userCorpNum == null){
			businessException.accept(ErrorCode.NO_SUCH_USER_CORP_NUM_ERROR);
		}

		Boolean prtlyNoticeExist = tbdNtcPrtlyOpenRepository.existsByTbdNtc_IdAndTusCorp_Id(noticeNum, userCorpNum);


		NoticeDetailResponse noticeDetailResponse = new NoticeDetailResponse();

		if("PUB".equals(tbdNtc.get().getOpenLvlCd()) || ("PTL".equals(tbdNtc.get().getOpenLvlCd()) && prtlyNoticeExist)){

			String defaultLanguageCode = "en"; // Default language code is 'EN'

			TbdNtcMlg tbdNtcMlg = tbdNtcMlgRepository.findByTbdNtc_IdAndLangCd(noticeNum, userLanguageCode)
				.orElseGet(() -> tbdNtcMlgRepository.findByTbdNtc_IdAndLangCd(noticeNum, defaultLanguageCode).get());

			if(tbdNtcMlg == null){
				businessException.accept(ErrorCode.NO_SUCH_NOTICE_MULTI_ERROR);
			}

			List<Long> flnums = new ArrayList<>();
			for(TbdNtcAtch tbdNtcAtch : tbdNtc.get().getTbdNtcAtches()){
				flnums.add(tbdNtcAtch.getFlNum());
			}

			List<TsyFl> tsyFls = tsyFlRepository.findAllById(flnums);

			if(tsyFls.isEmpty()){
				businessException.accept(ErrorCode.NO_SUCH_NOTICE_FILE_ERROR);
			}

			noticeDetailResponse = NoticeDetailResponse.of(tbdNtc.get(), tsyFls, tbdNtcMlg);

		}else{
			log.info(String.format("User not allowed to view this notice"));
			noticeDetailResponse = null;
			businessException.accept(ErrorCode.NOT_ACCESS_USER_ERROR);

		}

		return noticeDetailResponse;


	}

	public List<DashboardNoticeListResponse> getRecentNotice(PlatformUserInfo user) {
		//최근 등록된 5개 공지사항
		return tbdNtcRepository.findHomeNotice(user.getLangCode(), user.getUsrUid());
	}
}
