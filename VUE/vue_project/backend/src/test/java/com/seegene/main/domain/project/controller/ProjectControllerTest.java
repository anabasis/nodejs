package com.seegene.main.domain.project.controller;


import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.seegene.main.domain.project.constant.ProjectManagerYn;
import com.seegene.main.domain.project.dto.DiseaseCategoryListResponse;
import com.seegene.main.domain.project.dto.ProjectCreateRequest;
import com.seegene.main.domain.project.dto.ProjectCreateResponse;
import com.seegene.main.domain.project.dto.ProjectInfoResponse;
import com.seegene.main.domain.project.dto.ProjectProcessListResponse;
import com.seegene.main.domain.project.dto.ProjectPurposeListResponse;
import com.seegene.main.domain.project.repository.TpjPrjRepository;
import com.seegene.main.domain.project.service.ProjectService;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.domain.user.repository.TusUsrRepository;
import com.seegene.main.global.auth.JwtProvider;
import com.seegene.main.global.auth.PlatformUserConverter;
import com.seegene.main.global.config.WebConfig;
import com.seegene.main.global.config.annotation.WithMockCustomUser;
import com.seegene.main.global.interceptor.PlatformInterceptor;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@WebMvcTest(controllers = {ProjectController.class}, //테스트하고자 하는 Controller class 입력
	excludeFilters = {
		@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {
			WebConfig.class,
			PlatformInterceptor.class,
			JwtProvider.class,
			PlatformUserConverter.class
		})
	})
@DisplayName("프로젝트 테스트")
@ActiveProfiles("test")
class ProjectControllerTest {

	@Autowired
	private MockMvc mockMvc;
	@MockBean
	ProjectService projectService;

	@WithMockCustomUser
	@ParameterizedTest
	@ValueSource(strings = {""})

	// @BeforeEach
	// void setup(){
	// 	userDetails = new PlatformUserDetails();
	// 	userDetails.setUsrUid(tusUsrRepository.findByEmlId("seegene1@seegene.com")
	// 		.map(
	// 			TusUsr::getId).orElseGet(()->null));
	// 	SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(userDetails, null, null));
	// }

