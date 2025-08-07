package com.seegene.main.domain.dashboard.service;

import com.seegene.main.domain.dashboard.constant.FavTpCd;
import com.seegene.main.domain.dashboard.constant.NotfTpCd;
import com.seegene.main.domain.dashboard.dto.*;
import com.seegene.main.domain.dashboard.entity.TusFav;
import com.seegene.main.domain.dashboard.repository.TusFavRepository;
import com.seegene.main.domain.dashboard.repository.mongo.VistPageRepository;
import com.seegene.main.domain.external.entity.mongo.Alarm;
import com.seegene.main.domain.external.entity.mongo.VistPage;
import com.seegene.main.domain.notification.repository.mongo.AlarmRepository;
import com.seegene.main.domain.project.constant.ProjectStatusCode;
import com.seegene.main.domain.project.dto.CorporateStatusResponse;
import com.seegene.main.domain.project.dto.PurposeStatusResponse;
import com.seegene.main.domain.project.dto.RegionStatusResponse;
import com.seegene.main.domain.project.entity.TpjPrj;
import com.seegene.main.domain.project.repository.TpjPrjRepository;
import com.seegene.main.domain.user.repository.TusUsrRepository;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.exception.BusinessException;
import com.seegene.main.global.exception.DataNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 개발자 대시보드 Service
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
@Service
@Slf4j
@RequiredArgsConstructor
public class DashboardService {
    private final TusUsrRepository tusUsrRepository;
    private final TpjPrjRepository tpjPrjRepository;
    private final AlarmRepository alarmRepository;
    private final TusFavRepository tusFavRepository;
    private final VistPageRepository vistPageRepository;

    public Page<Alarm> getMyProjectsNews(Pageable pageable, String type, PlatformUserInfo user) {

        //정렬조건
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("crtDt").descending());

        List<String> params = new ArrayList<>();
        if(type != null && !type.isEmpty()) {
            params = Arrays.asList(type.split(","));
        } else {
            params = Arrays.asList(new String[] {"NT04", "NT08"});
        }
        Page<Alarm> alarms = alarmRepository.findByToUsrUidAndNotfTpCdIn(user.getUsrUid(), params, pageable);

