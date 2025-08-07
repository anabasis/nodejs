package com.seegene.main.domain.software.service;

import java.time.LocalDateTime;

import com.seegene.main.domain.software.dto.SoftwareDetailResponse;
import com.seegene.main.domain.software.dto.SoftwareListResponse;
import com.seegene.main.domain.software.dto.SoftwareReleaseDetailResponse;
import com.seegene.main.domain.software.entity.TswSw;
import com.seegene.main.domain.software.entity.TswSwRels;
import com.seegene.main.domain.software.repository.TswSwRelsRepository;
import com.seegene.main.domain.software.repository.TswSwRepository;
import com.seegene.main.global.convert.DefaultDateTimeConverter;
import com.seegene.main.global.exception.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


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
 *   1 2023-07-05        khhong        최초작성
 * </PRE>
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SoftwareService {

	private final TswSwRepository tswSwRepository;
	private final TswSwRelsRepository tswSwRelsRepository;

	public Page<SoftwareListResponse> getSoftwareList(Pageable pageable, LocalDateTime startDate, LocalDateTime endDate , String type, String keywordName, String keyword) {
		LocalDateTime startDt = DefaultDateTimeConverter.convertStartLocalDateTime(startDate);
		LocalDateTime endDt = DefaultDateTimeConverter.convertEndLocalDateTime(endDate);
		return tswSwRepository.findAllSoftwareManagement(keywordName, keyword, type, startDt, endDt, pageable);
	}

	public SoftwareDetailResponse getSoftwareDetail(Long softwareNumber) {
		TswSw result = tswSwRepository.findTswSwsById(softwareNumber).orElseThrow(DataNotFoundException::new);
		return SoftwareDetailResponse.entityToDto(result);
	}

	public Page<SoftwareReleaseDetailResponse> getSoftwareDetailVersionHistory(long softwareNumber, Pageable pageable) {
		return tswSwRelsRepository.findByTswSw_IdOrderByCrtDtDesc(softwareNumber, pageable)
				.map(SoftwareReleaseDetailResponse::entityToDto);
	}

	public SoftwareReleaseDetailResponse getSoftwareVersionDetail(Long ReleaseNumber) {
		TswSwRels result = tswSwRelsRepository.findTswSwRelsById(ReleaseNumber).orElseThrow(DataNotFoundException::new);
		return SoftwareReleaseDetailResponse.entityToDto(result);
	}
}
