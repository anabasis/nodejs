package com.seegene.main.domain.search.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seegene.main.domain.search.dto.SearchListResponse;
import com.seegene.main.domain.search.service.SearchService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : mistersoh@naver.com
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-06-29        mistersoh        최초작성
 * </PRE>
 */
@Tag(name="search", description = "Search API")
@RequestMapping("/search")
@RequiredArgsConstructor
@RestController
public class SearchController {
	private final SearchService searchService;

	@Operation(summary = "[IFM043]통합 검색 목록 조회", description = "통합 검색 목록을 조회한다.")
	@GetMapping("/keyword/list")
	@Parameter(name = "keyword", description = "검색어", example = "all-flex")
	public SearchListResponse getAllKeyWordSearchList(@RequestParam String keyword) {
		return searchService.getAllKeyWordSearchList(keyword);
	}
/*
	미사용 대상으로 주석처리함

	@Operation(summary = "[IFM016] 통합 검색(프로젝트 목록) 조회", description = "통합 검색결과 프로젝트 목록을 조회한다.")
	@GetMapping("/keywordsearch/proejct-result/list")
	public List<SearchDto> getAllKeyWordSearchProjectTypeList(@RequestParam String keyword) {
		return searchService.getAllKeyWordSearchProjectTypeList(keyword);
	}

	@Operation(summary = "[IFM017] 통합 검색(리퀘스트 목록) 조회", description = "통합 검색결과 리퀘스트 목록을 조회한다.")
	@GetMapping("/keywordsearch/request-result/list")
	public List<SearchDto> getAllKeyWordSearchRequestTypeList(@RequestParam String keyword) {
		return searchService.getAllKeyWordSearchRequestTypeList(keyword);
	}
*/
}
