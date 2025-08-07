package com.seegene.main.domain.dashboard.controller;


import com.seegene.main.domain.dashboard.dto.*;
import com.seegene.main.domain.dashboard.service.DashboardService;
import com.seegene.main.domain.external.entity.mongo.Alarm;
import com.seegene.main.domain.notice.dto.DashboardNoticeListResponse;
import com.seegene.main.domain.notice.service.NoticeService;
import com.seegene.main.domain.project.dto.CorporateStatusResponse;
import com.seegene.main.domain.project.dto.PurposeStatusResponse;
import com.seegene.main.domain.project.dto.RegionStatusResponse;
import com.seegene.main.global.auth.PlatformUserInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 개발자 대시보드 Controller
 * <PRE>
 * </PRE>
 * @author   : hwkwak@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-05        hwkwak        최초작성
 * </PRE>
 */
@Tag(name="dashboard", description = "개발자 대시보드 ")
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@RestController
public class DashboardController {
    private final DashboardService dashboardService;
    private final NoticeService noticeService;
    @Operation(summary = "[IFM036]프로젝트 새소식 조회 담당자 : 송주헌/ [완료] / 0825", description = "프로젝트 새소식 조회한다.")
    @GetMapping(path = "/my-projects-news/list", produces = MediaType.APPLICATION_JSON_VALUE)
    @Parameter(name = "page", description = "페이지번호", example = "0", required = true)
    @Parameter(name = "size", description = "페이지사이즈", example = "4")
    public Page<Alarm> getMyProjectsNews(
        @Parameter(name = "pageable", hidden = true) Pageable pageable,
        @Parameter(description = "카테고리", example = "") @RequestParam(value = "category", required = false)String type,
         PlatformUserInfo user){
        return dashboardService.getMyProjectsNews(pageable, type, user);
    }

    @Operation(summary = "[IFM123]프로젝트 새소식 건수 조회 [완료] 23.08.25 담당자 : 곽호원", description = "프로젝트 새소식 건수 조회한다.")
    @GetMapping(path = "/my-projects-news/count", produces = MediaType.APPLICATION_JSON_VALUE)
    public Long getMyProjectsNewsCount(PlatformUserInfo user) {
        return dashboardService.getMyProjectsNewsCount(user);
    }
    @Operation(summary = "[IFM037]즐겨찾기 조회 [완료] 23.08.25 담당자 : 곽호원", description = "즐겨찾기로 등록된 목록 조회한다.")
    @GetMapping(path = "/my-bookmark/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<BookmarkResponse> getMyBookmark(PlatformUserInfo user){
        return dashboardService.getMyBookmark(user);
    }

    @Operation(summary = "[IFM038]최근본 페이지 조회 담당자 : 송주헌, [완료], 0915", description = "최근본 페이지 조회한다.")
    @GetMapping(path = "/lately-page/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<LatelyPageResponse> getLatelyPage(
        PlatformUserInfo user) {
        return dashboardService.getLatelyPage(user);
    }

