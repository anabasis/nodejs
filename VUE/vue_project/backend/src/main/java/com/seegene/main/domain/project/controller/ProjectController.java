package com.seegene.main.domain.project.controller;

import com.seegene.main.domain.project.constant.ProjectPlanningDocumentStatusTab;
import com.seegene.main.domain.project.constant.ProjectPlanningDocumentTypeTab;
import com.seegene.main.domain.project.constant.ProjectTab;
import com.seegene.main.domain.project.dto.*;
import com.seegene.main.domain.project.service.ProjectService;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.config.annotation.CurrentUser;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


/**
 * Project controller
 * <PRE>
 * </PRE>
 *
 * @author : khhong@mz.co.kr
 * @History <PRE>
 * No  Date           Author            Desc
 * ---- ------------ ---------------- ------------------------------------
 * 1 2023-06-29        khhong        최초작성
 * </PRE>
 */
@RestController
@RequestMapping(path = "/project")
@RequiredArgsConstructor
@Tag(name = "ProjectController", description = "프로젝트 API"

)
public class ProjectController {

    private final ProjectService projectService;

    /**
     * @param projectTab
     * @param startDate
     * @param endDate
     * @param diseaseCategoryCode
     * @param purposeCode
     * @param processCode
     * @param keyword
     * @param details
     * @param pageable
     * @return
     */
    @GetMapping(path = "/list")
    @Operation(summary = "프로젝트 리스트 조회 / 담당자 : 정준영 [완료] 08/25", description = "프로젝트 리스트를 조회한다.")
//    @Parameter(name = "startDate", description = "시작 일자", example = "2023-01-01 00:00:00", required = false)
//    @Parameter(name = "endDate", description = "종료 일자", example = "2023-01-01 00:00:00", required = false)
//     @Parameter(name = "details", hidden = true)
    @Parameter(name = "page", description = "조회 대상 페이지", example = "0", required = true)
    @Parameter(name = "size", description = "조회 대상 건수", example = "20")
    @Parameter(name = "sort", description = "정렬<br/>다중정렬의 경우 sort를 여러번 첨부한다.<br/>(ex: ?sort=projectId,desc&sort=purpose,asc)", example = "id,desc")
    public Page<ProjectListResponse> getProjectList(
            @Parameter(description = "프로젝트 탭", example = "MY", required = true)
            @RequestParam(value = "projectTab") ProjectTab projectTab,


            @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
            @Schema(description = "startDate", example = "2023-01-01 00:00:00")
            @RequestParam(name = "startDate", value = "startDate", required = false)
            LocalDateTime startDate,

            @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
            @Schema(description = "endDate", example = "2024-01-01 00:00:00")
            @RequestParam(name = "endDate", value = "endDate", required = false)
            LocalDateTime endDate,


            @Parameter(name = "diseaseCategoryCode", description = "질병 카테고리 코드", example = "DR", required = false)
            @RequestParam(value = "diseaseCategoryCode", required = false) String diseaseCategoryCode,


            @Parameter(name = "purposeCode", description = "목적 코드", example = "DP01", required = false)
            @RequestParam(value = "purposeCode", required = false) String purposeCode,


            @Parameter(name = "processCode", description = "프로세스 코드", example = "PLNG", required = false)
            @RequestParam(value = "processCode", required = false) String processCode,


            @Parameter(name = "keyword", description = "검색어", example = "ABCDFG", required = false)
            @RequestParam(value = "keyword", required = false) String keyword,


            PlatformUserInfo details,

            @Parameter(name = "pageable", hidden = true)
            Pageable pageable) {
        return projectService.getProjectList(projectTab, startDate, endDate, diseaseCategoryCode, purposeCode, processCode, keyword, pageable, details);
    }

    /**
     *
     * @param projectId
     * @param details
     * @param request
     */
    @Operation(summary = "[IFM108]프로젝트 상태 코드 변경 / 담당자 : 정준영 [완료] 08/25", description = "프로젝트 상태를 수정한다.")
    @Parameter(name = "details", hidden = true)
    @PutMapping(path = "/{projectId}/status")
    public void updateProjectStatus(@PathVariable Long projectId, PlatformUserInfo details, @Valid @RequestBody ProjectStatusUpdateRequest request) {
        projectService.updateProjectStatus(projectId, details, request);
    }

