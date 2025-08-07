// package com.seegene.main.domain.databox.controller;
//
// import static org.hamcrest.Matchers.*;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
// import java.util.ArrayList;
// import java.util.List;
//
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.mockito.BDDMockito;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.data.domain.Pageable;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.test.context.ActiveProfiles;
// import org.springframework.test.web.servlet.MockMvc;
//
// import com.seegene.main.domain.databox.dto.DataboxManualsResponse;
// import com.seegene.main.domain.databox.service.DataboxService;
// import com.seegene.main.domain.user.entity.TusUsr;
// import com.seegene.main.domain.user.repository.TusUsrRepository;
// import com.seegene.main.global.auth.PlatformUserDetails;
//
// /**
//  * class 한글 설명
//  * <PRE>
//  * </PRE>
//  * @author   : khhong@mz.co.kr
//  *
//  * @History
//  * <PRE>
//  * No  Date           Author            Desc
//  *---- ------------ ---------------- ------------------------------------
//  *   1 2023-08-11        khhong        최초작성
//  * </PRE>
//  */
// @SpringBootTest
// @AutoConfigureMockMvc
// @ActiveProfiles("local")
// public class DataboxControllerTest {
//
// 	@Autowired
// 	MockMvc mvc;
//
// 	@MockBean
// 	DataboxService databoxService;
//
// 	@Autowired
// 	TusUsrRepository tusUsrRepository;
//
// 	@Autowired
// 	PlatformUserDetails userDetails;
//
// 	@BeforeEach
// 	void setup(){
// 		userDetails = new PlatformUserDetails();
// 		// userDetails.setUsrUid(tusUsrRepository.findByEmlId("seegene1@seegene.com").map(TusUsr::getUsrUid).orElseGet(()->null));
// 		userDetails.setAddress("127.0.0.1");
// 		userDetails.setCity("Seoul");
// 		userDetails.setCountry("KR");
// 		userDetails.setTimeZone("Asia/Seoul");
//
// 		SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(userDetails, null, null));
// 	}
//
// 	@Test
// 	@DisplayName("[IFM090] 자료실 전체 목록 조회")
// 	void getDataboxManualsTest() throws Exception {
//
// 		List<DataboxManualsResponse> listResponses = new ArrayList<>();
// 		listResponses.add(new DataboxManualsResponse());
// 		Pageable.ofSize(0);
//
// 		// BDDMockito.given(databoxService.getDataboxManuals(Pageable.ofSize(3))).willReturn(listResponses);
//
// 		mvc.perform(get("/project/category/list").param("langCd", "en"))
// 			.andExpect(status().isOk())
// 			.andExpect(jsonPath("$", hasSize(5)))
// 			.andDo(print());
//
// 	}
// }
