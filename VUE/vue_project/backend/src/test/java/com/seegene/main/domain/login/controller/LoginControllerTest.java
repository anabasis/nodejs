// package com.seegene.main.domain.login.controller;
//
// import static org.springframework.http.HttpHeaders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.http.MediaType;
// import org.springframework.test.context.ActiveProfiles;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
// import org.springframework.util.LinkedMultiValueMap;
// import org.springframework.util.MultiValueMap;
//
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.seegene.main.TokenUtils;
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
//  *   1 2023-08-17        khhong        최초작성
//  * </PRE>
//  */
// @AutoConfigureMockMvc
// @SpringBootTest
// @ActiveProfiles("local")
// public class LoginControllerTest {
//
// 	private String token = "";
//
// 	@Autowired
// 	MockMvc mockMvc;
//
// 	@Autowired
// 	ObjectMapper objectMapper;
//
// 	@BeforeEach
// 	public void init() {
// 		token = TokenUtils.getToken();
// 	}
//
// 	@Test
// 	@DisplayName("[IFM109] 로그인 승인여부 조회")
// 	void testGetLoginApproval() throws Exception {
//
// 		//given
// 		MultiValueMap<String, String> info = new LinkedMultiValueMap<>();
// 		info.add("emailId", "seegene1@seegene.com");
//
// 		//when
// 		//then
// 		mockMvc.perform(
// 			MockMvcRequestBuilders.get("/login/login-approval")
// 				.accept(MediaType.APPLICATION_JSON)
// 				.header(AUTHORIZATION, token)
// 				.queryParams(info))
// 			.andDo(print())
// 			.andExpect(status().isOk());
//
// 	}
// }
