package com.seegene.main.domain.databox.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;

import com.seegene.main.domain.databox.dto.DataboxManualsDetailResponse;
import com.seegene.main.domain.databox.dto.DataboxManualsResponse;

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
 *   1 2023-08-01        khhong        최초작성
 * </PRE>
 */
public interface TbdLibrAtchRepositoryCustom {

	Optional<List<DataboxManualsResponse>> findAllDataboxManuals(Pageable pageable);
	Optional<List<DataboxManualsDetailResponse>> findAllDataboxManualsList(Long librCatNum, LocalDateTime startDate, LocalDateTime endDate, String type, String keyword, Pageable pageable);
}