	@Test
	@DisplayName("IFM045]프로젝트 카테고리 목록 조회")
	void getProjectCategoryListTest() throws Exception {

		// List<DiseaseCategoryListResponse> listResponses = new ArrayList<>();
		// for(int i=0; i<5; i++){
		// 	listResponses.add(new DiseaseCategoryListResponse("RP " +i, "RP " +i));
		// }
		//
		// BDDMockito.given(projectService.getProjectCategoryList("en")).willReturn(listResponses);
		//
		// mvc.perform(get("/project/category/list").param("langCd", "en"))
		// 	.andExpect(status().isOk())
		// 	.andExpect(jsonPath("$", hasSize(5)))
		// 	.andDo(print());
	}
	//
	// @Test
	// @DisplayName("[IFM047]프로젝트 process 목록 조회")
	// void getProjectProcessListTest() throws Exception {
	// 	List<ProjectProcessListResponse> listResponses = new ArrayList<>();
	// 	for(int i=0; i<5; i++){
	// 		listResponses.add(new ProjectProcessListResponse("Process0" +i, "Process0" +i, (long) i));
	// 	}
	//
	// 	BDDMockito.given(projectService.getProjectProcessList()).willReturn(listResponses);
	//
	// 	mvc.perform(get("/project/process/list"))
	// 		.andExpect(status().isOk())
	// 		.andExpect(jsonPath("$", hasSize(5)))
	// 		.andDo(print());
	// }
	//
	// @Test
	// @DisplayName("[IFM046]프로젝트 개발 목적 목록 조회")
	// void getProjectPurposeListTest() throws Exception {
	//
	// 	List<ProjectPurposeListResponse> listResponses = new ArrayList<>();
	// 	for(int i=0; i<5; i++){
	// 		listResponses.add(new ProjectPurposeListResponse("DP0" +i, "DP0" +i));
	// 	}
	//
	// 	BDDMockito.given(projectService.getProjectPurposeList("en")).willReturn(listResponses);
	//
	// 	mvc.perform(get("/project/purpose/list").param("langCd", "en"))
	// 		.andExpect(status().isOk())
	// 		.andExpect(jsonPath("$", hasSize(5)))
	// 		.andDo(print());
	// }
	//
	// @Test
	// @DisplayName("[IFM048]프로젝트 등록")
	// void createProjectTest() throws Exception {
	//
	// 	String userId = userDetails.getUsrUid();
	//
	// 	List<ProjectCreateRequest.ProjectCreateMemberRequest> members = new ArrayList<>();
	// 	ProjectCreateRequest.ProjectCreateMemberRequest memberRequest1
	// 		= ProjectCreateRequest.ProjectCreateMemberRequest.builder()
	// 		.memberId(userId)
	// 		.projectManagerYn(ProjectManagerYn.Y)
	// 		.build()
	// 		;
	//
	// 	members.add(memberRequest1);
	//
	// 	TusUsr tusUsr = tusUsrRepository.findAll().get(0);
	//
	// 	ProjectCreateRequest.ProjectCreateMemberRequest memberRequest2
	// 		= ProjectCreateRequest.ProjectCreateMemberRequest.builder()
	// 		.memberId(tusUsr.getId())
	// 		.projectManagerYn(ProjectManagerYn.N)
	// 		.build()
	// 		;
	//
	// 	List<ProjectCreateRequest.ProjectCreateMemberRequest.ProjectCreateMemberProcessRequest> memberProcess = new ArrayList<>();
	// 	ProjectCreateRequest.ProjectCreateMemberRequest.ProjectCreateMemberProcessRequest memberProces =
	// 		ProjectCreateRequest.ProjectCreateMemberRequest.ProjectCreateMemberProcessRequest.builder()
	// 			.processCodes(List.of("FOUP", "FSBT", "OLDS", "OLDS"))
	// 			.processRoleCode("PCD")
	// 			.build();
	// 	memberProcess.add(memberProces);
	// 	memberRequest2.setMemberProcess(memberProcess);
	// 	members.add(memberRequest2);
	//
	// 	ProjectCreateRequest request
	// 		= ProjectCreateRequest.builder()
	// 		// .diseaseCategoryCode("DR")
	// 		// .startDate(LocalDate.now())
	// 		// .endDate(LocalDate.now())
	// 		// .projectName("CREATE TEST")
	// 		// .projectMemo("CREATE TEST")
	// 		// .projectPurposeCode("DP01")
	// 		// .productName("anyflex assay pack")
	// 		// .taskCode("100-10000")
	// 		.processCodes(List.of("FOUP", "FSBT", "OLDS", "OLDS"))
	// 		.members(members)
	// 		.build()
	// 		;
	//
	// 	ProjectCreateResponse response = ProjectCreateResponse.builder()
	// 		.id(100L)
	// 		.build();
	//
	//
	// 	BDDMockito.given(projectService.createProject(request, userDetails)).willReturn(response);
	//
	// 	ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());
	//
	// 	mvc.perform(post("/project/add")
	// 			.contentType(MediaType.APPLICATION_JSON)
	// 			.content(mapper.writeValueAsString(request)))
	// 		.andExpect(status().isOk())
	// 		//.andExpect(jsonPath("projectId").value(100L))
	// 		.andDo(print())
	// 		.andReturn();
	// }
	//
	// @Test
	// @DisplayName("[IFM050]프로젝트 삭제")
	// void deleteProjectTest() throws Exception {
	// 	mvc.perform(post("/project/{projectId}/delete", 1))
	// 		.andExpect(status().isOk())
	// 		.andDo(print())
	// 		.andReturn();
	// }
	//
	// @Test
	// @DisplayName("[IFM053]프로젝트 정보 조회")
	// void getProjectInfoTest() throws Exception {
	//
	// 	ProjectInfoResponse response = ProjectInfoResponse.builder().id(1L).build();
	//
	// 	BDDMockito.given(projectService.getProjectInfo(1L,userDetails)).willReturn(response);
	//
	// 	mvc.perform(get("/project/{projectId}/project-info", 1L).param("langCd", "en"))
	// 		.andExpect(status().isOk())
	// 		.andExpect(jsonPath("projectId").value(1L))
	// 		.andDo(print())
	// 		.andReturn();
	// }
}