        return alarms;
    }

    public List<BookmarkResponse> getMyBookmark(PlatformUserInfo user) {
        List<BookmarkResponse> bookmarkResponseList = new ArrayList<>();
        //해당 사용자 Tool 목록 조회
        List<ToolResponse> toolList = tusFavRepository.findByUserUidAndFavTpCd(user.getUsrUid(), FavTpCd.TOOL.getCode());
        //해당 사용자 URL 조회
        List<TusFav> byTusUsrIdAndFavTpCd = tusFavRepository.findByTusUsr_IdAndFavTpCd(user.getUsrUid(),FavTpCd.WEB.getCode());
        List<UrlResponse> collect = byTusUsrIdAndFavTpCd.stream().map(UrlResponse::entityToDto).collect(Collectors.toList());
        bookmarkResponseList.add(BookmarkResponse.builder().urlResponseList(collect).toolReponseList(toolList).build());
        return bookmarkResponseList;
    }

    public List<LatelyPageResponse> getLatelyPage(PlatformUserInfo user) {


        //최근 본 페이지를 조회한다.
        List<VistPage> vistPages = vistPageRepository.findByMdfrUidOrderByMdfDtDesc(user.getUsrUid());

        List<LatelyPageResponse> list = vistPages.stream().map(
            v -> LatelyPageResponse.of(v)
        )
        .limit(Math.min(vistPages.size(),6)) // 6개만 보여준다.
        .collect(Collectors.toList());

        return list;
    }

    public List<ToolListResponse> getBookmarkToolList(PlatformUserInfo user) {
        return tusFavRepository.findAllByUserUid(user.getUsrUid());
    }

    @Transactional
    public void updateBookmarkTool(PlatformUserInfo user, List<ToolRequest> toolRequest) {
        tusFavRepository.deleteAllByTusUsr_IdAndFavTpCd(user.getUsrUid(), FavTpCd.TOOL.getCode());
        tusFavRepository.flush();
        toolRequest.stream().map(request -> TusFav.builder()
                .favTpCd(request.getFavType())
                .toolNum(request.getToolId())
                .tusUsr(tusUsrRepository.findById(user.getUsrUid()).orElseThrow(DataNotFoundException::new))
                .build()).forEach(tusFavRepository::save);
    }

    @Transactional
    public void updateBookmarkUrl(PlatformUserInfo user, List<UrlRequest> urlRequest) {
        tusFavRepository.deleteAllByTusUsr_IdAndFavTpCd(user.getUsrUid(), FavTpCd.WEB.getCode());
        tusFavRepository.flush();
        urlRequest.stream().map(request -> TusFav.builder()
                .favTpCd(request.getFavType())
                .siteUrl(request.getUrl())
                .siteNm(request.getUrlName())
                .tusUsr(tusUsrRepository.findById(user.getUsrUid()).orElseThrow(DataNotFoundException::new))
                .build()).forEach(tusFavRepository::save);
    }

    public List<CorporateStatusResponse> getCorporate(String projectStatusCode) {
        statusCodeValidate(projectStatusCode);
        List<CorporateStatusResponse> result = tpjPrjRepository.findCorporateStatus(projectStatusCode);
        if(result.size()>5){
            long etcSum = Arrays.stream(
                result.stream().map(CorporateStatusResponse::getCorpCnt).mapToLong(e -> e).toArray(),
                5,
                result.size()
            ).sum();

            result.subList(5,result.size()).clear();
            result.add(5,
                    new CorporateStatusResponse(
                            null,
                            "ETC.",
                            etcSum
                    )
            );
        }
        return result;
    }

    public List<PurposeStatusResponse> getPurposeStatus(String projectStatusCode) {
        statusCodeValidate(projectStatusCode);
        return tpjPrjRepository.findPurposeStatus(projectStatusCode);
    }

    public List<RegionStatusResponse> getRegionStatus(String projectStatusCode) {
        statusCodeValidate(projectStatusCode);
        return tpjPrjRepository.findRegionStatus(projectStatusCode);
    }
    private void statusCodeValidate(String projectStatusCode) {
        if(!projectStatusCode.equals("ACC")&&!projectStatusCode.equals("CUR")){
            throw new BusinessException(ErrorCode.NO_SUCH_PROJECT_STATUS_ERROR);
        }
    }

    public Long getMyProjectsNewsCount(PlatformUserInfo user) {
        List<String> notfTpCd = new ArrayList<>();
        for (NotfTpCd tpCd : Arrays.asList(NotfTpCd.NT04, NotfTpCd.NT08)) {
            notfTpCd.add(tpCd.name());
        }
        return alarmRepository.countByToUsrUidAndNotfTpCdIn(user.getUsrUid(), notfTpCd);
    }

    public List<DiseaseCategoryProjectListResponse> getProductCategoryStatus(String projectStatusCode){

        statusCodeValidate(projectStatusCode);

        List<DiseaseCategoryProjectListResponse> diseaseCategoryListResponseArrayList = new ArrayList<>();

        String ONG = ProjectStatusCode.ONGOING.getCode();
        String CMP = ProjectStatusCode.COMPLETED.getCode();


        if(projectStatusCode.equals("CUR")||projectStatusCode.equals("ACC")){
            List<TpjPrj> tpjPrjs = tpjPrjRepository.findByDelYnAndPrjStsCd("N", ONG);

            if(projectStatusCode.equals("ACC")){
                tpjPrjs.addAll(tpjPrjRepository.findByDelYnAndPrjStsCd("N", CMP));
            }

            Map<String, Long> countByDissCatCd = tpjPrjs.stream().collect(Collectors.groupingBy(TpjPrj::getDissCatCd, Collectors.counting()));

            for (Map.Entry<String, Long> entry : countByDissCatCd.entrySet()){
                diseaseCategoryListResponseArrayList.add(DiseaseCategoryProjectListResponse.of(entry));
            }
        }

        return diseaseCategoryListResponseArrayList;
    }

    public List<CountryStatusResponse> getTop6Country(String projectStatusCode) {
        statusCodeValidate(projectStatusCode);
        return tpjPrjRepository.findByCountryStatus(projectStatusCode);

    }
}
