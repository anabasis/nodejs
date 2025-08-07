package com.seegene.main.domain.notice.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import com.seegene.main.domain.notice.contant.NoticeKeywordTab;
import com.seegene.main.domain.notice.dto.NoticeGetResponse;
import com.seegene.main.domain.notice.service.NoticeService;
import com.seegene.main.domain.project.controller.ProjectController;
import com.seegene.main.domain.project.service.ProjectService;
import com.seegene.main.global.auth.JwtProvider;
import com.seegene.main.global.auth.PlatformUserConverter;
import com.seegene.main.global.config.WebConfig;
import com.seegene.main.global.config.annotation.WithMockCustomUser;
import com.seegene.main.global.convert.DefaultDateTimeConverter;
import com.seegene.main.global.interceptor.PlatformInterceptor;

@WebMvcTest(controllers = {NoticeController.class}, //테스트하고자 하는 Controller class 입력
	excludeFilters = {
		@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {
			WebConfig.class,
			PlatformInterceptor.class,
			JwtProvider.class,
			PlatformUserConverter.class
		})
	})
@DisplayName("공지사항 테스트")
@ActiveProfiles("test")
public class NoticeControllerTest {


	@Autowired
	private MockMvc mockMvc;
	@MockBean
	NoticeService noticeService;

	@WithMockCustomUser
	@ParameterizedTest
	@CsvSource({
		"2023-01-01 00:00:00, 2023-12-31 12:00:00, Title, qw, userUid, ko, 0, 20"
	})
	@DisplayName("[IFM106]공지사항 전체 조회")
	void getNoticeListTest(String startDate, String endDate, String keywordTab, String keyword, String userLanguageCode, String userUid, Integer page, Integer size) throws Exception {

		LocalDateTime parsedStartDate = DefaultDateTimeConverter.convertDateTime(startDate);
		LocalDateTime parsedEndDate = DefaultDateTimeConverter.convertDateTime(endDate);
		NoticeKeywordTab parsedKeywordTab = NoticeKeywordTab.valueOf(keywordTab);
		Pageable pageable = PageRequest.of(page, size);

		//given
		BDDMockito.when(noticeService.getNoticeList(parsedStartDate, parsedEndDate, parsedKeywordTab, keyword, userLanguageCode, userUid, pageable))
			.thenReturn(getNoticeGetResponse(page, size));

		mockMvc
			.perform(MockMvcRequestBuilders.get("/notice/list")
			.param("startDate", startDate)
			.param("endDate", endDate)
			.param("keywordTab", keywordTab)
			.param("keyword", keyword)
			.param("userLanguageCode", userLanguageCode)
			.param("userUid", userUid)
			.param("page", "0")  // Set the page parameter here
			.param("size", "20"))
			.andExpect(status().isOk())
			.andDo(MockMvcResultHandlers.print())
			.andReturn();
	}


	private static Page<NoticeGetResponse> getNoticeGetResponse(Integer page, Integer size) {
		Pageable pageable = PageRequest.of(page, size);
		List<NoticeGetResponse> responses = new ArrayList<>();
		responses.add(NoticeGetResponse.builder()
			.ntcNum(1L)
			.ntcTpCd("NTN")
			.ntcCatCd("SVG")
			.titl("Sample Title")
			.usrNm("Sample User")
			.crtDt(LocalDateTime.of(2023, 8, 30, 12, 0, 0))
			.build());

		Page<NoticeGetResponse> pages = new PageImpl<>(responses, pageable, 1);
		return pages;
	}

}