    /**
     * @param details
     * @return
     */
    @Operation(summary = "[IFM045]프로젝트 카테고리 목록 조회 / 담당자 : 정준영 [완료] 08/25", description = "프로젝트 카테고리 목록 조회한다.")
    @Parameter(name = "details", hidden = true)
    @GetMapping(path = "/category/list")
    public List<DiseaseCategoryListResponse> getProjectCategoryList(PlatformUserInfo details) {
        return projectService.getProjectCategoryList(details.getLangCode());
    }

    /**
     * @param details
     * @return
     */
    @GetMapping(path = "/purpose/list")
    @Operation(summary = "[IFM046]프로젝트 개발 목적 목록 조회 / 담당자 : 정준영 [완료] 08/25", description = "프로젝트 개발 목적 목록 조회한다.")
    @Parameter(name = "details", hidden = true)
    public List<ProjectPurposeListResponse> getProjectPurposeList(PlatformUserInfo details) {
        return projectService.getProjectPurposeList(details.getLangCode());
    }

    /**
     * @return
     */
    @GetMapping(path = "/process/list")
    @Operation(summary = "[IFM047]프로젝트 process 목록 조회 / 담당자 : 정준영 [완료] 08/25", description = "프로젝트 process 목록 조회한다.")
    public List<ProjectProcessListResponse> getProjectProcessList() {
        return projectService.getProjectProcessList();
    }

    /**
     * @param details
     * @param request
     * @return
     */
    @PostMapping(path = "/add")
    @Operation(
            summary = "[IFM048]프로젝트 등록 / 담당자 : 정준영 [완료] 08/25",
            description = "프로젝트를 등록한다.",
            responses = {
                    @ApiResponse(responseCode = "200",
                            description = """
                                    Project 생성 성공 \n 
                                    Project Member 생성 성공 \n
                                    Project Process Member 생성 성공 \n
                                    Project Target Market 생성 성공 \n
                                    Project Regulatory Affair 생성 성공 \n
                                    """,
                            useReturnTypeSchema = true)
            }
    )
    @Parameter(name = "details", hidden = true)
    public ProjectCreateResponse createProject(PlatformUserInfo details, @Valid @RequestBody ProjectCreateRequest request) {
        return projectService.createProject(request, details);
    }

    /**
     * @param projectId
     * @param request
     */
    @Operation(summary = "[IFM049]프로젝트 수정 / 담당자 : 정준영 [완료] 08/25", description = "프로젝트를 수정한다.")
    @PostMapping(path = "/{projectId}/modify")
    @Parameter(name = "projectId", description = "프로젝트 ID", example = "1", required = true)
    public void updateProject(@PathVariable Long projectId, @Valid @RequestBody ProjectUpdateRequest request, PlatformUserInfo details) {
        projectService.updateProject(projectId, request, details);
    }

    /**
     * @param projectId
     */
    @Operation(summary = "[IFM050]프로젝트 삭제 / 담당자 : 정준영 [완료] 08/25", description = "프로젝트를 삭제한다.")
    @PostMapping(path = "/{projectId}/delete")
    @Parameter(name = "projectId", description = "프로젝트 ID", example = "1", required = true)
    public void deleteProject(@PathVariable Long projectId) {
        projectService.deleteProject(projectId);
    }

    /**
     * @param projectId
     * @param details
     * @return
     */
    @Operation(summary = "[IFM051]프로젝트 이력 조회 / 담당자 : 정준영 [완료] 08/25", description = "프로젝트 이력을 조회 한다.")
    @GetMapping(path = "/{projectId}/history/list")
    @Parameter(name = "projectId", description = "프로젝트 ID", example = "1", required = true)
    @Parameter(name = "details", hidden = true)
    public List<ProjectHistoryListResponse> getProjectHistoryList(@PathVariable Long projectId, PlatformUserInfo details) {
        return projectService.getProjectHistoryList(projectId, details.getLangCode());
    }

    /**
     * @param projectId
     * @param pageable
     * @return
     */
    @Operation(summary = "[미사용][IFM052]리퀘스트 이력 조회(인실리코에서 별도로 제공 예정)", description = "리퀘스트 이력을 조회 한다.")
    @GetMapping(path = "/{projectId}/request-history/list")
    @Parameter(name = "projectId", description = "프로젝트 ID", example = "1", required = true)
    @Parameter(name = "pageable", hidden = true)
    @Parameter(name = "page", description = "조회 대상 페이지", example = "0", required = true)
    @Parameter(name = "size", description = "조회 대상 건수", example = "20")
    @Parameter(name = "sort", description = "정렬", example = "startDate,desc|lastUpdateDate,asc")
    public Page<ProjectRequestHistoryListResponse> getProjectRequestHistory(@PathVariable String projectId, Pageable pageable) {
        return projectService.getProjectRequestHistory(projectId, pageable);
    }

