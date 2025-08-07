package com.seegene.main.domain.databox.service;

import com.seegene.main.domain.common.dto.FileInfoResponse;
import com.seegene.main.domain.common.repository.TsyFlRepository;
import com.seegene.main.domain.databox.dto.DataboxManualsDetailResponse;
import com.seegene.main.domain.databox.dto.DataboxManualsResponse;
import com.seegene.main.domain.databox.entity.TbdLibr;
import com.seegene.main.domain.databox.entity.TbdLibrCat;
import com.seegene.main.domain.databox.repository.TbdLibrAtchRepository;
import com.seegene.main.domain.databox.repository.TbdLibrCatRepository;
import com.seegene.main.domain.databox.repository.TbdLibrPrtlyOpenRepository;
import com.seegene.main.domain.databox.repository.TbdLibrRepository;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.domain.user.repository.TusUsrRepository;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.convert.DefaultDateTimeConverter;
import com.seegene.main.global.exception.EntityNotFoundException;
import com.seegene.main.global.function.ExceptionInterface;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * DataboxService
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
public class DataboxService implements ExceptionInterface {

	private final TusUsrRepository tusUsrRepository;
	private final TbdLibrRepository tbdLibrRepository;
	private final TbdLibrCatRepository tbdLibrCatRepository;
	private final TbdLibrAtchRepository tbdLibrAtchRepository;
	private final TbdLibrPrtlyOpenRepository tbdLibrPrtlyOpenRepository;
	private final TsyFlRepository tsyFlRepository;

	public Page<DataboxManualsResponse> getDataboxManuals(Pageable pageable) {
		log.info("[getDataboxManuals] =================== ");
		List<DataboxManualsResponse> result = tbdLibrRepository.findAllDataboxManuals(pageable).orElseThrow(() -> new EntityNotFoundException());
		return new PageImpl<>(result);
	}

	public Page<DataboxManualsDetailResponse> getDataboxManualsList(Long manualsId, LocalDateTime startDate,
		LocalDateTime endDate, String type, String keyword, Pageable pageable) {
		log.info(
			String.format("[getDataboxManualsList] manualsId: %s, startDate: %s, endDate: %s, keyword: %s", manualsId,
				startDate, endDate, keyword));
		TbdLibrCat tbdLibrCat = tbdLibrCatRepository.findById(manualsId)
			.orElseThrow(() -> new EntityNotFoundException());
		if ((type.equals("title") || type.equals("cont")) && keyword.equals("")) {
			businessException.accept(ErrorCode.INPUT_VALUE_CHECK);
		} else if (!keyword.equals("") && type.equals("")) {
			businessException.accept(ErrorCode.INPUT_VALUE_CHECK);
		}
		List<DataboxManualsDetailResponse> result = tbdLibrRepository.findAllDataboxManualsList(tbdLibrCat.getId(),
			DefaultDateTimeConverter.convertStartLocalDateTime(startDate),
			DefaultDateTimeConverter.convertEndLocalDateTime(endDate), type, keyword, pageable)
			.orElseThrow(() -> new EntityNotFoundException());
		return new PageImpl<>(result);
	}

	public DataboxManualsDetailResponse getDataboxManualsListDetail(PlatformUserInfo user, Long manualsDetailId) {
		log.info(String.format("[getDataboxManualsListDetail] userUid:%s, manualsDetailId: %s", user.getUsrUid(), manualsDetailId));
		TbdLibr tbdLibr = tbdLibrRepository.findById(manualsDetailId).orElseThrow(() -> new EntityNotFoundException());
		var tbdLibrAtches = tbdLibrAtchRepository.findAllByTbdLibr(tbdLibr).orElse(null);
		var tsyFls = tbdLibrAtches.stream().map(tbdLibrAtch -> tsyFlRepository.findById(tbdLibrAtch.getId()).orElse(null)).collect(Collectors.toList());
		tsyFls.removeIf(Objects::isNull); // Null 값 제거

		if (tbdLibr.getOpenLvlCd().equals("PTL")) {
			TusUsr tusUsr = tusUsrRepository.findById(user.getUsrUid()).orElseThrow(() -> new EntityNotFoundException());
			var findTbdLibrPrtlyOpens = tbdLibrPrtlyOpenRepository.findByTbdLibr(tbdLibr).orElseThrow(() -> new EntityNotFoundException());
			var collect = findTbdLibrPrtlyOpens.stream().map(findTbdLibrPrtlyOpen -> {
				if (tusUsr.getTusCorp() == findTbdLibrPrtlyOpen.getTusCorp()) {
					return true;
				}
				return false;
			}).collect(Collectors.toList());
			var contains = collect.contains(true);
			if (!contains) {
				businessException.accept(ErrorCode.NO_SUCH_LIB_OPEN_LEVEL_CODE_ERROR);
			}
		} else if (tbdLibr.getOpenLvlCd().equals("PRV")) {
			businessException.accept(ErrorCode.NO_SUCH_LIB_OPEN_LEVEL_CODE_ERROR);
		}

		return DataboxManualsDetailResponse.builder()
			.librNum(tbdLibr.getId())
			.librCatNum(String.valueOf(tbdLibr.getLibrCatNum().getId()))
			.titl(tbdLibr.getTitl())
			.cont(tbdLibr.getCont())
			.dowlUseYn(tbdLibr.getDowlUseYn())
			.openLvlCd(tbdLibr.getOpenLvlCd())
			.crtrDt(DefaultDateTimeConverter.convertDateTime(tbdLibr.getCrtDt()))
			.mdfDt(DefaultDateTimeConverter.convertDateTime(tbdLibr.getMdfDt()))
			.fileInfoResponses(FileInfoResponse.ofList(tsyFls))
			.build();
	}
}