// package com.seegene.main.domain.project.service;
//
// import java.time.LocalDate;
// import java.util.ArrayList;
// import java.util.List;
//
// import com.seegene.main.domain.project.entity.TpjPrj;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.data.domain.PageRequest;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.test.context.ActiveProfiles;
//
// import com.seegene.main.domain.project.constant.ProjectManagerYn;
// import com.seegene.main.domain.project.dto.DiseaseCategoryListResponse;
// import com.seegene.main.domain.project.dto.ProjectCreateRequest;
// import com.seegene.main.domain.project.dto.ProjectCreateResponse;
// import com.seegene.main.domain.project.dto.ProjectInfoResponse;
// import com.seegene.main.domain.project.dto.ProjectProcessListResponse;
// import com.seegene.main.domain.project.dto.ProjectPurposeListResponse;
// import com.seegene.main.domain.project.repository.TpjPrjRepository;
// import com.seegene.main.domain.user.entity.TusUsr;
// import com.seegene.main.domain.user.repository.TusUsrRepository;
// import com.seegene.main.global.auth.PlatformUserDetails;
//
// import jakarta.transaction.Transactional;
// import static org.assertj.core.api.Assertions.assertThat;
//
// @SpringBootTest
// @Transactional
// @ActiveProfiles("local")
// class ProjectServiceTest {
// 	@Autowired
// 	ProjectService projectService;
// 	@Autowired
// 	TusUsrRepository tusUsrRepository;
// 	@Autowired
// 	TpjPrjRepository tpjPrjRepository;
// 	static String LANG_CD = "en";
//
// 	PlatformUserDetails userDetails;
//
// 	@BeforeEach
// 	void setup(){
// 		TusUsr tusUsr = tusUsrRepository.findByEmlId("seegene1@seegene.com").orElseGet(() -> null);
// 		userDetails = new PlatformUserDetails();
// 		userDetails.setUsrUid(tusUsr.getId());
// 		SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(userDetails, null, null));
// 	}
//
// 	@Test
// 	@DisplayName("[IFM045]프로젝트 카테고리 목록 조회")
// 	void getProjectCategoryListTest(){
// 		List<DiseaseCategoryListResponse> resultList = projectService.getProjectCategoryList(LANG_CD);
// 		assertThat(resultList).isNotEmpty();
// 	}
//
// 	@Test
// 	@DisplayName("[IFM046]프로젝트 개발 목적 목록 조회")
// 	void getProjectPurposeLisTest(){
// 		List<ProjectPurposeListResponse> responses = projectService.getProjectPurposeList(LANG_CD);
// 		assertThat(responses).isNotEmpty();
// 	}
//
// 	@Test
// 	@DisplayName("[IFM047]프로젝트 process 목록 조회")
// 	void getProjectProcessListTest(){
// 		List<ProjectProcessListResponse> responses = projectService.getProjectProcessList();
// 		assertThat(responses).isNotEmpty();
// 	}
//
// 	@Test
// 	@DisplayName("[IFM048]프로젝트 등록")
// 	void createProjectTest(){
// 		String userId = userDetails.getUsrUid();
//
// 		List<ProjectCreateRequest.ProjectCreateMemberRequest> members = new ArrayList<>();
// 		ProjectCreateRequest.ProjectCreateMemberRequest memberRequest1
// 			= ProjectCreateRequest.ProjectCreateMemberRequest.builder()
// 			.memberId(userId)
// 			.projectManagerYn(ProjectManagerYn.Y)
// 			.build()
// 			;
//
// 		members.add(memberRequest1);
//
// 		TusUsr tusUsr = tusUsrRepository.findAll().get(0);
//
// 		ProjectCreateRequest.ProjectCreateMemberRequest memberRequest2
// 			= ProjectCreateRequest.ProjectCreateMemberRequest.builder()
// 			.memberId(tusUsr.getId())
// 			.projectManagerYn(ProjectManagerYn.N)
// 			.build()
// 			;
//
// 		List<ProjectCreateRequest.ProjectCreateMemberRequest.ProjectCreateMemberProcessRequest> memberProcess = new ArrayList<>();
// 		ProjectCreateRequest.ProjectCreateMemberRequest.ProjectCreateMemberProcessRequest memberProces =
// 			ProjectCreateRequest.ProjectCreateMemberRequest.ProjectCreateMemberProcessRequest.builder()
// 				.processCodes(List.of("FOUP", "FSBT", "OLDS", "OLDS"))
// 				.processRoleCode("PCM")
// 				.build();
// 		memberProcess.add(memberProces);
// 		memberRequest2.setMemberProcess(memberProcess);
// 		members.add(memberRequest2);
//
// 		ProjectCreateRequest request
// 			= ProjectCreateRequest.builder()
// 				// .diseaseCategoryCode("DR")
// 				// .startDate(LocalDate.now())
// 				// .endDate(LocalDate.now())
// 				// .projectName("CREATE TEST")
// 				// .projectMemo("CREATE TEST")
// 				// .projectPurposeCode("DP01")
// 				// .productName("anyflex assay pack")
// 				// .taskCode("100-10000")
// 				.processCodes(List.of("FOUP", "FSBT", "OLDS", "OLDS"))
// 				.members(members)
// 				.build()
// 			;
//
// 		ProjectCreateResponse response = projectService.createProject(request, userDetails);
// 		assertThat(response).isNotNull();
// 	}
//
// 	@Test
// 	@DisplayName("[IFM050]프로젝트 삭제")
// 	void deleteProjectTest(){
// 		TpjPrj tpjPrj = tpjPrjRepository.findByDelYn("N", PageRequest.of(0,1)).getContent().get(0);
// 		projectService.deleteProject(tpjPrj.getId());
// 		TpjPrj checkTpjPrj = tpjPrjRepository.findById(tpjPrj.getId()).orElseGet(()->null);
// 		assertThat(checkTpjPrj.getDelYn()).isEqualTo("Y");
// 	}
//
// 	@Test
// 	@DisplayName("[IFM053]프로젝트 정보 조회")
// 	void getProjectInfoTest(){
// 		TpjPrj tpjPrj = tpjPrjRepository.findByDelYn("N", PageRequest.of(0,1)).getContent().get(0);
// 		ProjectInfoResponse response = projectService.getProjectInfo(tpjPrj.getId(), LANG_CD);
// 		assertThat(response).isNotNull();
// 	}
// }