    /**
     * @param projectId
     * @param details
     * @return
     */
    @Operation(summary = "[IFM053]프로젝트 정보 조회 / 담당자 : 정준영 [완료] 08/25", description = "프로젝트 정보를 조회 한다.")
    @GetMapping(path = "/{projectId}/project-info")
    @Parameter(name = "projectId", description = "프로젝트 ID", example = "100020", required = true)
    @Parameter(name = "details", hidden = true)
    public ProjectInfoResponse getProjectInfo(@PathVariable Long projectId, PlatformUserInfo details) {
        return projectService.getProjectInfo(projectId, details);
    }

    /**
     * @param projectId
     * @param details
     * @return
     */
    @Operation(summary = "[IFM054]프로젝트 추가 정보 조회 / 담당자 : 정준영 [완료] 08/25", description = "프로젝트 추가 정보를 조회 한다.")
    @GetMapping(path = "/{projectId}/project-additional-info")
    @Parameter(name = "projectId", description = "프로젝트 ID", example = "1", required = true)
    @Parameter(name = "details", hidden = true)
    public ProjectAdditionalInfoResponse getProjectAdditionalInfo(@PathVariable Long projectId, PlatformUserInfo details) {
        return projectService.getProjectAdditionalInfo(projectId, details.getLangCode());
    }

    /**
     * 프로젝트 플래닝 기본 정보 조회
     * <PRE>
     * 프로젝트 플래닝 기본 정보를 조회한다.
     * </PRE>
     *
     * @return : PlanningBasicInfoResponse
     * @author : 서원우(wwsoh@seegene.com)
     * @date : ${date}
     */
    @Operation(summary = "[IFM070] 프로젝트 플래닝 기본 정보 조회 / 담당자: 서원우 [9/15 완료]", description = "프로젝트 스테이지 기본 정보를 조회한다.")
    @GetMapping(path = "/{projectNum}/planning/detail")
    public PlanningBasicInfoResponse getProjectPlanningBasicInfo(

            @Parameter(description = "프로젝트 아이디", example = "1", required = true)
            @PathVariable(value = "projectNum")
            Long projectNum
    ) {
        return projectService.getPlanningBasicInfo(projectNum);
    }

    /**
     * 프로젝트 플래닝 기본 정보 수정
     * <PRE>
     * 프로젝트 플래닝 기본 정보를 수정 한다.
     * </PRE>
     *
     * @return : PlanningDetailResponse
     * @author : 서원우(wwsoh@seegene.com)
     * @date : ${date}
     */


    @Operation(summary = "[IFM124]프로젝트 플래닝 기본 정보 수정 / 담당자: 서원우 [9/15 완료]", description = "프로젝트 플래닝 기본 정보를 수정한다. (dataType = Quantitive - QUA/ Qualitive - QUL/ Mutation - MUT, productType = 2CT/3CT)")
    @PostMapping(path = "/{projectNum}/planning/modify", produces = MediaType.APPLICATION_JSON_VALUE)
    public void updatePlanningBasicInfo(

            @Parameter(description = "프로젝트 아이디", example = "1", required = true)
            @PathVariable("projectNum") Long projectNum,

            @RequestBody PlanningBasicInfoResponse planningBasicInfoResponse

    ) {
        projectService.updatePlanningBasicInfo(projectNum, planningBasicInfoResponse);
    }


    @Operation(summary = "[IFM125] 프로젝트 스테이지 진행 정보 조회 / 담당자: 서원우 [9/15 완료]", description = "프로젝트 스테이지 진행 정보를 조회한다. (projectProcess : FOUP = Follow / FSBT = Feasibliity / OLDS = Oligo Design / ORDR = Ordering / PLNG = Planning / PRTP = Prototype / VALD = Validation / VRFC = Verification , progressCode : PCFN = 완료 / PCNG = 진행 중 / PCWT = 미진행)")
    @GetMapping(path = "/{projectNum}/{processCode}/detail")
    public PlanningProgressInfoResponse getProjectDetailProgress(

            @Parameter(description = "프로젝트 아이디", example = "1", required = true)
            @PathVariable(value = "projectNum")
            Long projectNum,

            @Parameter(description = "프로젝트 프로세스", example = "PLNG", required = true)
            @PathVariable(value = "processCode")
            String processCode

    ) {
        return projectService.getProjectDetailProgress(projectNum, processCode);
    }

