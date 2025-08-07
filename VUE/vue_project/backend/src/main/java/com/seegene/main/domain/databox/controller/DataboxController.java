package com.seegene.main.domain.databox.controller;

import com.seegene.main.domain.databox.dto.DataboxManualsDetailResponse;
import com.seegene.main.domain.databox.dto.DataboxManualsResponse;
import com.seegene.main.domain.databox.service.DataboxService;
import com.seegene.main.global.auth.PlatformUserInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

/**
 * DataboxController
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
@Tag(name="databox", description = "자료실 API")
@RequestMapping("/databox")
@RequiredArgsConstructor
@RestController
public class DataboxController {

	private final DataboxService databoxService;

	@Parameter(name = "page", description = "조회 대상 페이지", example = "0", required = true)
	@Parameter(name = "size", description = "조회 대상 건수", example = "20")
	@Parameter(name = "sort", description = "정렬", example = "crtDt,desc|mdfDt,desc|sortNum,desc")
	@Operation(summary = "[IFM090] 자료실 전체 목록 조회, API 담당자: 홍기환, [완료] + 피그마 대응 현행화", description = "자료실 전체 목록을 조회한다.")
	@GetMapping("/manuals")
	public Page<DataboxManualsResponse> getDataboxManuals(@Parameter(name = "pageable", hidden = true) Pageable pageable){
		return databoxService.getDataboxManuals(pageable);
	}

	@Parameter(name = "page", description = "조회 대상 페이지", example = "0", required = true)
	@Parameter(name = "size", description = "조회 대상 건수", example = "20")
	@Parameter(name = "sort", description = "정렬", example = "crtDt,desc|mdfDt,desc|librNum,desc")
	@Operation(summary = "[IFM091] 자료실 리스트 전체 목록 조회, API 담당자: 홍기환, [완료] + 피그마 대응 현행화", description = "자료실 리스트 전체 목록을 조회한다.")
	@GetMapping("/manuals-list")
	public Page<DataboxManualsDetailResponse> getDataboxManualsList(@Schema(description = "자료실 메뉴얼 아이디", example = "1001") @RequestParam Long manualsId,
		@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") @Schema(description = "기간 시작일 (yyyy-MM-dd HH:mm:ss)", example = "2022-01-01 00:00:00") @RequestParam(name = "startDate", required = false) LocalDateTime startDate,
		@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") @Schema(description = "기간 종료일 (yyyy-MM-dd HH:mm:ss)", example = "2023-12-31 23:59:59") @RequestParam( name = "endDate", required = false) LocalDateTime endDate,
		@RequestParam(required = false, defaultValue = "") @Schema(description = "Type(title or cont)", example = "") String type,
		@RequestParam(required = false, defaultValue = "") @Schema(description = "Keyword(자료이름, 본문이름 검색)", example = "") String keyword,
		@Parameter(name = "pageable", hidden = true) Pageable pageable) {
		return databoxService.getDataboxManualsList(manualsId, startDate, endDate, type, keyword, pageable);
	}

	@Operation(summary = "[IFM092] 자료실 리스트 상세 정보 조회, API 담당자: 홍기환, [완료]", description = "자료실 리스트 상세 항목을 조회한다.")
	@GetMapping("/manuals-list/detail")
	public DataboxManualsDetailResponse getDataboxManualsListDetail(PlatformUserInfo user, @Schema(description = "자료실 리스트 아이디", example = "1") @RequestParam Long manualsDetailId) {
		return databoxService.getDataboxManualsListDetail(user, manualsDetailId);
	}
}