    @Operation(summary = "[IFM039]홈 공지사항 조회 [완료] 23.08.25 담당자 : 곽호원", description = "공지사항을 조회한다.")
    @GetMapping(path = "/notice", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<DashboardNoticeListResponse> getNoticeList(
            PlatformUserInfo user){
        return noticeService.getRecentNotice(user);
    }

    @Operation(summary = "[IFM040]즐겨찾기 등록할 모든 툴 목록을 조회 [완료] 23.08.25 담당자 : 곽호원", description = "즐겨찾기 등록할 모든 툴 목록을 조회한다.")
    @GetMapping(path = "/bookmark-tool/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ToolListResponse> getBookmarkToolList(PlatformUserInfo user){
        return dashboardService.getBookmarkToolList(user);
    }

    @Operation(summary = "[IFM041]특정 사용자 즐겨찾기에 등록한 툴을 수정 [완료] 23.08.25 담당자 : 곽호원", description = "특정 사용자 즐겨찾기에 등록한 툴을 수정한다.")
    @PostMapping(path = "/bookmark-tool/modify", produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateBookmarkTool(PlatformUserInfo user,
                                   @RequestBody List<ToolRequest> toolRequest){
        dashboardService.updateBookmarkTool(user, toolRequest);
    }

    @Operation(summary = "[IFM042]즐겨찾기 등록한 Url을 수정 [완료] 23.08.25 담당자 : 곽호원", description = "즐겨찾기 등록한 Url을 수정한다.")
    @PostMapping(path = "/bookmark-url/modify", produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateBookmarkUrl(PlatformUserInfo user,
                                  @RequestBody List<UrlRequest> urlRequest){
        dashboardService.updateBookmarkUrl(user, urlRequest);
    }



    //AB#22318
    @Operation(summary = "[IFM132]회사별 진행현황 탑5 조회(누적/현재) [완료] 23.09.05 담당자 : 유승엽", description = "NewCO 회사별 진행현황 탑5 조회한다. (누적/현재)")
    @GetMapping(path = "/c-level/corporate", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CorporateStatusResponse> getCorporate (
            @Parameter(description = "프로젝트 진행 상태 (누적 ACC / 현재 CUR)", example= "CUR") @RequestParam(value = "projectStatusCode", required = true)
            String projectStatusCode
    ) {
        return dashboardService.getCorporate(projectStatusCode);
    }

    //AB#22314
    @Operation(summary = "[IFM134]전년도와 금년의 purpose 비교 조회 (누적/현재) [완료] 23.09.05 담당자 : 유승엽", description = "전년도와 금년의 purpose 비교차트를 제공한다(누적/현재)")
    @GetMapping(path = "/c-level/purpose-status", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<PurposeStatusResponse> getPurposeStatus (
            @Parameter(description = "프로젝트 진행 상태 (누적 ACC / 현재 CUR)", example= "CUR") @RequestParam(value = "projectStatusCode", required = true)
            String projectStatusCode
    ) {
        return dashboardService.getPurposeStatus(projectStatusCode);
    }


    //AB#22316
    @Operation(summary = "[IFM136]국가별 진행현황 조회(누적/현재) [완료] 23.09.05 담당자 : 유승엽", description = "국가별 진행현황을 제공한다.(월/분기/년)")
    @GetMapping(path = "/c-level/region-status", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<RegionStatusResponse> getRegionStatus (
            @Parameter(description = "프로젝트 진행 상태 (누적 ACC / 현재 CUR)", example= "CUR") @RequestParam(value = "projectStatusCode", required = true)
            String projectStatusCode
    ) {
        return dashboardService.getRegionStatus(projectStatusCode);
    }

    //AB#22313
    @Operation(summary = "[IFM133]프로덕트 카테고리별 현황 조회 (누적/현재) [완료] 23.09.15 담당자 : 서원우", description = "프로덕트 카테고리별 현황을 제공한다(누적/현재)")
    @GetMapping(path = "/c-level/region-product-category", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<DiseaseCategoryProjectListResponse> getProductCategoryStatus (
        @Parameter(description = "프로젝트 진행 상태 (누적 ACC / 현재 CUR)", example= "CUR") @RequestParam(value = "projectStatusCode", required = true)
        String projectStatusCode
    ) {
        return dashboardService.getProductCategoryStatus(projectStatusCode);
    }

    @Operation(summary = "[IFM137]주요국가별 진행현황 조회(누적/현재) [완료] 23.09.15 담당자 : 곽호원", description = "주요국가별 진행현황을 제공한다(누적/현재)")
    @GetMapping(path = "/c-level/top6-country", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CountryStatusResponse> getTop6Country (
            @Parameter(description = "프로젝트 진행 상태 (누적 ACC / 현재 CUR)", example= "CUR") @RequestParam(value = "projectStatusCode", required = true)
            String projectStatusCode
    ) {
        return dashboardService.getTop6Country(projectStatusCode);
    }
}