    @Operation(summary = "[IFM126] 프로젝트 스테이지 진행 정보 수정 / 담당자: 서원우 [9/15 완료]", description = "프로젝트 스테이지 진행 정보를 수정한다. (projectProcess : FOUP = Follow / FSBT = Feasibliity / OLDS = Oligo Design / ORDR = Ordering / PLNG = Planning / PRTP = Prototype / VALD = Validation / VRFC = Verification , progressCode : PCFN = 완료 / PCNG = 진행 중 / PCWT = 미진행,대기 (선택 가능하나 API 결과 반영 안 됨) / PCST = 중지)")
    @PostMapping(path = "/{projectNum}/stage/modify", produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateProjectDetailProgress(

            @Parameter(description = "프로젝트 아이디", example = "100146", required = true)
            @PathVariable(value = "projectNum")
            Long projectNum,

            @RequestBody PlanningProgressInfoRequest planningProgressInfoRequest,

            PlatformUserInfo userDetails
    ) {
        projectService.updateProjectDetailProgress(projectNum, planningProgressInfoRequest, userDetails);
    }

    // @Operation(summary = "[TEST] 프로젝트 스테이지 진행 정보 수정 테스트 API / 담당자: 정준영", description = "프로젝트 스테이지 진행 정보를 수정한다. (projectProcess : FOUP = Follow / FSBT = Feasibliity / OLDS = Oligo Design / ORDR = Ordering / PLNG = Planning / PRTP = Prototype / VALD = Validation / VRFC = Verification , progressCode : PCFN = 완료 / PCNG = 진행 중 / PCWT = 미진행,대기 (선택 가능하나 API 결과 반영 안 됨) / PCST = 중지)")
    // @PostMapping(path = "/{projectNum}/stage/modify/test", produces = MediaType.APPLICATION_JSON_VALUE)
    // public void updateProjectDetailProgressTest(
    //         @Parameter(description = "프로젝트 아이디", example = "100146", required = true)
    //         @PathVariable(value = "projectNum")
    //         Long projectNum,
    //         @RequestBody PlanningProgressInfoRequest planningProgressInfoRequest
    //
    // ) {
    //     projectService.updateProjectDetailProgressTest(projectNum, planningProgressInfoRequest);
    // }


    @Operation(summary = "[IFM071] 프로젝트 Planning 문서 리스트 조회 / 담당자: 서원우 [9/15 완료]", description = "프로젝트 Planning 문서 리스트를 조회 한다.")
    @GetMapping(path = "/{projectNum}/planning/document/list")
    @Parameter(name = "page", description = "조회 대상 페이지", example = "0", required = true)
    @Parameter(name = "size", description = "조회 대상 건수", example = "20", required = true)
    public Page<DocumentResponse> getProjectPlanningDocumentList(

            @Parameter(description = "fileStatus", example = "Y") @RequestParam(value = "fileStatus", required = false)
            String fileStatus,

            @Parameter(description = "fileType", example = "PF01") @RequestParam(value = "fileType", required = false)
            String fileType,

            @Parameter(description = "검색 키워드", example = "키워드") @RequestParam(value = "keyword", required = false)
            String keyword,

            @Parameter(description = "프로젝트 아이디", example = "1", required = true)
            @PathVariable(value = "projectNum")
            Long projectNum,

            @Parameter(name = "pageable", hidden = true) Pageable pageable,

            PlatformUserInfo userDetails

    ) {
        return projectService.getProjectPlanningDocumentList(fileStatus, fileType, keyword, projectNum, pageable, userDetails);

    }

    @Operation(summary = "[IFM144] Oligo Design Design 문서 리스트 조회 / 담당자: 서원우 [9/15 완료]", description = "프로젝트 Oligo Design 문서 리스트를 조회 한다.")
    @GetMapping(path = "/{projectNum}/oligoDesign/document/list")
    @Parameter(name = "page", description = "조회 대상 페이지", example = "0", required = true)
    @Parameter(name = "size", description = "조회 대상 건수", example = "20", required = true)
    public Page<DocumentResponse> getProjectOligoDesignDocumentList(

        @Parameter(description = "검색 키워드", example = "키워드") @RequestParam(value = "keyword", required = false)
        String keyword,

        @Parameter(description = "프로젝트 아이디", example = "1", required = true)
        @PathVariable(value = "projectNum")
        Long projectNum,

        @Parameter(name = "pageable", hidden = true) Pageable pageable,

        PlatformUserInfo userDetails

    ) {
        return projectService.getProjectOligoDesignDocumentList(keyword, projectNum, pageable, userDetails);

    }

    @Operation(summary = "[IFM145] 프로젝트 프로세스 문서 상세 조회 [9/15완료]", description = "해당 프로젝트 프로세스 문서의 상세 내용을 조회한다.")
    @GetMapping("/document/{documentNum}/detail")
    public DocumentGetDetailResponse getProjectDocumentDetail(
        @Parameter(description = "문서 ID", example= "1", required = true) @PathVariable("documentNum")
        Long documentNum,

        PlatformUserInfo user
    ) {
        return projectService.getProjectDocumentDetail(documentNum, user.getUsrUid());
    }


    @Operation(summary = "[IFM072] 프로젝트 Planning 문서 최종설정 정보 수정 / 담당자: 서원우 [9/15 완료]", description = "선택된 프로젝트 기획 문서의 최종 여부 설정 정보를 수정한다.")
    @PostMapping(path = "/{projectNum}/planning/document/{documentNum}/status/modify", produces = MediaType.APPLICATION_JSON_VALUE)
    public void updatetProjectPlanningDocumentStaus(

            @Parameter(description = "프로젝트 아이디", example = "1", required = true)
            @PathVariable(value = "projectNum")
            Long projectNum,

            @Parameter(name = "documentNum", description = "문서 아이디", example = "1", required = true)
            @PathVariable(value = "documentNum")
            Long documentNum,

            PlatformUserInfo user

    ) {
        projectService.updatetProjectPlanningDocumentStaus(projectNum, documentNum, user.getUsrUid());
    }


    @Operation(summary = "[IFM074] 프로젝트 문서 생성 / 담당자: 서원우 [9/15 완료]", description = "문서를 등록한다. (planning의 경우에만 fileType : 연구개발계획서 - PF01 / 위험관리계획서 - PF02/ 인실리코카드 - PF03/개발계획심의서 - PF04/ 연구개발제안서 - PF05 / 개발선행조사서 - PF06 / 제품요구사항 - PF07/ 위험관리분석 - PF08 / 기초자료조사 - PF09 / 기타 - PF99)")
    @PostMapping(path = "/document/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public void createProjectDocument(

            @RequestBody DocumentAddRequest documentAddRequest,

            PlatformUserInfo user

    ) {
        projectService.createProjectDocument(documentAddRequest, user.getUsrUid());
    }

    @Operation(summary = "[IFM146] 프로젝트 문서 수정 / 담당자: 서원우 [9/15 완료]", description = "문서를 수정한다.")
    @PostMapping(path = "/document/modify", produces = MediaType.APPLICATION_JSON_VALUE)
    public void modifyProjectDocument(

        @RequestBody DocumentModifyRequest documentModifyRequest,

        PlatformUserInfo user

    ) {
        projectService.modifyProjectDocument(documentModifyRequest, user.getUsrUid());
    }


    @Operation(summary = "[IFM075] 프로젝트 문서 삭제 / 담당자: 서원우 [9/15 완료]", description = "등록된 문서를 삭제한다.")
    @PostMapping(path = "/document/{projectDocumentNum}/delete", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteProjectDocument(

            @Parameter(description = "프로젝트 문서 아이디", example = "1", required = true)
            @PathVariable(value = "projectDocumentNum")
            Long projectDocumentNum
    ) {
        projectService.deleteProjectDocument(projectDocumentNum);
    }

    @Operation(summary = "[IFM055]프로젝트 note 목록 조회 / 담당자 : 유용태 [완료]", description = "프로젝트 코멘트 목록을 조회한다.")
    @GetMapping(path = "/note/{prjNum}/list")
    public NoteResponse getProjectNoteList(
            @Parameter(required = true, name = "prjNum", description = "프로젝트 고유 번호", example = "1")
            @PathVariable Long prjNum,
            PlatformUserInfo userDetails
    ) {
        return projectService.getProjectNoteList(prjNum, userDetails);
    }

    @Operation(summary = "[IFM056]프로젝트 note 상세 조회 / 담당자 : 유용태 [완료]", description = "프로젝트 코멘트를 상세 조회한다.")
    @GetMapping(path = "/note/{prjNum}/detail")
    public NoteDetailResponse getProjectNoteDetail(
            @Parameter(required = true, name = "prjNum", description = "프로젝트 고유 번호", example = "1")
            @PathVariable Long prjNum,
            @Parameter(required = true, name = "noteIndex", description = "note No", example = "1")
            String noteIndex,
            PlatformUserInfo userDetails
    ) {
        return projectService.getProjectNoteDetail(prjNum, noteIndex, userDetails);
    }

    @Operation(summary = "[IFM057]프로젝트 note 등록 / 담당자 : 유용태 [완료]", description = "프로젝트 코멘트를 등록한다.")
    @PostMapping(path = "/note/add")
    public void createNote(
            @RequestBody CommentAddRequest commentAddRequest,
            PlatformUserInfo userDetails
    ) {
        projectService.createProjectNote(commentAddRequest, userDetails);
    }

    @Operation(summary = "[IFM058]내 기업 멤버 조회 / 담당자 : 이솔이 [완료] 08/25", description = "프로젝트 추가할 멤버중 내기업의 멤버 조회 한다.")
    @GetMapping("/my-corporation-member/list")
    public List<ProjectMemberResponse> getMyCorporationMember(
            @Parameter(description = "멤버 이름", name = "usrNm") @RequestParam(required = false) String usrNm,
            @Parameter(description = "멤버 이메일주소", name = "emlId") @RequestParam(required = false) String emlId,
            PlatformUserInfo user
    ) {
        return projectService.getProjectMemberList(user, usrNm, emlId);
    }

    @Operation(summary = "[IFM059]내 기업/다른 기업 멤버 등록 / 담당자 : 이솔이 [완료] 08/25", description = "새로생성된 프로젝트의 멤버(다른기업)을 추가한다.")
    @GetMapping("/other-corporation-member")
    public ProjectMemberResponse createProjectMember(
        @Parameter(description = "멤버 이메일주소", name = "emlId") @RequestParam(required = false) String emlId
    ) {
       return projectService.getOtherCorporateMember(emlId);
    }

    @Operation(summary = "[IFM060]프로젝트 멤버 조회 / 담당자 : 이솔이 [완료] 08/25", description = "프로젝트 참여된 멤버들을 조회한다.")
    @GetMapping("/project-member/list")
    public List<ProjectMemberDetailResponse> getProjectMember(
            @Parameter(description = "프로젝트 아이디", name = "id") Long id
    ) {
        return projectService.getProjectMember(id);
    }

    @Operation(summary = "[IFM061]프로젝트 멤버 상세 조회 / 담당자 : 이솔이 [완료] 08/25", description = "프로젝트 등록된 멤버들을 목록을 조회한다.")
    @GetMapping("/project-member/detail")
    public List<ProjectMemberListResponse> getProjectMemberDetail(
            @Parameter(description = "프로젝트 아이디", name = "id") Long id
    ) {
        return projectService.getMemberDetail(id);
    }

    @Operation(summary = "[IFM063]프로젝트 권한 변경 요청 등록 / 담당자 : 이솔이 [완료] 08/25", description = "사용자가 관리자에게 프로젝트 권한 변경 요청을 한다.")
    @PostMapping("/project-authority/add")
    public void createProjectAuthority(
        @RequestBody ProjectAuthorityRequest projectAuthorityRequest,
        PlatformUserInfo user
    ) {
        projectService.createProjectAuthority(projectAuthorityRequest,user);
    }

    @Parameter(name = "page", description = "조회 대상 페이지", example = "0", required = true)
    @Parameter(name = "size", description = "조회 대상 건수", example = "20")
    @Parameter(name = "sort", description = "정렬", example = "")
    @Operation(summary = "[IFM064]프로젝트 요청 목록 조회 / 담당자 : 이솔이 [완료] 08/25", description = "참여/권한 변경 요청한 목록을 조회한다.")
    @GetMapping("/project-authority/list")
    public Page<ProjectAuthorityResponse> getProjectAuthorityList(
        @Parameter(description = "프로젝트 번호", name = "prjNum") Long prjNum,
        @SortDefault(sort="mdfDt", direction = Sort.Direction.DESC)
        @Parameter(name = "pageable", hidden = true)
        Pageable pageable
    ) {
        return projectService.getProjectAuthorityList(pageable,prjNum);
    }

    @Operation(summary = "[IFM065]프로젝트 권한 요청 확인 등록 / 담당자 : 이솔이 [완료] 08/25", description = "권한 요청을 수락/거절 을 등록한다.")
    @PostMapping("/project-authority/modify")
    public void updateProjectAuthority(@RequestBody ProjectAuthorityRequest projectAuthorityRequest ,PlatformUserInfo user) {
        projectService.updateProjectAuthority(projectAuthorityRequest,user);
    }

    @Operation(summary = "[IFM066]프로젝트 권한 요청 상세 조회 / 담당자 : 이솔이 [완료] 08/25", description = "권한 요청 정보를 조회한다.")
    @GetMapping("/project-authority/detail")
    public ProjectAuthorityDetailResponse getProjectAuthority(
            @Parameter(description = "요청 번호", name = "id") Long id,
        PlatformUserInfo user
    ) {
        return projectService.getProjectAuthority(id ,user);
    }

    @Operation(summary = "[IFM067]프로젝트 참여 요청 등록 / 담당자 : 이솔이 [완료] 08/25", description = "프로젝트 참여요청 을 신청")
    @PostMapping("/project-participation-demand/add")
    public void createParticipationDemand(
        @RequestBody ProjectAuthorityRequest projectAuthorityRequest,
        PlatformUserInfo user

    ) {
        projectService.createParticipationDemand(projectAuthorityRequest,user);
    }

    @Operation(summary = "[IFM068]프로젝트 참여 요청 확인 등록 / 담당자 : 이솔이 [완료] 08/25", description = "")
    @PostMapping("/project-participation-demand/modify")
    public void updateParticipationDemand(@RequestBody ProjectAuthorityRequest projectAuthorityRequest , PlatformUserInfo user) {
        projectService.updateParticipationDemand(projectAuthorityRequest,user);
    }

    @Operation(summary = "[IFM069]프로젝트 참여 요청 상세 조회 / 담당자 : 이솔이 [완료] 08/25", description = "")
    @GetMapping("/project-participation-demand/detail")
    public ProjectRequestDetailResponse getParticipationDemandDetail(
            @Parameter(description = "요청 번호", name = "id") Long id,
        PlatformUserInfo user
    ) {
        return projectService.getParticipationDemandDetail(id,user);
    }

    @Operation(summary = "[IFM130] 프로젝트 note 알림 조회(카운트) / 담당자 : 유용태 [완료]", description = "프로잭트 Note 알림 카운트를 여부 조회 한다.")
    @GetMapping(path = "/note/usr-alarm")
    public NoteCountResponse getProjectNoteAlarm(
            PlatformUserInfo platformUserDetails
    ) {
        return NoteCountResponse.builder()
                .usrUid(platformUserDetails.getUsrUid())
                .noteCount(projectService.getProjectNoteAlarm(platformUserDetails))
                .build();
    }


    @Operation(summary = "[IFM140] 프로젝트 프로세스 정보 조회 / 담당자 : 이솔이", description = "프로젝트 프로세스 상태를 조회한다.")
    @GetMapping(path = "/process/{prjNum}/list")
    public List<ProjectProcessResponse> getProjectProcessDetailList(
            PlatformUserInfo user,
            @Parameter(required = true, name = "prjNum", description = "프로젝트 고유 번호", example = "1")
            @PathVariable Long prjNum
    ) {
        return projectService.getProjectProcessDetailList(prjNum, user);
    }

    // @Operation(summary = "[IFM143] 프로젝트 에 속한 프로세스 멤버 리스트 조회 / 담당자 : 이솔이 [완료] 08/25",description = "프로젝트 에 속한 멤버 리스트를 프로세스별로  조회한다.")
    // @GetMapping(path = "/process-member/detail")
    // public List<ProjectMemberListResponse> getProjectProcessMemberDatail(
    //     @Parameter(description = "프로젝트 아이디", name = "id") Long id,
    //     @Parameter(description = "프로세스 코드", name = "prjPrcsNumber")@RequestParam(required = false) Long prjPrcsNumber
    // ){
    //     return projectService.getProjectProcessMemberDatail(id,prjPrcsNumber);
    // }

}

