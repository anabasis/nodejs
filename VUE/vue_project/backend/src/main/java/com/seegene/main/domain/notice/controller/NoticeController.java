package com.seegene.main.domain.notice.controller;

import com.seegene.main.domain.notice.contant.NoticeKeywordTab;
import com.seegene.main.domain.notice.dto.NoticeDetailResponse;
import com.seegene.main.domain.notice.dto.NoticeGetResponse;
import com.seegene.main.domain.notice.service.NoticeService;
import com.seegene.main.global.auth.PlatformUserInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

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

@Tag(name="notice", description = "Notice API / 담당자:서원우")
@RequestMapping("/notice")
@RequiredArgsConstructor
@RestController
public class NoticeController {
	private final NoticeService noticeService;
	@Operation(summary = "[IFM106]공지사항 전체 조회 [9/15 완료]", description = "공지사항 전체 목록을 조회한다. (keywordTab : Title - 제목 / Content - 본문)")
	@GetMapping("/list")
	@Parameter(name = "page", description = "조회 대상 페이지", example = "0", required = true)
	@Parameter(name = "size", description = "조회 대상 건수", example = "20", required = true)
	public Page<NoticeGetResponse> getNoticeList(
			@Parameter(description = "검색 시작 기간", example = "2023-08-01 00:00:00") @RequestParam(value = "startDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
			LocalDateTime startDate,
			@Parameter(description = "검색 종료 기간", example = "2023-08-30 23:59:59") @RequestParam(value = "endDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
			LocalDateTime endDate,
			@Parameter(description = "검색 키워드 종류", example= "Title") @RequestParam(value = "keywordTab", required = false)
			NoticeKeywordTab keywordTab,
			@Parameter(description = "검색 키워드", example= "키워드") @RequestParam(value = "keyword", required = false)
			String keyword,
			PlatformUserInfo user,
			@Parameter(name = "pageable", hidden = true) Pageable pageable) {
		return noticeService.getNoticeList(startDate, endDate, keywordTab, keyword, user.getLangCode(),
			user.getUsrUid(), pageable);
	}


	@Operation(summary = "[IFM107]공지사항 단건 조회 [9/15 완료]", description = "해당 공지사항의 상세 내용을 조회한다.")
	@GetMapping("/{noticeId}/detail")
	public NoticeDetailResponse getNoticeDetail(
			@Parameter(description = "공지사항ID", example= "1", required = true) @PathVariable("noticeId")
			Long noticeNum,

			PlatformUserInfo user
		) {
		return noticeService.getNoticeDetail(noticeNum, user.getLangCode(), user.getUsrUid());
	}

}