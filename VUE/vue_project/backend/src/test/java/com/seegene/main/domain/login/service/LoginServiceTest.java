// package com.seegene.main.domain.login.service;
//
// import static org.junit.jupiter.api.Assertions.*;
//
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.MockitoAnnotations;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.context.ActiveProfiles;
// import org.springframework.transaction.annotation.Transactional;
//
// import com.seegene.main.domain.login.dto.LoginApprovalResponse;
// import com.seegene.main.domain.user.repository.TusUsrRepository;
// import com.seegene.main.global.exception.EntityNotFoundException;
//
// /**
//  * LoginServiceTest
//  * <PRE>
//  * </PRE>
//  * @author   : @mz.co.kr
//  *
//  * @History
//  * <PRE>
//  * No  Date           Author            Desc
//  *---- ------------ ---------------- ------------------------------------
//  *   1                 최초작성
//  * </PRE>
//  */
// @ActiveProfiles("local")
// @SpringBootTest
// @Transactional(readOnly = true)
// class LoginServiceTest {
//
// 	@Autowired
// 	private TusUsrRepository tusUsrRepository;
//
// 	@InjectMocks
// 	@Autowired
// 	private LoginService loginService;
//
//
// 	@BeforeEach
// 	public void setUp() {
// 		MockitoAnnotations.initMocks(this);
// 	}
//
// 	@Test
// 	@DisplayName("[IFM109] 로그인 승인여부 조회")
// 	void testGetLoginApproval() {
// 		// given
// 		LoginApprovalResponse testValue = LoginApprovalResponse.builder()
// 			.emailId("tttset@mz.co.kr")
// 			.userUid("0001")
// 			.corporateNumber("1")
// 			.userName("홍길동")
// 			.organizationName("개발팀")
// 			.jobTitle("시약개발자")
// 			.profileFileNumber("1")
// 			.joinTypeCode("SLF")
// 			.countryCode("1")
// 			.languageCode("025")
// 			.userStatusCode("NRM")
// 			.otpAuthYn("N")
// 			.emailAuthYn("N")
// 			.crtrUid("002")
// 			.crtDt("2023-07-20 08:56:48")
// 			.mdfrUid("002")
// 			.mdfDt("2023-07-20 08:56:55")
// 			.build();
// 		// when
// 		LoginApprovalResponse tusUsr = tusUsrRepository.findByTusUsrSts(testValue.getEmailId()).orElseThrow(() -> new EntityNotFoundException());
//
// 		// then
// 		assertNotNull(tusUsr.getEmailId());
// 		assertEquals(testValue.getUserUid(), tusUsr.getUserUid());
// 	}
// }