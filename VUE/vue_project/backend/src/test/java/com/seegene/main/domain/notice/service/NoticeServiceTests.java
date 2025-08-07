// package com.seegene.main.domain.notice;
//
// import static org.junit.jupiter.api.Assertions.*;
//
// import java.time.LocalDate;
// import java.time.LocalDateTime;
//
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.data.domain.PageRequest;
// import org.springframework.data.domain.Pageable;
// import org.springframework.test.context.ActiveProfiles;
//
// import com.seegene.main.domain.notice.service.NoticeService;
//
// import jakarta.transaction.Transactional;
//
// @SpringBootTest(webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT)
// @Transactional
// @ActiveProfiles("local")
// class NoticeServiceTests {
//
// 	@Autowired
// 	private NoticeService noticeService;
//
// 	// @Test
// 	// void getNoticeListTest(){
// 	//
// 	// 	//condition
// 	// 	LocalDateTime startDate = LocalDateTime.of(2023,01,01,00,00,00);
// 	// 	LocalDateTime endDate = LocalDateTime.of(2023,12,31,00,00,00);
// 	// 	String noticeCategoryTab = "SVG";
// 	// 	String keyword = "";
// 	// 	String noticeLanguageCode = "1";
// 	// 	String noticeOpenLevelCode = "PUB";
// 	//
// 	// 	Pageable pageable = PageRequest.of(0,20);
// 	//
// 	// 	assertEquals("SVG", noticeService.getNoticeList(startDate,
// 	// 		endDate,
// 	// 		noticeCategoryTab,
// 	// 		keyword,
// 	// 		noticeLanguageCode,
// 	// 		noticeOpenLevelCode, pageable).getContent().get(0).getNoticeCategory());
// 	//
// 	// }
//
// 	// @Test
// 	// @Transactional
// 	// void getNoticeDetailTest(){
// 	// 	//condition
// 	// 	Integer noticeId = 4;
// 	//
// 	// 	assertEquals("NTN", noticeService.getNoticeDetail(noticeId).getNoticeType());
// 	// }
// }
