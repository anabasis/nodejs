package com.seegene.main.domain.software.controller;

import com.seegene.main.domain.software.dto.SoftwareDetailResponse;
import com.seegene.main.domain.software.dto.SoftwareListResponse;
import com.seegene.main.domain.software.dto.SoftwareReleaseDetailResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.seegene.main.domain.software.service.SoftwareService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

/**
 * SoftwareController
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
@Tag(name="software", description = "소프트웨어 API 담당자 : 곽호원")
@RequestMapping("/software")
@RequiredArgsConstructor
@RestController
public class SoftwareController {

	private final SoftwareService softwareService;

	@Parameter(name = "page", description = "조회 대상 페이지", example = "0", required = true)
	@Parameter(name = "size", description = "조회 대상 건수", example = "8")
	@Parameter(name = "sort", description = "정렬", example = "crtDt,desc")
	@Operation(summary = "[IFM093] 소프트웨어 목록 조회", description = "소프트웨어 목록을 조회한다.")
	@GetMapping(path = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
	public Page<SoftwareListResponse> getSoftwareList (
			@RequestParam(value = "startDate", required = false)
			@Schema(description = "기간시작일", example = "2023-01-01 00:00:00")
			@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
			LocalDateTime startDate,
			@RequestParam(value = "endDate", required = false)
			@Schema(description = "기간종료일", example = "2024-01-01 00:00:00")
			@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
			LocalDateTime endDate,
			@Parameter(description = "IVD/RUO 필터", example= "IVD")
			@RequestParam(value = "ivdRuoCode", required = false)
			String ivdRuo,
			@RequestParam(value = "keywordName", defaultValue = "CodeGroupName")
			@Schema(description = "AppName/Description/ReleaseNote", example = "AppName")
			String keywordName,
			@Parameter(description = "키워드") @RequestParam(value = "keyword", required = false)
			String keyword,
			@Parameter(name = "pageable", hidden = true) Pageable pageable
	) {
		return softwareService.getSoftwareList(pageable, startDate, endDate, ivdRuo, keywordName, keyword);
	}

	@Operation(summary = "[IFM094]소프트웨어 상세 조회", description = "소프트웨어 상세 조회 한다.")
	@GetMapping(path = "/{softwareNumber}/detail", produces = MediaType.APPLICATION_JSON_VALUE)
	public SoftwareDetailResponse getSoftwareDetail (
			@Parameter(required = true, name = "softwareNumber", description = "소프트웨어 고유번호", example= "11004")
			@PathVariable long softwareNumber
	) {
		return softwareService.getSoftwareDetail(softwareNumber);
	}

	@Parameter(name = "page", description = "조회 대상 페이지", example = "0", required = true)
	@Parameter(name = "size", description = "조회 대상 건수 (피그마 상 5개)", example = "5")
	@Parameter(name = "sort", description = "정렬 (crtDt,desc|ver,desc)", example = "crtDt,desc")
	@Operation(summary = "[IFM095] 소프트웨어 상세 조회-버전 히스토리", description = "소프트웨어 상세의 버전 히스토리를 조회한다.")
	@GetMapping(path = "/{softwareNumber}/history/list", produces = MediaType.APPLICATION_JSON_VALUE)
	public Page<SoftwareReleaseDetailResponse> getSoftwareDetailVersionHistory (
			@Parameter(required = true, name = "softwareNumber", description = "소프트웨어 고유번호", example= "11004")
			@PathVariable long softwareNumber,
			@Parameter(name = "pageable", hidden = true) Pageable pageable
	) {
		return softwareService.getSoftwareDetailVersionHistory(softwareNumber, pageable);
	}

	@Operation(summary = "[IFM096] 소프트웨어 상세 버전 조회", description = "소프트웨어 상세 버전을 조회한다.")
	@GetMapping(path = "/version/{ReleaseNumber}/detail", produces = MediaType.APPLICATION_JSON_VALUE)
	public SoftwareReleaseDetailResponse getSoftwareManagementDetailVersion (
			@Parameter(required = true, name = "ReleaseNumber", description = "소프트웨어 릴리즈 고유번호", example= "10022")
			@PathVariable Long ReleaseNumber
	) {
		return softwareService.getSoftwareVersionDetail(ReleaseNumber);
	}
}
