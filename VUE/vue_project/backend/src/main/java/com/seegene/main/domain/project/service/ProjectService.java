package com.seegene.main.domain.project.service;

import static com.seegene.main.global.convert.DefaultDateTimeConverter.convertDateTime;
import static com.seegene.main.global.function.ExceptionInterface.*;

import com.seegene.main.domain.common.dto.FileInfoResponse;
import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.domain.common.repository.TsyFlRepository;
import com.seegene.main.domain.common.service.CommonService;
import com.seegene.main.domain.external.dto.NotiSenderRequest;
import com.seegene.main.domain.external.dto.VistPageRequest;
import com.seegene.main.domain.external.service.ExternalService;
import com.seegene.main.domain.join.constant.JoinCode;
import com.seegene.main.domain.project.constant.*;
import com.seegene.main.domain.corporate.entity.TusCorp;
import com.seegene.main.domain.corporate.repository.TusCorpRepository;
import com.seegene.main.domain.datacodemanagement.entity.TcdCdItm;
import com.seegene.main.domain.datacodemanagement.entity.TcdCdItmMlg;
import com.seegene.main.domain.datacodemanagement.entity.TcdCntry;
import com.seegene.main.domain.datacodemanagement.repository.TcdCdItmMlgRepository;
import com.seegene.main.domain.datacodemanagement.repository.TcdCdItmRepository;
import com.seegene.main.domain.datacodemanagement.repository.TcdCntryRepository;
import com.seegene.main.domain.project.dto.*;
import com.seegene.main.domain.project.entity.*;
import com.seegene.main.domain.project.repository.*;
import com.seegene.main.domain.project.repository.mapper.ProjectMapper;
import com.seegene.main.domain.user.constant.UserStatusCode;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.domain.user.repository.TrlUsrRolRepository;
import com.seegene.main.domain.user.repository.TusUsrRepository;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.convert.DefaultDateTimeConverter;
import com.seegene.main.global.exception.BusinessException;
import com.seegene.main.global.exception.DataNotFoundException;
import com.seegene.main.global.exception.InvalidValueException;
import com.seegene.main.global.util.s3.S3Service;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.core.EntityInformation;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProjectService {
    private final TsyFlRepository tsyFlRepository;
    private final TrlUsrRolRepository trlUsrRolRepository;
    private final ProjectMapper projectMapper;

    private final TusUsrRepository tusUsrRepository;
    private final TcdCdItmRepository tcdCdItmRepository;
    private final TcdCntryRepository tcdCntryRepository;
    private final TcdPrcsRepository tcdPrcsRepository;
    private final TpjPrjRepository tpjPrjRepository;
    private final TpjPrjPrcsRepository tpjPrjPrcsRepository;
    private final TpjPrjPrcsStsRepository tpjPrjPrcsStsRepository;
    private final TpjPrjMbrRepository tpjPrjMbrRepository;
    private final TpjPrjMbrHstRepository tpjPrjMbrHstRepository;
    private final TpjPrjPrcsMbrRepository tpjPrjPrcsMbrRepository;
    private final TpjPrjPrcsMbrHstRepository tpjPrjPrcsMbrHstRepository;
    private final TusCorpRepository tusCorpRepository;
    private final TpjPrjTgMaktRepository tpjPrjTgMaktRepository;
    private final TpjPrjRgltrAfrRepository tpjPrjRgltrAfrRepository;
    private final TpjPrjFlRepository tpjPrjFlRepository;
    private final TcdCdItmMlgRepository tcdCdItmMlgRepository;
    private final TpjPrjMbshReqRepository tpjPrjMbshReqRepository;
    private final TpjPrjMbshReqPupsRepository tpjPrjMbshReqPupsRepository;
    private final TpjPrjPrcsMbshReqRepository tpjPrjPrcsMbshReqRepository;

    private final NoteRepository noteRepository;
    private final S3Service s3Service;
    private final CommonService commonService;
    private final ExternalService externalService;

    private final EntityManager em;
    private static final String DEL_N = "N";
    private static final String DEL_Y = "Y";
    private static final String MANAGER_ADD = "ADM";
    private static final String CREATE = "CRT";
    private static final String UPDATE = "UPD";
    private static final String DELETE = "DEL";
    private static final String SEEGENE_HQ_LVL = "LV1";
    private static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    public Page<ProjectListResponse> getProjectList(ProjectTab projectTab, LocalDateTime startDate, LocalDateTime endDate, String diseaseCategoryCode, String purposeCode, String processCode, String keyword, Pageable pageable, PlatformUserInfo details) {
        TusUsr user = tusUsrRepository.findById(details.getUsrUid()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_USR_UUID_ERROR));
        TusCorp corp = tusCorpRepository.findByCorpLvlCd(SEEGENE_HQ_LVL).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_CORP_NUM_ERROR));

        Specification<TpjPrj> spec = getSpecificationTpjPrj(DefaultDateTimeConverter.convertStartLocalDateTime(startDate), DefaultDateTimeConverter.convertEndLocalDateTime(endDate), diseaseCategoryCode, purposeCode, processCode, keyword, projectTab.getCode(), user, corp);

        Page<TpjPrj> prjList = tpjPrjRepository.findAll(spec, pageable);

        List<ProjectListResponse> responses = prjList.getContent().stream().map(tpjPrj -> {

            String tgMaks = tpjPrj.getTpjPrjTgMaktList().stream().map(makt -> {
                TcdCntry tcdCntry = tcdCntryRepository.findById(makt.getTgMaktCntryCd()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_CENTURY_CODE_ERROR));
                return getNameByLangCd(tcdCntry, details.getLangCode());
            }).collect(Collectors.joining(","));

            String dissCategory = tcdCdItmRepository.findByCdGrpIdAndCd(TcdCdGrpCode.DISEASE_CD_GRP_ID.getCode(), tpjPrj.getDissCatCd()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_CODE_GROUP_ID_AND_DISS_CODE_ERROR)).getTcdCdItmMlgList().stream().map(itmMlg -> {
                if (details.getLangCode().equals(itmMlg.getLangCd()))
                    return itmMlg.getCdNm();
                return null;
            }).filter(name -> name != null).findFirst().get();

            String purpose = tcdCdItmRepository.findByCdGrpIdAndCd(TcdCdGrpCode.PURPOSE_CD_GRP_ID.getCode(), tpjPrj.getDevPupsCd()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_CODE_GROUP_ID_AND_PURPOSE_CODE_ERROR)).getTcdCdItmMlgList().stream().map(itmMlg -> {
                if (details.getLangCode().equals(itmMlg.getLangCd()))
                    return itmMlg.getCdNm();
                return null;
            }).filter(name -> name != null).findFirst().get();

            String corporate = tpjPrj.getTusCorp().getCorpNm();

            List<TpjPrjPrcs> tpjPrjPrcsList = tpjPrj.getTpjPrjPrcsList();

            String process = tcdPrcsRepository.findById(tpjPrjPrcsStsRepository.findTopByTpjPrjPrcsIdInOrderByStsDtDesc(tpjPrjPrcsList.stream().map(TpjPrjPrcs::getId).collect(Collectors.toList())).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_PROJECT_PROCESS_STATUS_ERROR)).getTpjPrjPrcs().getPrcsCd()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR)).getPrcsNm();

            /**
             * 역할 - 프로젝트 매니저, 프로젝트 멤버(프로세스 매니저, 프로세스 EDIT, 프로세스 VIEW), 프로젝트 미참여
             */
            Optional<TpjPrjMbr> optPrjMbr = tpjPrj.getTpjPrjMbrList().stream().filter(prjMbr -> prjMbr.getTusUsr().getId().equals(user.getId())).findFirst();

            String projectRoleCode = null;

            if (optPrjMbr.isPresent()) {
                if (ProjectManagerYn.Y.getCode().equals(optPrjMbr.get().getPrjRolCd())) {
                    /**
                     * Project Manager인 경우
                     * */
                    projectRoleCode = optPrjMbr.get().getPrjRolCd();
                } else if (ProjectManagerYn.N.getCode().equals(optPrjMbr.get().getPrjRolCd())) {
                    /**
                     * Project Member인 경우 MGMT, EDIT, VIEW 순으로 내려줌
                     * */
//                    projectRoleCode = optPrjMbr.get().getTpjPrjPrcsMbrList().stream().filter(prjPrcsMbr -> prjPrcsMbr.getTpjPrjPrcs().getId() == inProgressPrjPrcs.get().getId()).findFirst().get().getPrcsRolCd();

                    List<String> prcsRoleCodeList = optPrjMbr.get().getTpjPrjPrcsMbrList().stream().map(TpjPrjPrcsMbr::getPrcsRolCd).toList();

                    if (prcsRoleCodeList.contains(ProcessRoleCode.MGMT.getCode())) {
                        projectRoleCode = ProcessRoleCode.MGMT.getCode();
                    } else if (prcsRoleCodeList.contains(ProcessRoleCode.EDIT.getCode())) {
                        projectRoleCode = ProcessRoleCode.EDIT.getCode();
                    } else if (prcsRoleCodeList.contains(ProcessRoleCode.VIEW.getCode())) {
                        projectRoleCode = ProcessRoleCode.VIEW.getCode();
                    }
                }
            } else {
                /**
                 * 미참여인 경우
                 * */
                projectRoleCode = "";
            }

            TcdCdItm tcdCdItmProgress = tcdCdItmRepository.findByCdGrpIdAndCd(TcdCdGrpCode.PROJECT_STATUS_CD_GRP_ID.getCode(), tpjPrj.getPrjStsCd()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_CODE_GROUP_ID_AND_PROJECT_STATUS_CODE_ERROR));
            String prjStsNm = tcdCdItmProgress.getTcdCdItmMlgList().stream().filter(tcdCdItmMlg -> tcdCdItmMlg.getLangCd().equals(details.getLangCode())).findFirst().orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR)).getCdNm();


            return ProjectListResponse.of(tpjPrj, purpose, corporate, process, tgMaks, dissCategory, projectRoleCode, prjStsNm);

        }).collect(Collectors.toList());

        return new PageImpl<>(responses, pageable, prjList.getTotalElements());
    }


    public String getProgressCode(String cdGrpId, String cd) {
        /**
         cdGrpId = PFM025 , SortNum = 1 -> PCWT(미진행)
         cdGrpId = PFM025 , SortNum = 2 -> PCNG(진행중)
         cdGrpId = PFM025 , SortNum = 3 -> PCFN(완료)
         cdGrpId = PFM025 , SortNum = 4 -> PCST(중지)
         **/
        return tcdCdItmRepository.findByCdGrpIdAndCd(cdGrpId, cd).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_CODE_GROUP_ID_ERROR)).getCd();
    }

    public List<DiseaseCategoryListResponse> getProjectCategoryList(String langCd) {

        List<TcdCdItm> tcdCdItemList = tcdCdItmRepository.findByCdGrpId(TcdCdGrpCode.DISEASE_CD_GRP_ID.getCode());
        List<TcdCdItmMlg> tcdCdItmMlgList = tcdCdItemList.stream().flatMap(cdItem -> {
                    return cdItem.getTcdCdItmMlgList().stream().filter(cdItemMlgs -> cdItemMlgs.getLangCd().equals(langCd));
                }
        ).toList();

        return tcdCdItmMlgList
                .stream()
                .map(DiseaseCategoryListResponse::of)
                .toList()
                ;
    }

    public List<ProjectPurposeListResponse> getProjectPurposeList(String langCd) {

        List<TcdCdItm> tcdCdItemList = tcdCdItmRepository.findByCdGrpId(TcdCdGrpCode.PURPOSE_CD_GRP_ID.getCode());
        List<TcdCdItmMlg> tcdCdItmMlgList = tcdCdItemList.stream().flatMap(cdItem -> {
                    return cdItem.getTcdCdItmMlgList().stream().filter(cdItemMlgs -> cdItemMlgs.getLangCd().equals(langCd));
                }
        ).toList();

        return tcdCdItmMlgList
                .stream()
                .map(ProjectPurposeListResponse::of)
                .toList()
                ;
    }

    public List<ProjectProcessListResponse> getProjectProcessList() {
        return tcdPrcsRepository.findByOrderBySortNum()
                .stream()
                .map(ProjectProcessListResponse::of)
                .toList();
    }

    @Transactional
    public ProjectCreateResponse createProject(ProjectCreateRequest request, PlatformUserInfo details) {
        TusUsr user = tusUsrRepository.findById(details.getUsrUid()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_USR_UUID_ERROR));

        request.isValidate(user);

        TusCorp tusCorp = tusCorpRepository.findById(user.getTusCorp().getId()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_CORP_NUM_ERROR));

        //프로젝트 생성
        TpjPrj tpjPrj = tpjPrjRepository.save(request.toEntity(DEL_N, user, tusCorp, TcdCdGrpItmCode.PROJECT_ON_GOING.getCode()));

        //프로젝트 인허가 생성
        List<TpjPrjRgltrAfr> tpjPrjRgltrAfrList = tpjPrjRgltrAfrRepository.saveAll(request.toTpjPrjRgltrAfrEntitys(tpjPrj));

        //프로젝트 대상 국가 생성
        List<TpjPrjTgMakt> tpjPrjTgMaktList = tpjPrjTgMaktRepository.saveAll(request.toTpjPrjTgMaktEntitys(tpjPrj));
        tpjPrj.setTpjPrjRgltrAfrList(tpjPrjRgltrAfrList);
        tpjPrj.setTpjPrjTgMaktList(tpjPrjTgMaktList);

        String notInProgress = getProgressCode(TcdCdGrpCode.PROCESS_STATUS_CD_GRP_ID.getCode(), TcdCdGrpItmCode.PROCESS_NOT_IN_PROGRESS.getCode());
        String inProgress = getProgressCode(TcdCdGrpCode.PROCESS_STATUS_CD_GRP_ID.getCode(), TcdCdGrpItmCode.PROCESS_ON_GOING.getCode());

        //프로젝트 프로세스 생성
        List<TpjPrjPrcs> tpjPrjPrcsList = tpjPrjPrcsRepository.saveAll(request.toTpjPrjPrcsEntitys(tpjPrj, notInProgress, inProgress));

        //프로젝트 프로세스 히스토리 생성
//        tpjPrjPrcsStsRepository.saveAll(request.toTpjPrjPrcsStsEntitys(tpjPrjPrcsList, notInProgress, inProgress));
        tpjPrjPrcsStsRepository.saveAll(request.toTpjPrjPrcsStsEntitys(tpjPrjPrcsList, inProgress));

        request.getMembers().forEach(member -> {
            TusUsr mbr = tusUsrRepository.findById(member.getMemberId()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_USR_UUID_ERROR));
            //프로젝트 멤버 생성
            TpjPrjMbr tpjPrjMbr = tpjPrjMbrRepository.save(member.toTpjPrjMbrEntity(tpjPrj, mbr, MANAGER_ADD));
            TpjPrjMbrHst tpjPrjMbrHst = tpjPrjMbrHstRepository.save(TpjPrjMbrHst.of(tpjPrjMbr, CREATE));
            if (!Objects.equals(member.getProjectManagerYn(), ProjectManagerYn.Y) && !CollectionUtils.isEmpty(member.getMemberProcess())) {
                //프로젝트 프로세스별 멤버 역할 생성
                member.getMemberProcess().forEach(memberProcess -> {
                    List<TpjPrjPrcs> meberPrcsList = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCdIn(tpjPrj.getId(), memberProcess.getProcessCodes());
                    List<TpjPrjPrcsMbr> tpjPrjPrcsMbrs = tpjPrjPrcsMbrRepository.saveAll(memberProcess.toTpjPrjPrcsMbrEntitys(meberPrcsList, tpjPrjMbr));
                    tpjPrjPrcsMbrHstRepository.saveAll(tpjPrjPrcsMbrs.stream().map(tpjPrjPrcsMbr -> TpjPrjPrcsMbrHst.of(tpjPrjPrcsMbr, tpjPrjMbrHst, CREATE)).toList());
                });
            }
        });
        log.info("create project success");
        return ProjectCreateResponse.of(tpjPrj);
    }

    @Transactional
    public void updateProjectStatus(Long projectId, PlatformUserInfo details, ProjectStatusUpdateRequest request) {

        TpjPrj tpjPrj = tpjPrjRepository.findByIdAndDelYn(projectId, DEL_N).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_PROJECT_ID_ERROR));
        // 진행중인 프로세스가 존재 할 경우 프로젝트 완료 및 중지 불가능
        boolean onGoing = tpjPrj.getTpjPrjPrcsList().stream().anyMatch(tpjPrjPrcs -> TcdCdGrpItmCode.PROCESS_ON_GOING.getCode().equals(tpjPrjPrcs.getPrcsStsCd()));
        if (onGoing && (TcdCdGrpItmCode.PROJECT_COMPLETED.getCode().equals(request.getPrjStsCd()) || TcdCdGrpItmCode.PROJECT_ABORTED.getCode().equals(request.getPrjStsCd()))) {
            throw new BusinessException(ErrorCode.EXISTS_ON_GOING_PROCESS);
        }
        tpjPrj.setPrjStsCd(request.getPrjStsCd());


    }

    @Transactional
    public void updateProject(Long projectId, ProjectUpdateRequest request, PlatformUserInfo details) {
        request.validate();
        //프로젝트 정보 업데이트
        TpjPrj tpjPrj = tpjPrjRepository.findByIdAndDelYn(projectId, DEL_N).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_PROJECT_ID_ERROR));

        tpjPrj.of(request);
        //프로젝트 인허가 / 대상 국가 수정 수정
        tpjPrjRgltrAfrRepository.deleteByTpjPrjId(projectId);
        tpjPrjTgMaktRepository.deleteByTpjPrjId(projectId);

        tpjPrjRgltrAfrRepository.flush();
        tpjPrjTgMaktRepository.flush();

        tpjPrjRgltrAfrRepository.saveAll(request.toTpjPrjRgltrAfrEntitys(tpjPrj));
        tpjPrjTgMaktRepository.saveAll(request.toTpjPrjTgMaktEntitys(tpjPrj));

        String notInProgress = getProgressCode(TcdCdGrpCode.PROCESS_STATUS_CD_GRP_ID.getCode(), TcdCdGrpItmCode.PROCESS_NOT_IN_PROGRESS.getCode());

        if (!CollectionUtils.isEmpty(request.getProcessCodes())) {
            request.getProcessCodes().forEach(processRequest -> {
                //프로젝트 프로세스 수정
                if (Objects.equals(processRequest.getProcessOperation(), ProcessOperation.ADD)) {
                    tpjPrjPrcsRepository.save(processRequest.toTpjPrjPrcsEntity(tpjPrj, notInProgress));


                } else {
                    //프로젝트 프로세스 삭제
                    TpjPrjPrcs tpjPrjPrcs = tpjPrj.getTpjPrjPrcsList().stream().filter(prjPrcs -> ((prjPrcs.getTpjPrj().getId() == tpjPrj.getId()) && (prjPrcs.getPrcsCd().equals(processRequest.getProcessCode())))).findFirst().orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_PROJECT_PROCESS_ERROR));
                    tpjPrjPrcsMbrRepository.deleteAll(tpjPrjPrcs.getTpjPrjPrcsMbrList());
                    tpjPrjPrcsStsRepository.deleteAll(tpjPrjPrcs.getTpjPrjPrcStsList());
                    tpjPrjPrcsRepository.deleteById(tpjPrjPrcs.getId());

                }
                tpjPrjPrcsMbrRepository.flush();
                tpjPrjPrcsStsRepository.flush();
                tpjPrjPrcsRepository.flush();
            });
        }

        List<Long> prjPrcssNumList = tpjPrj.getTpjPrjPrcsList().stream().map(TpjPrjPrcs::getId).toList();
        List<String> prjPrcss = tpjPrj.getTpjPrjPrcsList().stream().map(TpjPrjPrcs::getPrcsCd).toList();

        if (!CollectionUtils.isEmpty(request.getMembers())) {
            //프로젝트 멤버 수정
            request.getMembers().forEach(memberRequest -> {
                //기존 데이터와 비교해야 함으로 validation에서 미리 검증할 수 없다.
                if (Objects.equals(tpjPrj.getTusUsr().getId(), memberRequest.getMemberId())) {
                    throw new InvalidValueException("Project creators cannot be modified.");
                }
                // 멤버 추가
                if (Objects.equals(memberRequest.getProjectMemberOperation(), ProjectMemberOperation.ADD)) {
                    TusUsr member = tusUsrRepository.findById(memberRequest.getMemberId()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_USR_UUID_ERROR));
                    TpjPrjMbr tpjPrjMbr = tpjPrjMbrRepository.save(memberRequest.toTpjPrjMbrEntity(tpjPrj, member, MANAGER_ADD));
                    TpjPrjMbrHst tpjPrjMbrHst = tpjPrjMbrHstRepository.save(TpjPrjMbrHst.of(tpjPrjMbr, CREATE));
                    if (!CollectionUtils.isEmpty(memberRequest.getMemberProcess())) {
                        //프로젝트 프로세스별 멤버 역할 생성
                        memberRequest.getMemberProcess().forEach(memberProcess -> {
                            if (!new HashSet<>(prjPrcss).containsAll(memberProcess.getProcessCodes())) {
                                throw new InvalidValueException("The member's process must be selected as the project's process.");
                            }

                            List<TpjPrjPrcs> tpjPrjPrcsList = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCdIn(tpjPrj.getId(), memberProcess.getProcessCodes());
                            List<TpjPrjPrcsMbr> tpjPrjPrcsMbrs = tpjPrjPrcsMbrRepository.saveAll(memberProcess.toTpjPrjPrcsMbrEntitys(tpjPrjPrcsList, tpjPrjMbr));
                            tpjPrjPrcsMbrHstRepository.saveAll(tpjPrjPrcsMbrs.stream().map(tpjPrjPrcsMbr -> TpjPrjPrcsMbrHst.of(tpjPrjPrcsMbr, tpjPrjMbrHst, CREATE)).toList());
                        });
                    }
                }
                //멤버 수정
                else if (Objects.equals(memberRequest.getProjectMemberOperation(), ProjectMemberOperation.UPDATE)) {
                    TpjPrjMbr tpjPrjMbr = tpjPrjMbrRepository.findByTpjPrjIdAndTusUsrId(tpjPrj.getId(), memberRequest.getMemberId()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_PROJECT_MEMBER_ERROR));
                    //Role Code Update
                    tpjPrjMbr.updateByProjectUpdate(memberRequest.getProjectManagerYn().getCode());
                    TpjPrjMbrHst tpjPrjMbrHst = tpjPrjMbrHstRepository.save(TpjPrjMbrHst.of(tpjPrjMbr, UPDATE));
                    //프로젝트 매니저로 변경될 경우 기존 프로세스 멤버 정보 일괄 삭제
                    if (Objects.equals(memberRequest.getProjectManagerYn(), ProjectManagerYn.Y)) {

                        List<TpjPrjPrcsMbr> tpjPrjPrcsMbrs = tpjPrjPrcsMbrRepository.findByTpjPrjPrcsIdInAndTpjPrjMbrId(prjPrcssNumList, tpjPrjMbr.getId());

                        tpjPrjPrcsMbrs.forEach(tpjPrjPrcsMbr -> {
                            tpjPrjPrcsMbrRepository.delete(tpjPrjPrcsMbr);
                            tpjPrjPrcsMbrRepository.flush();
                            tpjPrjPrcsMbrHstRepository.save(TpjPrjPrcsMbrHst.of(tpjPrjPrcsMbr, tpjPrjMbrHst, DELETE));
                        });
                    } else {
                        memberRequest.getMemberProcess().forEach(memberProcess ->
                                memberProcess.getProcessCodes().forEach(process -> {
                                    //수정된 프로젝트 프로세스 안에 포함되어 있는지 체크
                                    if (!prjPrcss.contains(process)) {
                                        throw new InvalidValueException(memberRequest.getMemberId() + "'s " + process + " is not included in project's process");
                                    }

                                    TpjPrjPrcs tpjPrjPrcs = tpjPrj.getTpjPrjPrcsList().stream().filter(prjPrcs -> (prjPrcs.getTpjPrj().getId() == tpjPrj.getId() && prjPrcs.getPrcsCd().equals(process))).findFirst().orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_PROJECT_PROCESS_ERROR));

                                    if (!tpjPrjPrcsMbrRepository.existsByTpjPrjPrcsIdAndTpjPrjMbrId(tpjPrjPrcs.getId(), tpjPrjMbr.getId())) {
                                        TpjPrjPrcsMbr tpjPrjPrcsMbr = tpjPrjPrcsMbrRepository.save(TpjPrjPrcsMbr.builder()
                                                .tpjPrjPrcs(tpjPrjPrcs)
                                                .tpjPrjMbr(tpjPrjMbr)
                                                .prcsRolCd(memberProcess.getProcessRoleCode())
                                                .build());
                                        tpjPrjPrcsMbrHstRepository.save(TpjPrjPrcsMbrHst.of(tpjPrjPrcsMbr, tpjPrjMbrHst, CREATE));
                                    } else {
                                        TpjPrjPrcsMbr tpjPrjPrcsMbr = tpjPrjPrcsMbrRepository.findByTpjPrjMbrIdAndTpjPrjPrcsId(tpjPrjMbr.getId(), tpjPrjPrcs.getId()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_PROJECT_PROCESS_MEMBER_ERROR));
                                        if (!Objects.equals(memberProcess.getProcessRoleCode(), tpjPrjPrcsMbr.getPrcsRolCd())) {
                                            tpjPrjPrcsMbr.updateByProjectUpdate(memberProcess.getProcessRoleCode());
                                            tpjPrjPrcsMbrHstRepository.save(TpjPrjPrcsMbrHst.of(tpjPrjPrcsMbr, tpjPrjMbrHst, UPDATE));
                                        }
                                    }
                                }));
                        // 리퀘스트에 포함되지 않은 프로세스는 삭제처리
                        List<TpjPrjPrcsMbr> tpjPrjPrcsMbrs = tpjPrjPrcsMbrRepository.findByTpjPrjPrcsIdInAndTpjPrjMbrId(prjPrcssNumList, tpjPrjMbr.getId());
//                        List<TpjPrjPrcsMbr> tpjPrjPrcsMbrs = tpjPrjPrcsMbrRepository.findByPrjNumAndUsrUid(tpjPrj.getPrjNum(), memberRequest.getMemberId());
                        tpjPrjPrcsMbrs.forEach(tpjPrjPrcsMbr -> {
                            boolean containCheck = memberRequest.getMemberProcess().stream().anyMatch(processRequest -> processRequest.getProcessCodes().contains(tpjPrjPrcsMbr.getTpjPrjPrcs().getPrcsCd()));
                            if (!containCheck) {
                                tpjPrjPrcsMbrRepository.delete(tpjPrjPrcsMbr);
                                tpjPrjPrcsMbrRepository.flush();
                                tpjPrjPrcsMbrHstRepository.save(TpjPrjPrcsMbrHst.of(tpjPrjPrcsMbr, tpjPrjMbrHst, DELETE));
                            }
                        });
                    }
                } else {
                    TpjPrjMbr tpjPrjMbr = tpjPrjMbrRepository.findByTpjPrjIdAndTusUsrId(tpjPrj.getId(), memberRequest.getMemberId()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_PROJECT_MEMBER_ERROR));
                    TpjPrjMbrHst tpjPrjMbrHst = tpjPrjMbrHstRepository.save(TpjPrjMbrHst.of(tpjPrjMbr, DELETE));
                    tpjPrjMbrHstRepository.save(TpjPrjMbrHst.of(tpjPrjMbr, DELETE));
                    List<TpjPrjPrcsMbr> tpjPrjPrcsMbrs = tpjPrjPrcsMbrRepository.findByTpjPrjPrcsIdInAndTpjPrjMbrId(prjPrcssNumList, tpjPrjMbr.getId());
//                    List<TpjPrjPrcsMbr> tpjPrjPrcsMbrs = tpjPrjPrcsMbrRepository.findByPrjNumAndUsrUid(tpjPrj.getPrjNum(), memberRequest.getMemberId());
                    tpjPrjPrcsMbrs.forEach(tpjPrjPrcsMbr -> {
                        tpjPrjPrcsMbrRepository.delete(tpjPrjPrcsMbr);
                        tpjPrjPrcsMbrRepository.flush();
                        tpjPrjPrcsMbrHstRepository.save(TpjPrjPrcsMbrHst.of(tpjPrjPrcsMbr, tpjPrjMbrHst, DELETE));
                    });
                    tpjPrjMbrRepository.delete(tpjPrjMbr);
                    tpjPrjMbrRepository.flush();
                }
            });
        }

        TpjPrj updatedTpjPrj = tpjPrjRepository.findByIdAndDelYn(tpjPrj.getId(), DEL_N).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_PROJECT_ID_ERROR));

//        List<TpjPrjPrcsMbr> tpjPrjPrcsMbrList = updatedTpjPrj.getTpjPrjPrcsList().stream().filter(tpjPrjPrcs -> (tpjPrjPrcs!=null && tpjPrjPrcs.getTpjPrjPrcsMbrList() != null && tpjPrjPrcs.getTpjPrjPrcsMbrList().size()>0)).flatMap(tpjPrjPrcs ->  tpjPrjPrcs.getTpjPrjPrcsMbrList().stream()).collect(Collectors.toList());
        List<TpjPrjPrcsMbr> tpjPrjPrcsMbrList = updatedTpjPrj.getTpjPrjPrcsList().stream().flatMap(tpjPrjPrcs -> tpjPrjPrcs.getTpjPrjPrcsMbrList().stream()).collect(Collectors.toList());
        // 멤버별 프로세스는 프로젝트의 프로세스 안에 포함된 프로세스여야 한다.
        tpjPrjPrcsMbrList.forEach(tpjPrjPrcsMbr -> {
            if (!prjPrcss.contains(tpjPrjPrcsMbr.getTpjPrjPrcs().getPrcsCd())) {
                throw new InvalidValueException(tpjPrjPrcsMbr.getTpjPrjPrcs().getTpjPrj().getTusUsr().getId() + "'s "
                        + tpjPrjPrcsMbr.getTpjPrjPrcs().getPrcsCd() + " is not included in the project's process code.");
            }

            log.info("update project success");
        });





        // Send alarm to all member
        log.info("Send alarm to all member");

        List<TpjPrjMbr> originPjmMbr = tpjPrj.getTpjPrjMbrList().stream().filter(tpjPrjMbr -> ProjectManagerYn.Y.getCode().equals(tpjPrjMbr.getPrjRolCd())).collect(Collectors.toList());
        List<TpjPrjMbr> updatedPjmMbr = updatedTpjPrj.getTpjPrjMbrList().stream().filter(tpjPrjMbr -> ProjectManagerYn.Y.getCode().equals(tpjPrjMbr.getPrjRolCd())).collect(Collectors.toList());

        List<TpjPrjMbr>  originDiffRslt =originPjmMbr.stream().filter(o -> updatedPjmMbr.stream().noneMatch(n -> {
            return o.getId() == n.getId();
        })).collect(Collectors.toList());

        List<TpjPrjMbr>  updatedDiffRslt =updatedPjmMbr.stream().filter(n -> originPjmMbr.stream().noneMatch(o -> {
            return n.getId() == o.getId();
        })).collect(Collectors.toList());

        tpjPrjPrcsMbrList.forEach(tpjPrjPrcsMbr -> {
            // when a process has been added
            request.getProcessCodes().forEach(processRequest -> {
                if (Objects.equals(processRequest.getProcessOperation(), ProcessOperation.ADD)) {
                    // alarm Call
                    externalService.sendNotification(
                            NotiSenderRequest.builder()
                                    .notfCd(ProjectAlarmCode.PROJECT_PROCESS_ALARM.getCode())
                                    .usrUid(tpjPrjPrcsMbr.getTpjPrjMbr().getTusUsr().getId())
                                    .prjNm(tpjPrj.getPrjNm())
                                    .dissCatCd(tpjPrj.getDissCatCd())
                                    .content(Map.of("{ID}", tpjPrj.getId(), "{Process}", tcdCdItmRepository.findByCdGrpId(processRequest.getProcessCode())))
                                    .build()
                            , details);

                }
            });

            // when a project info has been modified
            if (tpjPrj.getMdfDt().compareTo(updatedTpjPrj.getMdfDt()) != 0) {
                externalService.sendNotification(
                        NotiSenderRequest.builder()
                                .notfCd(ProjectAlarmCode.PROJECT_INFO_ALARM.getCode())
                                .usrUid(tpjPrjPrcsMbr.getTpjPrjMbr().getTusUsr().getId())
                                .prjNm(updatedTpjPrj.getPrjNm())
                                .dissCatCd(updatedTpjPrj.getDissCatCd())
                                .content(Map.of("{ID}", updatedTpjPrj.getId()))
                                .build()
                        , details);
            }
            // when a project manager has been modified
            if(originDiffRslt.size()>0 || updatedDiffRslt.size()>0){
                externalService.sendNotification(
                        NotiSenderRequest.builder()
                                .notfCd(ProjectAlarmCode.PROJECT_MANAGER_ALARM.getCode())
                                .usrUid(tpjPrjPrcsMbr.getTpjPrjMbr().getTusUsr().getId())
                                .prjNm(updatedTpjPrj.getPrjNm())
                                .dissCatCd(updatedTpjPrj.getDissCatCd())
                                .content(Map.of("{ID}", updatedTpjPrj.getId()))
                                .build()
                        , details);
            }
        });

    }

    @Transactional
    public void deleteProject(Long projectId) {
        log.info("delete project success");
        TpjPrj tpjPrj = tpjPrjRepository.findByIdAndDelYn(projectId, DEL_N).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR));
        tpjPrj.setDelYn(DEL_Y);
    }

    public List<ProjectHistoryListResponse> getProjectHistoryList(Long projectId, String langCd) {
//    public Page<ProjectHistoryListResponse> getProjectHistoryList(Long projectId, String langCd, Pageable pageable) {

        String completedProgress = getProgressCode(TcdCdGrpCode.PROCESS_STATUS_CD_GRP_ID.getCode(), TcdCdGrpItmCode.PROCESS_DONE.getCode());
        String pauseProgress = getProgressCode(TcdCdGrpCode.PROCESS_STATUS_CD_GRP_ID.getCode(), TcdCdGrpItmCode.PROCESS_PAUSE.getCode());
        TpjPrj tpjPrj = tpjPrjRepository.findByIdAndDelYn(projectId, DEL_N).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR));
        List<TpjPrjPrcs> prjPrcsList = tpjPrj.getTpjPrjPrcsList();

        List<TpjPrjPrcsSts> prjPrcsStsList = tpjPrjPrcsStsRepository.findByTpjPrjPrcsIdInOrderByStsDtDesc(prjPrcsList.stream().map(TpjPrjPrcs::getId).collect(Collectors.toList()));

        int size = prjPrcsStsList.size();
        AtomicInteger atmc = new AtomicInteger();
        List<ProjectHistoryListResponse> responses = prjPrcsStsList.stream().map(tpjPrjPrcsSts ->
        {
            int index = atmc.getAndIncrement();
            String statusCode = tpjPrjPrcsSts.getPrcsStsCd();
            String process = tcdPrcsRepository.findById(tpjPrjPrcsSts.getTpjPrjPrcs().getPrcsCd()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR)).getPrcsNm();
            TcdCdItm tcdCdItm = tcdCdItmRepository.findByCdGrpIdAndCd(TcdCdGrpCode.PROCESS_STATUS_CD_GRP_ID.getCode(), statusCode).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR));

            String startDate = convertDateTime(tpjPrjPrcsSts.getStsDt(), getDateTimeFormatter(DATE_TIME_FORMAT));
            String endDate = null;
            //프로세스가 완료 일 경우
            if (tpjPrjPrcsSts.getPrcsStsCd().equals(completedProgress) && (index + 1 < size)) {
                endDate = index==0?convertDateTime(prjPrcsStsList.get(index).getMdfDt(), getDateTimeFormatter(DATE_TIME_FORMAT)):convertDateTime(prjPrcsStsList.get(index - 1).getStsDt(), getDateTimeFormatter(DATE_TIME_FORMAT));
            } else if (tpjPrjPrcsSts.getPrcsStsCd().equals(completedProgress) && index == size - 1) {
                endDate = convertDateTime(tpjPrjPrcsSts.getStsDt(), getDateTimeFormatter(DATE_TIME_FORMAT));
            } else if (tpjPrjPrcsSts.getPrcsStsCd().equals(pauseProgress) && index + 1 < size){
                //프로세스가 중지 일 경우
                endDate = convertDateTime(prjPrcsStsList.get(index).getMdfDt(), getDateTimeFormatter(DATE_TIME_FORMAT));
            }
            String status = tcdCdItm.getTcdCdItmMlgList().stream().filter(tcdCdItmMlg -> tcdCdItmMlg.getLangCd().equals(langCd)).findAny().orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR)).getCdNm();
            String member = tusUsrRepository.findById(tpjPrjPrcsSts.getMdfrUid()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR)).getUsrNm();
//            String lastUpdateDate = convertDateTime(tpjPrjPrcsSts.getStsDt(), getDateTimeFormatter(DATE_TIME_FORMAT));
            String lastUpdateDate = convertDateTime(tpjPrjPrcsSts.getMdfDt(), getDateTimeFormatter(DATE_TIME_FORMAT));
            return ProjectHistoryListResponse.of(tpjPrjPrcsSts.getTpjPrjPrcs().getPrcsCd(), process, statusCode, status, startDate, endDate, member, lastUpdateDate);
        }).collect(Collectors.toList());

        return responses;
//        return new PageImpl<>(responses, pageable, prjPrcsStsList.getTotalPages());
    }

    public DateTimeFormatter getDateTimeFormatter(String format) {
        return DateTimeFormatter.ofPattern(format);
    }


    public Page<ProjectRequestHistoryListResponse> getProjectRequestHistory(String projectId, Pageable pageable) {
        List<ProjectRequestHistoryListResponse> projectHistoryListResponses = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            projectHistoryListResponses.add(ProjectRequestHistoryListResponse.builder()
                    .process(i % 2 == 0 ? "Feasibility" : "Oligo Design")
                    .requestId("P00" + i)
                    .requestName("ODS RequestA-14" + i)
                    .startDate("2023-06-0" + i)
                    .lastUpdateDate(i == 0 ? "오늘" : "2023-06-0" + i)
                    .status(i % 2 == 0 ? "Ongoing" : "Pause")
                    .commentCnt(i)
                    .build());
        }
        return new PageImpl<>(projectHistoryListResponses, pageable, 5);
    }

    public ProjectInfoResponse getProjectInfo(Long projectId, PlatformUserInfo details) {

        String langCd = details.getLangCode();

        TpjPrj tpjPrj = tpjPrjRepository.findByIdAndDelYn(projectId, DEL_N).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_PROJECT_ID_ERROR));

        TcdCdItm tcdCdItmPups = tcdCdItmRepository.findByCdGrpIdAndCd(TcdCdGrpCode.PURPOSE_CD_GRP_ID.getCode(), tpjPrj.getDevPupsCd()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_CODE_GROUP_ID_AND_PURPOSE_CODE_ERROR));
        String purpose = tcdCdItmPups.getTcdCdItmMlgList().stream().filter(tcdCdItmMlg -> tcdCdItmMlg.getLangCd().equals(langCd)).findFirst().orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR)).getCdNm();

        TcdCdItm tcdCdItmDiss = tcdCdItmRepository.findByCdGrpIdAndCd(TcdCdGrpCode.DISEASE_CD_GRP_ID.getCode(), tpjPrj.getDissCatCd()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_CODE_GROUP_ID_AND_DISS_CODE_ERROR));
        String diseaseCategory = tcdCdItmDiss.getTcdCdItmMlgList().stream().filter(tcdCdItmMlg -> tcdCdItmMlg.getLangCd().equals(langCd)).findFirst().orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR)).getCdNm();

        TcdCdItm tcdCdItmProgress = tcdCdItmRepository.findByCdGrpIdAndCd(TcdCdGrpCode.PROJECT_STATUS_CD_GRP_ID.getCode(), tpjPrj.getPrjStsCd()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_CODE_GROUP_ID_AND_PROJECT_STATUS_CODE_ERROR));
        String projectStatus = tcdCdItmProgress.getTcdCdItmMlgList().stream().filter(tcdCdItmMlg -> tcdCdItmMlg.getLangCd().equals(langCd)).findFirst().orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR)).getCdNm();


        Optional<TpjPrjMbr> optPrjMbr = tpjPrj.getTpjPrjMbrList().stream().filter(prjMbr -> prjMbr.getTusUsr().getId().equals(details.getUsrUid())).findFirst();

        String projectRoleCode = optPrjMbr.isPresent() ? optPrjMbr.get().getPrjRolCd() : "";
        List<ProjectInfoResponse.ProjectProcessRole> projectProcessRole = new ArrayList<>();

        // PJB 프로젝트 멤버
        if (ProjectManagerYn.N.getCode().equals(projectRoleCode)) {

            Map<String, List<TpjPrjPrcsMbr>> groupByPrcsRolCdMap = optPrjMbr.get().getTpjPrjPrcsMbrList().stream().collect(Collectors.groupingBy(TpjPrjPrcsMbr::getPrcsRolCd));

            projectProcessRole = groupByPrcsRolCdMap.keySet().stream().map(prcsRoleCd -> {
                List<String> processCodes = groupByPrcsRolCdMap.get(prcsRoleCd).stream().map(TpjPrjPrcsMbr::getTpjPrjPrcs).map(TpjPrjPrcs::getPrcsCd).collect(Collectors.toList());
                return ProjectInfoResponse.ProjectProcessRole.of(prcsRoleCd, processCodes);
            }).collect(Collectors.toList());
        }

        List<ProjectInfoResponse.MemberInfo> memberInfoList = tpjPrj.getTpjPrjMbrList().stream().filter(mbr -> ProjectManagerYn.Y.getCode().equals(mbr.getPrjRolCd())).map(tpjPrjMbr -> {

            TsyFl tsyFl = tpjPrjMbr.getTusUsr().getTsyFl();
            String filePath = tsyFl == null ? null : tsyFl.getFlPath() + tsyFl.getFlNm() + "." + tsyFl.getFlExtn();
            return ProjectInfoResponse.MemberInfo.of(filePath, tpjPrjMbr.getTusUsr().getUsrNm());
        }).toList();
        return ProjectInfoResponse.of(tpjPrj, memberInfoList, diseaseCategory, purpose, projectStatus, projectProcessRole, projectRoleCode);
    }

    public ProjectAdditionalInfoResponse getProjectAdditionalInfo(Long projectId, String langCd) {

        TpjPrj tpjPrj = tpjPrjRepository.findByIdAndDelYn(projectId, DEL_N).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR));

        List<TpjPrjTgMakt> tpjPrjTgMaktList = tpjPrj.getTpjPrjTgMaktList();

        List<String> targetCountryCodeList = tpjPrjTgMaktList.stream().map(TpjPrjTgMakt::getTgMaktCntryCd).toList();

        List<String> targetCountryNameList = tpjPrjTgMaktList.stream().map(makt -> {
            TcdCntry tcdCntry = tcdCntryRepository.findById(makt.getTgMaktCntryCd()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR));
            return getNameByLangCd(tcdCntry, langCd);
        }).toList();

        List<TpjPrjRgltrAfr> tpjPrjRgltrAfrList = tpjPrj.getTpjPrjRgltrAfrList();

        List<String> regulatoryAffairCodeList = tpjPrjRgltrAfrList.stream().map(TpjPrjRgltrAfr::getRgltrAfrCd).toList();
        List<String> regulatoryAffairNameList = tpjPrj.getTpjPrjRgltrAfrList().stream().map(rgltrAfr -> {
            return tcdCdItmRepository.findByCdGrpIdAndCd(TcdCdGrpCode.RGLTR_CD_GRP_ID.getCode(), rgltrAfr.getRgltrAfrCd()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR))
                    .getTcdCdItmMlgList().stream().filter(tcdCdItmMlg -> tcdCdItmMlg.getLangCd().equals(langCd)).findAny().orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR)).getCdNm();
        }).toList();

        return ProjectAdditionalInfoResponse.of(tpjPrj, targetCountryCodeList, targetCountryNameList, regulatoryAffairCodeList, regulatoryAffairNameList);
    }


    //
    // /**
    //  * [] 프로젝트_프로젝트 상세_planning
    //  <PRE>
    //  프로젝트_프로젝트 상세_planning 내용을 조회 한다.
    //  </PRE>
    //  @author  : 홍길동(yongtaeyu@mz.co.kr)
    //   * @date  : ${date}
    //  @return  : PlanningDetailResponse
    //  */
    // public PlanningDetailResponse getProjectPlanningDetail(String projectId) {
    //     return null;
    // }

    public PlanningBasicInfoResponse getPlanningBasicInfo(Long projectNum) {
        log.info("[getPlanningBasicInfo] create project num: " + projectNum);
        if (!tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, "PLNG").isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_PROJECT_PROCESS_ERROR);
        }
        TpjPrjPrcs tpjPrjPrcs = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, "PLNG").get();

        PlanningBasicInfoResponse planningBasicInfoResponse = PlanningBasicInfoResponse.of(tpjPrjPrcs);

        return planningBasicInfoResponse;
    }


    public void updatePlanningBasicInfo(Long projectNum, PlanningBasicInfoResponse planningBasicInfoResponse) {
        log.info("[updatePlanningBasicInfo] create project num: " + projectNum + " product type: " + planningBasicInfoResponse.getProductType() + " data type: " + planningBasicInfoResponse.getDataType());

        if (!tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, "PLNG").isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_PROJECT_PROCESS_ERROR);
        }

        TpjPrjPrcs tpjPrjPrcs = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, "PLNG").get();

        String dataType = null;
        String productType = null;

        dataType = planningBasicInfoResponse.getDataType();
        productType = planningBasicInfoResponse.getProductType();

        if (dataType != null) {
            boolean isDataTypeValid = isStringInEnum(dataType, ProjectPlanningDataTab.class, ProjectPlanningDataTab::getCode);
            if (!isDataTypeValid) {
                businessException.accept(ErrorCode.NO_SUCH_PROJECT_DATA_TYPE_ERROR);
            }

        }

        if (productType != null) {
            boolean isProductTypeValid = isStringInEnum(productType, ProjectPlanningProductTab.class,
                    ProjectPlanningProductTab::getCode);
            if (!isProductTypeValid) {
                businessException.accept(ErrorCode.NO_SUCH_PROJECT_PRODUCT_TYPE_ERROR);
            }
        }


        tpjPrjPrcs.setDtaTpCd(dataType);
        tpjPrjPrcs.setPrdTpCd(productType);

        tpjPrjPrcsRepository.save(tpjPrjPrcs);
    }


    public PlanningProgressInfoResponse getProjectDetailProgress(Long projectNum, String processCode) {
        log.info("[getProjectDetailProgress] create project id: " + projectNum);


        if (!tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, "PLNG").isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_PROJECT_PROCESS_ERROR);
        }
        TpjPrjPrcs tpjPrjPrcs = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, processCode).get();

        return PlanningProgressInfoResponse.of(tpjPrjPrcs);
    }

    @Transactional
    public void updateProjectDetailProgress(Long projectNum, PlanningProgressInfoRequest planningProgressInfoRequest, PlatformUserInfo userDetails) {
        String processCode = planningProgressInfoRequest.getProjectProcess();
        String processStatus = planningProgressInfoRequest.getProjectProcessProgress();

        log.info("[updateProjectDetailProgress] projectNum: " + projectNum + " progressCode: " + processCode + "processStatus : " + processStatus);

        boolean isProcessCodeValid = isStringInEnum(processCode, ProjectPlanningProcessCodeTab.class, ProjectPlanningProcessCodeTab::getCode);
        boolean isProcessStatusValid = isStringInEnum(processStatus, ProjectPlanningProcessStatusTab.class, ProjectPlanningProcessStatusTab::getCode);

        if (!isProcessCodeValid) {
            businessException.accept(ErrorCode.NO_SUCH_PROJECT_PROCESS_ERROR);
        }

        if (!isProcessStatusValid) {
            businessException.accept(ErrorCode.NO_SUCH_PROJECT_PROCESS_STATUS_ERROR);
        }

        // Requested status's
        TpjPrj tpjPrj = tpjPrjRepository.findByIdAndDelYn(projectNum, DEL_N).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR));

        TcdPrcs tcdPrcs = tcdPrcsRepository.findById(processCode).get();
        Long requestedSortNum = tcdPrcs.getSortNum();

        List<TpjPrjPrcs> currentProcess = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsStsCd(projectNum,
                ProjectPlanningProcessStatusTab.On_going.getCode());

        if (currentProcess.isEmpty()) {
            currentProcess = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsStsCd(projectNum,
                    ProjectPlanningProcessStatusTab.Pause.getCode());
        }

        TpjPrjPrcs newestCurrentProcess = currentProcess.get(currentProcess.size() - 1);

        if (newestCurrentProcess.getPrcsCd().equals(processCode) && newestCurrentProcess.getPrcsStsCd().equals(processStatus)) {
            businessException.accept(ErrorCode.DUPLICATE_PROJECT_PROCESS_ERROR);
        }

        Long currentProcessSortNum = tcdPrcsRepository.findById(newestCurrentProcess.getPrcsCd()).get().getSortNum();

        List<TpjPrjPrcsSts> currentProcessHistories = currentProcess.get(currentProcess.size() - 1).getTpjPrjPrcStsList();


        Long currentProcessIterationNum = currentProcessHistories.get(currentProcessHistories.size() - 1).getItrtCnt();


        if (requestedSortNum < currentProcessSortNum) {
            currentProcessIterationNum = currentProcessIterationNum + 1;
        } else if ((requestedSortNum == currentProcessSortNum) && processCode.equals(ProjectPlanningProcessStatusTab.On_going.getCode())) {
            currentProcessIterationNum = currentProcessIterationNum + 1;
        }

        // if processStatus is not waiting
        if (!processStatus.equals(ProjectPlanningProcessStatusTab.Waiting.getCode())) {

            if (!processStatus.equals(ProjectPlanningProcessStatusTab.Pause.getCode())) {
                newUpdateProcesses(projectNum, processCode, processStatus, requestedSortNum, currentProcessIterationNum);
            }

            // Update target process
            log.info("Update target process");
            TpjPrjPrcs tpjPrjPrcs = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, processCode).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR));

            if (processSetter(tpjPrjPrcs, processStatus)) {
                tpjPrjPrcsRepository.save(tpjPrjPrcs);
                // tpjPrjPrcsStsRepository.save(TpjPrjPrcsSts.of(tpjPrjPrcs));
            }

            // Record sts
            log.info("Record sts");

            if (tpjPrjPrcsStsRepository.existsByTpjPrjPrcsIdAndPrcsStsCd(tpjPrjPrcs.getId(), ProjectPlanningProcessStatusTab.On_going.getCode())) {
                List<TpjPrjPrcsSts> tpjPrjPrcsStsList = tpjPrjPrcsStsRepository.findByTpjPrjPrcsIdAndPrcsStsCd(tpjPrjPrcs.getId(), ProjectPlanningProcessStatusTab.On_going.getCode());
                TpjPrjPrcsSts tpjPrjPrcsSts = tpjPrjPrcsStsList.get(tpjPrjPrcsStsList.size() - 1);
                if (processStatus.equals(ProjectPlanningProcessStatusTab.Pause.getCode())) {
                    tpjPrjPrcsSts.setPrcsStsCd(ProjectPlanningProcessStatusTab.Pause.getCode());
                    tpjPrjPrcsSts.setItrtCnt(currentProcessIterationNum);
                    tpjPrjPrcsStsRepository.save(tpjPrjPrcsSts);
                } else {
                    tpjPrjPrcsSts.setPrcsStsCd(ProjectPlanningProcessStatusTab.Finished.getCode());
                    tpjPrjPrcsSts.setItrtCnt(currentProcessIterationNum);
                    tpjPrjPrcsStsRepository.save(tpjPrjPrcsSts);
                }


                // else, make another record that is PCNG
            } else {
                tpjPrjPrcsStsRepository.save(TpjPrjPrcsSts.of(tpjPrjPrcs, currentProcessIterationNum));
            }

            // Send alarm to all users
            log.info("Send alarm to all users");
            List<TpjPrjMbr> tpjPrjMbr = tpjPrj.getTpjPrjMbrList();
            tpjPrjMbr.stream().forEach(s -> {
                // alarm Call
                String usrUid = s.getTusUsr().getId();
                externalService.sendNotification(
                        NotiSenderRequest.builder()
                                .notfCd(ProjectAlarmCode.PROJECT_PROCESS_ALARM.getCode())
                                .usrUid(userDetails.getUsrUid())
                                .toUsrUid(usrUid)
                                .prjNm(tpjPrj.getPrjNm())
                                .dissCatCd(tpjPrj.getDissCatCd())
                                .content(Map.of("{ID}", tpjPrj.getPrjNm(), "{Process}", tcdPrcs.getPrcsNm()))
                                .build()
                        , userDetails);
            });


        }


    }

    // @Transactional
    // public void updateProjectDetailProgressTest(Long projectNum, PlanningProgressInfoRequest planningProgressInfoRequest) {
    //     String processCode = planningProgressInfoRequest.getProjectProcess();
    //     String processStatus = planningProgressInfoRequest.getProjectProcessProgress();
    //
    //     log.info("[updateProjectDetailProgress] projectNum: " + projectNum + " progressCode: " + processCode + "processStatus : " + processStatus);
    //
    //     boolean isProcessCodeValid = isStringInEnum(processCode, ProjectPlanningProcessCodeTab.class, ProjectPlanningProcessCodeTab::getCode);
    //     boolean isProcessStatusValid = isStringInEnum(processStatus, ProjectPlanningProcessStatusTab.class, ProjectPlanningProcessStatusTab::getCode);
    //
    //     if (!isProcessCodeValid) {
    //         businessException.accept(ErrorCode.NO_SUCH_PROJECT_PROCESS_ERROR);
    //     }
    //
    //     if (!isProcessStatusValid) {
    //         businessException.accept(ErrorCode.NO_SUCH_PROJECT_PROCESS_STATUS_ERROR);
    //     }
    //     TpjPrjPrcs reqTpjPrjPrcs = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, processCode).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_PROJECT_PROCESS_ERROR));
    //     List<TpjPrjPrcs> tpjPrjPrcsList = tpjPrjPrcsRepository.findByTpjPrjId(projectNum);
    //     // 현재 프로젝트에서 진행중인 프로세스 맵
    //     Map<String, Long> tcdPrcsMap = tcdPrcsRepository.findByIdInOrderBySortNum(tpjPrjPrcsList.stream().map(TpjPrjPrcs::getPrcsCd).toList()).stream().collect(Collectors.toMap(TcdPrcs::getId, TcdPrcs::getSortNum));
    //
    //     List<TpjPrjPrcsSts> tpjPrjPrcsStsList = tpjPrjPrcsStsRepository.findByTpjPrjPrcsIdInOrderByStsDtDesc(tpjPrjPrcsList.stream().map(TpjPrjPrcs::getId).toList());
    //
    //     // 해당 프로젝트의 가장 최신 프로세스 히스토리를 가져옴
    //     TpjPrjPrcsSts latestTpjPrjPrcsSts = tpjPrjPrcsStsList.get(0);
    //
    //     //요청받은 프로세스 정렬 번호
    //     Long reqPrcsSortNum = tcdPrcsMap.get(processCode);
    //     Long latestPrcsSortNum = tcdPrcsMap.get(latestTpjPrjPrcsSts.getTpjPrjPrcs().getPrcsCd());
    //
    //     // 요청받은 프로세스가 최신 히스토리보다 순번이 이전 일 경우
    //     if (reqPrcsSortNum < latestPrcsSortNum) {
    //         //최신 프로세스 상태 코드가 진행중 일 경우
    //         if (latestTpjPrjPrcsSts.getPrcsStsCd().equals(TcdCdGrpItmCode.PROCESS_ON_GOING.getCode())) {
    //             //최신 프로세스 히스토리 상태 코드 중지로 변경
    //             latestTpjPrjPrcsSts.setPrcsStsCd(TcdCdGrpItmCode.PROCESS_PAUSE.getCode());
    //             latestTpjPrjPrcsSts.setStsDt(LocalDateTime.now());
    //
    //             //해당 프로세스 상태 코드 중지로 변경
    //             latestTpjPrjPrcsSts.getTpjPrjPrcs().setPrcsStsCd(TcdCdGrpItmCode.PROCESS_PAUSE.getCode());
    //
    //
    //             if (!processStatus.equals(TcdCdGrpItmCode.PROJECT_ON_GOING.getCode()))
    //                 new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR);
    //
    //             //요청받은 프로세스 상태 코드 변경
    //             reqTpjPrjPrcs.setPrcsStsCd(processStatus);
    //             tpjPrjPrcsStsRepository.save(TpjPrjPrcsSts.of(reqTpjPrjPrcs));
    //         } else if (latestTpjPrjPrcsSts.getPrcsStsCd().equals(TcdCdGrpItmCode.PROCESS_PAUSE.getCode()) || latestTpjPrjPrcsSts.getPrcsStsCd().equals(TcdCdGrpItmCode.PROCESS_DONE.getCode())) {
    //
    //             if (!processStatus.equals(TcdCdGrpItmCode.PROJECT_ON_GOING.getCode()))
    //                 new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR);
    //
    //             //요청받은 프로세스 상태 코드 변경
    //             reqTpjPrjPrcs.setPrcsStsCd(processStatus);
    //             tpjPrjPrcsStsRepository.save(TpjPrjPrcsSts.of(reqTpjPrjPrcs));
    //         }
    //     }
    //     // 요청받은 프로세스가 순번이 최신 히스토리보다 이후 일 경우
    //     else if (reqPrcsSortNum > latestPrcsSortNum) {
    //         if (latestTpjPrjPrcsSts.getPrcsStsCd().equals(TcdCdGrpItmCode.PROCESS_ON_GOING.getCode())) {
    //             //최신 프로세스 히스토리 상태 코드 완료로 변경
    //             latestTpjPrjPrcsSts.setPrcsStsCd(TcdCdGrpItmCode.PROCESS_DONE.getCode());
    //             latestTpjPrjPrcsSts.setStsDt(LocalDateTime.now());
    //
    //             //해당 프로세스 상태 코드 완료로 변경
    //             latestTpjPrjPrcsSts.getTpjPrjPrcs().setPrcsStsCd(TcdCdGrpItmCode.PROCESS_DONE.getCode());
    //
    //             if (!processStatus.equals(TcdCdGrpItmCode.PROJECT_ON_GOING.getCode()))
    //                 new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR);
    //             //요청받은 프로세스 상태 코드 변경
    //             reqTpjPrjPrcs.setPrcsStsCd(processStatus);
    //             tpjPrjPrcsStsRepository.save(TpjPrjPrcsSts.of(reqTpjPrjPrcs));
    //         } else if (latestTpjPrjPrcsSts.getPrcsStsCd().equals(TcdCdGrpItmCode.PROCESS_PAUSE.getCode()) || latestTpjPrjPrcsSts.getPrcsStsCd().equals(TcdCdGrpItmCode.PROCESS_DONE.getCode())) {
    //
    //             if (!processStatus.equals(TcdCdGrpItmCode.PROJECT_ON_GOING.getCode()))
    //                 new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR);
    //
    //             //요청받은 프로세스 상태 코드 변경
    //             reqTpjPrjPrcs.setPrcsStsCd(processStatus);
    //             tpjPrjPrcsStsRepository.save(TpjPrjPrcsSts.of(reqTpjPrjPrcs));
    //         }
    //     } else {
    //         // 순번이 같은 경우
    //         if (latestTpjPrjPrcsSts.getPrcsStsCd().equals(TcdCdGrpItmCode.PROCESS_ON_GOING.getCode())) {
    //
    //             if (processStatus.equals(TcdCdGrpItmCode.PROJECT_ON_GOING.getCode()))
    //                 new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR);
    //
    //             // PAUSE or DONE
    //             latestTpjPrjPrcsSts.setPrcsStsCd(processStatus);
    //             latestTpjPrjPrcsSts.setStsDt(LocalDateTime.now());
    //
    //             //요청 프로세스 상태 코드 변경
    //             reqTpjPrjPrcs.setPrcsStsCd(processStatus);
    //
    //             // 완료 일 경우 다음 프로세스가 존재하면 다음 프로세스를 진행중으로 변경해줘야 한다.
    //             if (processStatus.equals(TcdCdGrpItmCode.PROCESS_DONE.getCode())) {
    //                 String prcsCd = "";
    //                 for(Map.Entry<String, Long> entry : tcdPrcsMap.entrySet()){
    //                     if(reqPrcsSortNum < entry.getValue()){
    //                         prcsCd = entry.getKey();
    //                         break;
    //                     }
    //                 }
    //                 //프로세스 상태를 진행중으로 변경
    //                 TpjPrjPrcs tpjPrjPrcs = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, prcsCd).orElseThrow(()-> new BusinessException(ErrorCode.NO_SUCH_PROJECT_PROCESS_ERROR));
    //                 tpjPrjPrcs.setPrcsStsCd(TcdCdGrpItmCode.PROCESS_ON_GOING.getCode());
    //                 //프로세스 히스토리에 진행중으로 새로 추가
    //                 tpjPrjPrcsStsRepository.save(TpjPrjPrcsSts.of(tpjPrjPrcs));
    //
    //             }
    //         } else if (latestTpjPrjPrcsSts.getPrcsStsCd().equals(TcdCdGrpItmCode.PROCESS_PAUSE.getCode()) || latestTpjPrjPrcsSts.getPrcsStsCd().equals(TcdCdGrpItmCode.PROCESS_DONE.getCode())) {
    //
    //             if (!processStatus.equals(TcdCdGrpItmCode.PROJECT_ON_GOING.getCode()))
    //                 new BusinessException(ErrorCode.NO_SUCH_ENTITY_ERROR);
    //             //요청 프로세스 상태 코드 변경
    //             reqTpjPrjPrcs.setPrcsStsCd(processStatus);
    //             tpjPrjPrcsStsRepository.save(TpjPrjPrcsSts.of(reqTpjPrjPrcs));
    //         }
    //     }
    //
    //
    // }

    public Page<DocumentResponse> getProjectPlanningDocumentList(
            String fileStatus,
            String fileType,
            String keyword, Long projectNum, Pageable pageable,
            PlatformUserInfo userDetails) {

        log.info("[getDocumentList] create project id: " + projectNum + " keyword: " + keyword);

        String process = ProjectPlanningProcessCodeTab.Planning.getCode();

        if (!tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, process).isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_PROJECT_PROCESS_ERROR);
        }

        if (fileStatus != null && !tcdCdItmRepository.findByCdGrpIdAndCd(TcdCdGrpCode.FILE_STATUS_CD_GRP_ID.getCode(),fileType).isPresent()){
            businessException.accept(ErrorCode.NO_SUCH_PROJECT_FILE_STATUS_ERROR);
        }

        if (fileType != null && !tcdCdItmRepository.findByCdGrpIdAndCd(TcdCdGrpCode.FILE_TYPE_CD_GRP_ID.getCode(), fileType).isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_PROJECT_FILE_TYPE_ERROR);
        }

        TpjPrjPrcs tpjPrjPrcs = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, process).get();

        Map<String, Object> param = new HashMap<>();

        // put project process info
        param.put("projectProcessNum", tpjPrjPrcs.getId());

        // put keyword search
        param.put("projectPlanningDocumentStatusTab", fileStatus == null ? null : fileStatus);
        param.put("projectPlanningDocumentTypeTab", fileType == null ? null : fileType);
        param.put("keyword", keyword == null ? null : keyword);

        //pagable
        param.put("pageOffset", pageable.getOffset());
        param.put("pageSize", pageable.getPageSize());


        List<DocumentResponse> planningDocumentResponses = Optional.ofNullable(projectMapper.getProjectPlanningDocumentList(param)).get().stream().map(v -> DocumentResponse.planningOf(v)).collect(Collectors.toList());

        for (DocumentResponse planningDocumentResponse : planningDocumentResponses) {

            // Convert document type
            ProjectPlanningDocumentTypeTab convertedTab = fromProjectPlanningDocumentTypeTabToCode(planningDocumentResponse.getFileType());
            planningDocumentResponse.setFileType(convertedTab.toString());

        }

        Page<DocumentResponse> pages = new PageImpl<>(planningDocumentResponses, pageable, planningDocumentResponses.size());

        if (pageable.getOffset() == 0) {
            externalService.sendVistPage(
                    VistPageRequest.builder()
                            .pageUrl("http://seegene.com")
                            .title(tpjPrjPrcs.getTpjPrj().getPrjNm())
                            .content("Planning > Planning detail")
                            .build(),
                    userDetails
            );
        }

        return pages;
    }

    public DocumentGetDetailResponse getProjectDocumentDetail(Long documentNum, String userUid) {
        log.info("[getProjectDocumentDetail] document id: " + documentNum);

        // Check user exists
        if (!tusUsrRepository.existsById(userUid)) {
            businessException.accept(ErrorCode.NO_SUCH_USR_UUID_ERROR);
        }

        if (!tpjPrjFlRepository.findById(documentNum).isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_PROJECT_DOCUMENT_ERROR);
        }

        if (!tsyFlRepository.findById(documentNum).isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_FILE_ERROR);
        }

        TpjPrjFl tpjPrjFl = tpjPrjFlRepository.findById(documentNum).get();

        Long projectId = tpjPrjFl.getTpjPrjPrcs().getTpjPrj().getId();

        if (!tpjPrjMbrRepository.findByTpjPrjIdAndTusUsrId(projectId, userUid).isPresent()) {
            businessException.accept(ErrorCode.NOT_ACCESS_USER_ERROR);
        }

        TsyFl tsyFl = tsyFlRepository.findById(tpjPrjFl.getId()).get();


        return DocumentGetDetailResponse.oligoDesignOf(tpjPrjFl, tsyFl);

    }

    public void updatetProjectPlanningDocumentStaus(Long projectNum, Long documentNum, String userUid) {
        log.info("[updatetDocumentStaus] project id: " + projectNum + " document id " + documentNum);

        String process = ProjectPlanningProcessCodeTab.Planning.getCode();

        if (!tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, process).isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_PROJECT_PROCESS_ERROR);
        }

        if (!tpjPrjFlRepository.findById(documentNum).isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_FILE_ERROR);
        }

        if (!tpjPrjMbrRepository.findByTpjPrjIdAndTusUsrId(projectNum, userUid).isPresent()) {
            businessException.accept(ErrorCode.NOT_ACCESS_USER_ERROR);
        }

        TpjPrjFl tpjPrjFl = tpjPrjFlRepository.findById(documentNum).get();

        if ("N".equals(tpjPrjFl.getFnlYn())) {
            tpjPrjFl.setFnlYn("Y");
        } else if ("Y".equals(tpjPrjFl.getFnlYn())) {
            tpjPrjFl.setFnlYn("N");
        }


        tpjPrjFlRepository.save(tpjPrjFl);
    }

    public void createProjectDocument(DocumentAddRequest documentAddRequest, String userUid) {
        log.info("[createDocument] create project process num: " + documentAddRequest.getProjectProcessNum() + " document type : " + documentAddRequest.getFileType());

        Long projectProcessNum = documentAddRequest.getProjectProcessNum();
        Long fileNum = documentAddRequest.getFileNum();

        Optional<TpjPrjPrcs> tpjPrjPrcs = tpjPrjPrcsRepository.findById(projectProcessNum);

        if (!tpjPrjPrcs.isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_ENTITY_ERROR);
        }

        if (!tusUsrRepository.findTusUsrById(userUid).isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_USR_UUID_ERROR);
        }

        if (tpjPrjFlRepository.existsById(fileNum)) {
            businessException.accept(ErrorCode.DUPLICATE_FILE_ERROR);
        }

        if (!tsyFlRepository.findById(fileNum).isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_FILE_ERROR);
        }

        // Check and match file type and process code
        String processCode = tpjPrjPrcs.get().getPrcsCd();
        String fileType = documentAddRequest.getFileType();
        // For all processes other than planning
        if (!processCode.equals(ProjectPlanningProcessCodeTab.Planning.getCode())) {
            if (fileType != null) {
                businessException.accept(ErrorCode.NO_SUCH_PROJECT_DOCUMENT_TYPE_ERROR);
            }

            // For planning
        } else {
            if (fileType == null) {
                businessException.accept(ErrorCode.NO_SUCH_PROJECT_DOCUMENT_TYPE_ERROR);
            }

            boolean isProcessCodeValid = isStringInEnum(fileType, ProjectPlanningDocumentTypeTab.class, ProjectPlanningDocumentTypeTab::getCode);

            if (!isProcessCodeValid) {
                businessException.accept(ErrorCode.NO_SUCH_PROJECT_DOCUMENT_TYPE_ERROR);
            }

            ProjectPlanningDocumentTypeTab convertedTab = fromProjectPlanningDocumentTypeTabToCode(documentAddRequest.getFileType());

            String fileSetType = convertedTab.getCode();

            documentAddRequest.setFileType(fileSetType);
        }

        TusUsr tusUsr = tusUsrRepository.findTusUsrById(userUid).get();

        TpjPrjFl tpjPrjFl = tpjPrjFlRepository.save(TpjPrjFl.toEntity(documentAddRequest, tpjPrjPrcs.get(), tusUsr));

    }

    public void modifyProjectDocument(DocumentModifyRequest documentModifyRequest, String userUid) {

        // Modify file num
        Boolean fileModify = false;

        // Existing process number
        Long projectProcessNum = documentModifyRequest.getProjectProcessNum();

        // Old file number
        Long oldFileNum = documentModifyRequest.getOldFileNum();

        // New file number
        Long newFileNum = documentModifyRequest.getNewFileNum();

        log.info("[modifyProjectDocument] modify document for project process num: " + documentModifyRequest.getProjectProcessNum() + " from old file: " + oldFileNum + " to new file: " + newFileNum);

        if (!tpjPrjPrcsRepository.findById(projectProcessNum).isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_ENTITY_ERROR);
        }

        if (!tusUsrRepository.findTusUsrById(userUid).isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_USR_UUID_ERROR);
        }

        if (newFileNum != null) {
            if (tpjPrjFlRepository.existsById(newFileNum)) {
                businessException.accept(ErrorCode.DUPLICATE_FILE_ERROR);
            }

            if (!tsyFlRepository.findById(newFileNum).isPresent()) {
                businessException.accept(ErrorCode.NO_SUCH_FILE_ERROR);
            }

            fileModify = true;
        }

        if (!tsyFlRepository.findById(oldFileNum).isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_FILE_ERROR);
        }

        // Get process info
        TpjPrjPrcs tpjPrjPrcs = tpjPrjPrcsRepository.findById(projectProcessNum).get();

        TpjPrjFl tpjPrjFl = tpjPrjFlRepository.findById(oldFileNum).get();

        if (tpjPrjFl.getTpjPrjPrcs() != tpjPrjPrcs) {
            businessException.accept(ErrorCode.DOCUMENT_MODIFICATION_MATCH_ERROR);
        }

        // If modify oligo design document
        if (tpjPrjPrcs.getPrcsCd().equals(ProjectPlanningProcessCodeTab.Oligo_Design.getCode())) {

            // Get modifier info
            TusUsr tusUsr = tusUsrRepository.findTusUsrById(userUid).get();

            // Get files info
            TsyFl oldTsyFl = tsyFlRepository.findById(oldFileNum).get();

            if (fileModify) {
                TsyFl newTsyFl = tsyFlRepository.findById(newFileNum).get();

                // Modify old tsy to new tsy and delete new tsy
                oldTsyFl.setFlNm(newTsyFl.getFlNm());
                oldTsyFl.setDspFlNm(newTsyFl.getDspFlNm());
                oldTsyFl.setFlExtn(newTsyFl.getFlExtn());
                oldTsyFl.setFlPath(newTsyFl.getFlPath());
                oldTsyFl.setFlSz(newTsyFl.getFlSz());
                oldTsyFl.setStogTpCd(newTsyFl.getStogTpCd());
                oldTsyFl.setTblNm(newTsyFl.getTblNm());

                // delete new file
                s3Service.deleteObjectByTsyFl(newTsyFl);
                tsyFlRepository.deleteById(newFileNum);

                tsyFlRepository.save(oldTsyFl);
            }

            // renew tpjprjfl info (description)
            tpjPrjFl.setDscrp(documentModifyRequest.getDescription());
            tpjPrjFl.setTusUsr(tusUsr);

            tpjPrjFlRepository.save(tpjPrjFl);

        } else {
            businessException.accept(ErrorCode.DOCUMENT_MODIFICATION_NOT_ALLOWED);

        }

    }

    public void deleteProjectDocument(Long projectDocumentNum) {
        log.info("[deleteDocument] delete project id: " + projectDocumentNum);
        if (!tpjPrjFlRepository.findById(projectDocumentNum).isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_PROJECT_DOCUMENT_ERROR);
        }

        if (!tsyFlRepository.findById(projectDocumentNum).isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_FILE_ERROR);
        }

        // Delete from S3
        s3Service.deletePrivateObject(projectDocumentNum.toString());
        tsyFlRepository.deleteById(projectDocumentNum);

        // Delete from DB
        tpjPrjFlRepository.deleteById(projectDocumentNum);
    }

    public Page<DocumentResponse> getProjectOligoDesignDocumentList(
            String keyword, Long projectNum, Pageable pageable, PlatformUserInfo userDetails) {

        log.info("[getDocumentList] create project id: " + projectNum + " keyword: " + keyword);

        String process = ProjectPlanningProcessCodeTab.Oligo_Design.getCode();


        if (!tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, process).isPresent()) {
            businessException.accept(ErrorCode.NO_SUCH_PROJECT_PROCESS_ERROR);
        }

        TpjPrjPrcs tpjPrjPrcs = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, process).get();

        Map<String, Object> param = new HashMap<>();

        // put project process info
        param.put("projectProcessNum", tpjPrjPrcs.getId());

        // put keyword search
        param.put("keyword", keyword == null ? null : keyword);

        //pagable
        param.put("pageOffset", pageable.getOffset());
        param.put("pageSize", pageable.getPageSize());

        List<DocumentResponse> planningDocumentResponses = Optional.ofNullable(projectMapper.getProjectOligoDesignDocumentList(param)).get().stream().map(v -> DocumentResponse.oligoDesignOf(v)).collect(Collectors.toList());

        Page<DocumentResponse> pages = new PageImpl<>(planningDocumentResponses, pageable, planningDocumentResponses.size());

        if (pageable.getOffset() == 0) {
            externalService.sendVistPage(
                    VistPageRequest.builder()
                            .pageUrl("http://seegene.com")
                            .title(tpjPrjPrcs.getTpjPrj().getPrjNm())
                            .content("Oligo Design > Oligo Design detail")
                            .build(),
                    userDetails
            );
        }

        return pages;
    }

    // public void createProjectOligoDesignDocument(DocumentAddRequest documentAddRequest, String userUid) {
    //     log.info("[createDocument] create project process num: " + documentAddRequest.getProjectProcessNum() + " document type : " + documentAddRequest.getFileType());
    //
    //     String fileType = documentAddRequest.getFileType();
    //     Long projectProcessNum = documentAddRequest.getProjectProcessNum();
    //     Long fileNum = documentAddRequest.getFileNum();
    //
    //     boolean isProcessCodeValid = isStringInEnum(fileType, ProjectPlanningDocumentTypeTab.class, ProjectPlanningDocumentTypeTab::getCode);
    //
    //     if (!isProcessCodeValid) {
    //         businessException.accept(ErrorCode.NO_SUCH_PROJECT_PLANNING_DOCUMENT_TYPE_ERROR);
    //     }
    //
    //     if (!tpjPrjPrcsRepository.findById(projectProcessNum).isPresent()) {
    //         businessException.accept(ErrorCode.NO_SUCH_ENTITY_ERROR);
    //     }
    //
    //     if (!tusUsrRepository.findTusUsrById(userUid).isPresent()) {
    //         businessException.accept(ErrorCode.NO_SUCH_USR_UUID_ERROR);
    //     }
    //
    //     if (tpjPrjFlRepository.existsById(fileNum)) {
    //         businessException.accept(ErrorCode.DUPLICATE_FILE_ERROR);
    //     }
    //
    //     ProjectPlanningDocumentTypeTab convertedTab = fromProjectPlanningDocumentTypeTabToCode(documentAddRequest.getFileType());
    //
    //     String fileSetType = convertedTab.getCode();
    //
    //     documentAddRequest.setFileType(fileSetType);
    //
    //     TpjPrjPrcs tpjPrjPrcs = tpjPrjPrcsRepository.findById(documentAddRequest.getProjectProcessNum()).get();
    //
    //     TusUsr tusUsr = tusUsrRepository.findTusUsrById(userUid).get();
    //
    //     TpjPrjFl tpjPrjFl = tpjPrjFlRepository.save(TpjPrjFl.toEntity(documentAddRequest, tpjPrjPrcs, tusUsr));
    //
    // }

    public NoteResponse getProjectNoteList(Long prjNum, PlatformUserInfo userDetails) {
        if (tpjPrjRepository.existsById(prjNum) == false)
            throw new BusinessException(ErrorCode.NO_SUCH_PROJECT_ID_ERROR);
        if (tusUsrRepository.existsById(userDetails.getUsrUid()) == false)
            throw new BusinessException(ErrorCode.NO_SUCH_USER_ERROR);
        String usrUid = userDetails.getUsrUid();
        return NoteResponse.builder()
                .todayList(getNoteList(getNoteMongoList(prjNum, 5, usrUid))) // today note
                .thisWeekList(getNoteList(getNoteMongoList(prjNum, 1, usrUid))) // thisweek
                .lastWeekList(getNoteList(getNoteMongoList(prjNum, 2, usrUid))) // lastweek
                .oldNoteList(getNoteList(getNoteMongoList(prjNum, 3, usrUid))) // old~
                .build();
    }

    public List<NoteDetailResponse> getNoteList(List<Note> d) {
        if (d.isEmpty())
            return new ArrayList<>();
        List<NoteDetailResponse> list = new ArrayList<>();
        for (Note noteInfo : d) {
            TusUsr tusUsr = tusUsrRepository.getReferenceById(noteInfo.getFromUsrUid());
            list.add(NoteDetailResponse.builder()
                    .id(noteInfo.getId())
                    .checked(noteInfo.isChecked())
                    .cmtCnt(noteInfo.getContents())
                    .usrUid(tusUsr.getId())
                    .usrNm(tusUsr.getUsrNm())
                    .crtDt(noteInfo.getCrtDt().atZone(ZoneId.systemDefault()).withZoneSameInstant(ZoneOffset.UTC).toLocalDateTime())
                    .crtrUid(noteInfo.getCrtrUid())
                    .fileInfoResponse(FileInfoResponse.of(Optional.ofNullable(tusUsr.getTsyFl()).orElse(new TsyFl())))
                    .build());
        }
        return list;
    }

    public List<Note> getNoteMongoList(Long prjNum, int tp, String usrUid) {
        LocalDateTime startDt = null;
        LocalDateTime endDt = null;
        switch (tp) {
            case 1: // this week
                startDt = LocalDateTime.of(LocalDate.now().with(TemporalAdjusters.previous(DayOfWeek.MONDAY)), LocalTime.MIN);
                endDt = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);
                break;
            case 2: // last week
                startDt = LocalDateTime.of(LocalDate.now().with(TemporalAdjusters.previous(DayOfWeek.SUNDAY)).minusDays(6), LocalTime.MIN);
                endDt = LocalDateTime.of(LocalDate.now().with(TemporalAdjusters.previous(DayOfWeek.SUNDAY)), LocalTime.MAX);
                break;
            case 3: // old note
                startDt = LocalDateTime.of(LocalDate.now().minusYears(1), LocalTime.MIN);
                endDt = LocalDateTime.of(LocalDate.now().with(TemporalAdjusters.previous(DayOfWeek.SUNDAY)).minusDays(7), LocalTime.MAX);
                break;
            default: // today
                startDt = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
                endDt = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);
                break;
        }
        log.info("* tp: {}, start dt : {} end dt : {}", tp, startDt, endDt);
        return noteRepository.findByProjectNumAndToUsrUidAndCrtDtBetweenOrderByCrtDtDesc(prjNum, usrUid, startDt, endDt);
    }


    @Transactional
    public NoteDetailResponse getProjectNoteDetail(Long prjNum, String cmtNum, PlatformUserInfo userDetails) {
        log.info("* cmtNum : {}", cmtNum);
        log.info("* prjNum : {}", prjNum);
        if (tpjPrjRepository.existsById(prjNum) == false)
            throw new BusinessException(ErrorCode.NO_SUCH_PROJECT_ID_ERROR);

        Optional<Note> optNote = noteRepository.findById(cmtNum);
        if (optNote.isPresent()) {
            Note note = optNote.get();
            // 읽기 변경 update
            if (!note.isChecked()) {
                note.setMdfDt(LocalDateTime.now());
                note.setMdfrUid(userDetails.getUsrUid());
                note.setChecked(true);
                noteRepository.save(note);
            }
            // 조회
            TusUsr t = tusUsrRepository.getReferenceById(note.getFromUsrUid());
            return NoteDetailResponse.builder()
                    .id(note.getId())
                    .checked(note.isChecked())
                    .cmtCnt(note.getContents())
                    .usrUid(t.getId())
                    .usrNm(t.getUsrNm())
                    .crtDt(note.getCrtDt())
                    .crtrUid(note.getCrtrUid())
                    .fileInfoResponse(FileInfoResponse.of(Optional.ofNullable(t.getTsyFl()).orElse(new TsyFl())))
                    .build();
        }
        return null;
    }

    @Transactional
    public void createProjectNote(CommentAddRequest commentAddRequest, PlatformUserInfo userDetails) {
        if (tpjPrjRepository.existsById(commentAddRequest.getPrjNum()) == false)
            throw new BusinessException(ErrorCode.NO_SUCH_PROJECT_ID_ERROR);
        // 프로세스 번호가 존재 하지 않는 다면.
        if (commentAddRequest.getPrjPrcsNum() == null || commentAddRequest.getPrjPrcsNum() == 0L) {
            Optional<TpjPrj> optionalTpjPrj = tpjPrjRepository.findById(commentAddRequest.getPrjNum());
            optionalTpjPrj.ifPresent(tpjPrj -> tpjPrj.getTpjPrjMbrList().forEach(s -> createNoteContents(0L, commentAddRequest.getPrjNum(), commentAddRequest.getCmtCnt(), s.getTusUsr().getId(), userDetails)));
        } else {
            List<ProjectProcessUserResponse> userList = tpjPrjPrcsRepository.findByNoteToUserList(commentAddRequest.getPrjNum(), commentAddRequest.getPrjPrcsNum());
            userList.forEach(s -> createNoteContents(commentAddRequest.getPrjPrcsNum(), commentAddRequest.getPrjNum(), commentAddRequest.getCmtCnt(), s.usrUid(), userDetails));
        }
    }

    @Transactional
    public void createNoteContents(
            Long prjPrcsNum,
            Long prjNum,
            String contents,
            String toUsrUid, PlatformUserInfo userDetails) {
        final String notificationCd = "C014";
        // send alarm
        externalService.sendNotification(
                NotiSenderRequest.builder()
                        .usrUid(userDetails.getUsrUid())
                        .toUsrUid(toUsrUid)
                        .notfCd(notificationCd)
                        .content(Map.of("{ID}", toUsrUid))
                        .build()
                , userDetails);
        // note send
        noteRepository.save(Note.builder()
                .procNum(prjPrcsNum)
                .projectNum(prjNum)
                .fromUsrUid(userDetails.getUsrUid())
                .toUsrUid(toUsrUid)
                .checked(false)
                .contents(contents)
                .crtDt(LocalDateTime.now())
                .crtrUid(userDetails.getUsrUid())
                .mdfDt(LocalDateTime.now())
                .mdfrUid(userDetails.getUsrUid())
                .build()
        );
    }

    public void updateProjectComment(CommentRequest commentRequest) {
        log.info("[ProjectService.updateProjectComment]");
    }

    public void deleteProjectComment(Long cmtNum) {
        log.info("[ProjectService.deleteProjectComment]");
    }

    public void newUpdateProcesses(Long projectNum, String processCode, String processStatus, Long requestedSortNum, Long currentProcessIterationNum) {
        // If processStatus is PCFN, make previous processes as PCFN too, next step as PCNG, leave the rest as PCWT
        // If processStatus is PCNG, make previous processes as PCFN, leave the rest as PCWT
        // If processStatus is PCNG and changed from PCFN, make previous processes as PCFN, rest as PCWT, if any states that were PCFN for next steps, change to PCWT but leave history to PCFN


        // Get all process codes for requested project number
        List<TpjPrjPrcs> projectProcessCodes = tpjPrjPrcsRepository.findByTpjPrjId(projectNum);
        Set<String> projectProcessPropertySet = projectProcessCodes.stream()
                .map(tpjPrjPrcs -> tpjPrjPrcs.getPrcsCd())
                .collect(Collectors.toSet());

        // Get smaller/greater sort num processes
        List<TcdPrcs> smallerSortNumPrcsList = tcdPrcsRepository.findBySortNumLessThanOrderBySortNumAsc(
                requestedSortNum);
        List<TcdPrcs> greaterSortNumPrcsList = tcdPrcsRepository.findBySortNumGreaterThanOrderBySortNumAsc(
                requestedSortNum);

        // Filter with existing process codes
        smallerSortNumPrcsList = smallerSortNumPrcsList.stream()
                .filter(sortedTcdPrcs -> projectProcessPropertySet.contains(
                        sortedTcdPrcs.getId())) // Replace with the actual property you want to compare
                .collect(Collectors.toList());

        greaterSortNumPrcsList = greaterSortNumPrcsList.stream()
                .filter(sortedTcdPrcs -> projectProcessPropertySet.contains(
                        sortedTcdPrcs.getId())) // Replace with the actual property you want to compare
                .collect(Collectors.toList());

        List<TpjPrjPrcs> tpjPrjPrcsList = new ArrayList<>();
        List<TpjPrjPrcsSts> tpjPrjPrcsStsList = new ArrayList<>();


        // Next Processes
        if (!greaterSortNumPrcsList.isEmpty()) {
            for (Integer i = 0; i < greaterSortNumPrcsList.size(); i++) {
                TcdPrcs greaterSortNumPrcs = greaterSortNumPrcsList.get(i);

                if (tpjPrjPrcsChecker(projectNum, greaterSortNumPrcs.getId())) {

                    // Get next stage info
                    TpjPrjPrcs nextTpjPrjPrcs = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, greaterSortNumPrcs.getId()).get();
                    String nextProccessStatusCode = nextTpjPrjPrcs.getPrcsStsCd();

                    // if processStatus is PCFN
                    if (processStatus.equals(ProjectPlanningProcessStatusTab.Finished.getCode())) {

                        // update right after process, always change to on-going
                        if (i == 0) {
                            if (processSetter(nextTpjPrjPrcs, ProjectPlanningProcessStatusTab.On_going.getCode())) {
                                tpjPrjPrcsStsList.add(TpjPrjPrcsSts.of(nextTpjPrjPrcs, currentProcessIterationNum));
                            }
                        }
                        // if processStatus is not PCFN
                    } else {

                        // if already PCFN or PCNG, change to PCST, but do not record history if it was PCFN
                        if (nextProccessStatusCode.equals(ProjectPlanningProcessStatusTab.Finished.getCode())
                                || nextProccessStatusCode.equals(ProjectPlanningProcessStatusTab.On_going.getCode())) {

                            processSetter(nextTpjPrjPrcs, ProjectPlanningProcessStatusTab.Waiting.getCode());

                            if (nextProccessStatusCode.equals(ProjectPlanningProcessStatusTab.On_going.getCode())) {

                                List<TpjPrjPrcsSts> tpjPrjPrcsStsList2 = tpjPrjPrcsStsRepository.findByTpjPrjPrcsIdAndPrcsStsCd(
                                        nextTpjPrjPrcs.getId(), ProjectPlanningProcessStatusTab.On_going.getCode());
                                TpjPrjPrcsSts tpjPrjPrcsSts = tpjPrjPrcsStsList2.get(tpjPrjPrcsStsList2.size() - 1);
                                tpjPrjPrcsSts.setPrcsStsCd(ProjectPlanningProcessStatusTab.Finished.getCode());
                                tpjPrjPrcsSts.setItrtCnt(currentProcessIterationNum);
                                tpjPrjPrcsStsList.add(tpjPrjPrcsSts);
                            }
                        }
                    }

                    tpjPrjPrcsList.add(nextTpjPrjPrcs);
                }
            }
        }


        // Previous processes
        if (!smallerSortNumPrcsList.isEmpty()) {

            for (TcdPrcs smallerSortNumPrcs : smallerSortNumPrcsList) {

                boolean fnRequired = false;


                TpjPrjPrcs pastProcessCurrentState = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, smallerSortNumPrcs.getId()).get();

                if (pastProcessCurrentState.getPrcsStsCd().equals(ProjectPlanningProcessStatusTab.Waiting.getCode()) ||
                        pastProcessCurrentState.getPrcsStsCd().equals(ProjectPlanningProcessStatusTab.Pause.getCode())) {
                    fnRequired = true;
                }

                if (tpjPrjPrcsChecker(projectNum, smallerSortNumPrcs.getId())) {

                    // if previous processes are not in state done, change to done.
                    TpjPrjPrcs smallerTpjPrjPrcs = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(projectNum, smallerSortNumPrcs.getId()).get();
                    if (!smallerTpjPrjPrcs.getPrcsStsCd().equals(ProjectPlanningProcessStatusTab.Finished.getCode())) {
                        smallerTpjPrjPrcs.setPrcsStsCd(ProjectPlanningProcessStatusTab.Finished.getCode());
                        tpjPrjPrcsList.add(smallerTpjPrjPrcs);
                    }
                    // If already existed in sts and it was in on going, change to finish
                    // If not existed in sts (skipped), make ones
                    boolean onGoingStsExist = tpjPrjPrcsStsRepository.existsByTpjPrjPrcsIdAndPrcsStsCd(smallerTpjPrjPrcs.getId(), ProjectPlanningProcessStatusTab.On_going.getCode());
                    // boolean finishedStsExist = tpjPrjPrcsStsRepository.existsByTpjPrjPrcsIdAndPrcsStsCd(smallerTpjPrjPrcs.getId(), ProjectPlanningProcessStatusTab.Finished.getCode());

                    List<TpjPrjPrcsSts> smallerjPrjPrcsStsList = tpjPrjPrcsStsRepository.findByTpjPrjPrcsId(smallerTpjPrjPrcs.getId());

                    if (onGoingStsExist) {
                        List<TpjPrjPrcsSts> smallerTpjPrjPrcsStsList = tpjPrjPrcsStsRepository.findByTpjPrjPrcsIdAndPrcsStsCd(smallerTpjPrjPrcs.getId(), ProjectPlanningProcessStatusTab.On_going.getCode());
                        Integer lastElement = smallerTpjPrjPrcsStsList.size() - 1;
                        TpjPrjPrcsSts smallerTpjPrjPrcsSts = smallerTpjPrjPrcsStsList.get(lastElement);
                        smallerTpjPrjPrcsSts.setPrcsStsCd(ProjectPlanningProcessStatusTab.Finished.getCode());
                        smallerTpjPrjPrcsSts.setItrtCnt(currentProcessIterationNum);
                        tpjPrjPrcsStsList.add(smallerTpjPrjPrcsSts);
                    } else if (fnRequired) {
                        smallerTpjPrjPrcs.setPrcsStsCd(ProjectPlanningProcessStatusTab.Finished.getCode());
                        tpjPrjPrcsStsList.add(TpjPrjPrcsSts.of(smallerTpjPrjPrcs, currentProcessIterationNum));
                    }
                }
            }
        }


        tpjPrjPrcsRepository.saveAll(tpjPrjPrcsList);
        tpjPrjPrcsStsRepository.saveAll(tpjPrjPrcsStsList);
    }

    public boolean processSetter(TpjPrjPrcs tpjPrjPrcs, String nextProcess) {
        if (!nextProcess.equals(tpjPrjPrcs.getPrcsStsCd())) {
            tpjPrjPrcs.setPrcsStsCd(nextProcess);
            return true;
        }

        return false;
    }

    public boolean tpjPrjPrcsChecker(Long projectNum, String processCode) {

        if (!tpjPrjPrcsRepository.existsByTpjPrjIdAndPrcsCd(projectNum, processCode)) {
            businessException.accept(ErrorCode.NO_SUCH_PROJECT_PROCESS_ERROR);
        }
        return tpjPrjPrcsRepository.existsByTpjPrjIdAndPrcsCd(projectNum, processCode);
    }

    public Specification<TpjPrj> getSpecificationTpjPrj(LocalDateTime startDate, LocalDateTime endDate, String diseaseCategoryCode, String purposeCode, String processCode, String keyword, String projectTab, TusUsr user, TusCorp seegeneHQCorp) {

        Specification<TpjPrj> spec = Specification.where(TpjPrjSpecification.equalToDelYn(DEL_N));
        if (projectTab.equals("my")) {
            //사용자가 참여 인원으로 설정되어 있는 프로젝트 목록
            spec = spec.and(TpjPrjSpecification.tab(projectTab, null, user.getId()));
        } else if (projectTab.equals("newCo")) {
            //씨젠 HQ를 제외한 다른 Corporate에서 생성된 프로젝트 목록 제공
            // C레벨(Executive Manager) : 모든 NewCo의 프로젝트 목록
            if ("Executive Manager".equals(user.getTrlUsrRolApl().getTrlUsrRol().getUsrRolNm().trim())) {
                spec = spec.and(TpjPrjSpecification.tab(projectTab, seegeneHQCorp.getId(), null));
            } // 개발자/개발관리자 : 권한이 있는 NewCo의 프로젝트 목록
            else if ("Researcher".equals(user.getTrlUsrRolApl().getTrlUsrRol().getUsrRolNm().trim()) || "Research Manager".equals(user.getTrlUsrRolApl().getTrlUsrRol().getUsrRolNm().trim())) {
                spec = spec.and(TpjPrjSpecification.tab(projectTab, seegeneHQCorp.getId(), user.getId()));
            }

        } else if (projectTab.equals("all")) {
            //사용자가 소속된 Corporate에서 생성 된 프로젝트 목록 제공
            spec = spec.and(TpjPrjSpecification.tab(projectTab, user.getTusCorp().getId(), null));
        } else {
            // 통합검색일 경우
            spec = spec.and(TpjPrjSpecification.tab(projectTab, user.getTusCorp().getId(), null));
            spec = spec.and(TpjPrjSpecification.likeProjectIntegratedSearch(keyword));
            return spec;
        }

        if (startDate != null && endDate != null) {
            spec = spec.and(TpjPrjSpecification.betweenEndDateTime(startDate, endDate));
        }
        if (diseaseCategoryCode != null) {
            spec = spec.and(TpjPrjSpecification.equalToDiseaseCode(diseaseCategoryCode));
        }
        if (purposeCode != null) {
            spec = spec.and(TpjPrjSpecification.equalToPurposeCode(purposeCode));
        }
        if (processCode != null) {
            spec = spec.and(TpjPrjSpecification.equalToProcessCode(processCode));
        }

        if (keyword != null) {
            spec = spec.and(TpjPrjSpecification.likeProjectName(keyword)).or(TpjPrjSpecification.likeProjectId(keyword)).or(TpjPrjSpecification.likeCorporate(keyword));
        }

        return spec;
    }

    public static ProjectPlanningDocumentTypeTab fromProjectPlanningDocumentTypeTabToCode(String code) {
        for (ProjectPlanningDocumentTypeTab type : ProjectPlanningDocumentTypeTab.values()) {
            if (type.getCode().equals(code)) {
                return type;
            }
        }
        throw new IllegalArgumentException("No enum constant with code: " + code);

    }

    public static String getNameByLangCd(TcdCntry tcdCntry, String langCd) {
        return switch (langCd) {
            case ("ko") -> tcdCntry.getKorCntryNm();
            case ("en") -> tcdCntry.getEngCntryNm();
            default -> tcdCntry.getMothrCntryNm();
        };
    }

    public static <T extends Enum<T>> boolean isStringInEnum(String value, Class<T> enumClass, Function<T, String> propertyGetter) {
        for (T enumValue : enumClass.getEnumConstants()) {
            if (value.equals(propertyGetter.apply(enumValue))) {
                return true; // Found a match
            }
        }
        return false; // No match found
    }

    public Long getProjectNoteAlarm(PlatformUserInfo platformUserInfo) {
        return noteRepository.count(Example.of(Note.builder().toUsrUid(platformUserInfo.getUsrUid()).checked(false).build()));
    }

    //[IFM058]내 기업 멤버 조회
    public List<ProjectMemberResponse> getProjectMemberList(PlatformUserInfo user, String usrNm, String emlId) {
        // 로그인 한 사용자의 소속기업으로 검색
        TusUsr usrCorpdata = tusUsrRepository.findById(user.getUsrUid()).orElseThrow(DataNotFoundException::new);
        List<TusUsr> usrList = tusUsrRepository.findByTusCorpIdAndUsrNmContainingAndEmlIdContainingAndUsrStsCd(
                usrCorpdata.getTusCorp().getId(), Optional.ofNullable(usrNm).orElse(""), Optional.ofNullable(emlId).orElse(""), UserStatusCode.NRM.name());


        return usrList.stream().map(data -> {
            TsyFl tsyFl = data.getTsyFl();
            String filePath = tsyFl == null ? null : tsyFl.getFlPath() + tsyFl.getFlNm() + "." + tsyFl.getFlExtn();

            return ProjectMemberResponse.builder()
                    .usrUid(data.getId())
                    .filePath(filePath)
                    .usrNm(data.getUsrNm())
                    .emlId(data.getEmlId())
                    .orgnNm(data.getOrgnNm())
                    .jobTitle(data.getJobTitl())
                    .build();
        }).collect(Collectors.toList());

    }

    //[IFM059]내 기업/다른 기업 멤버 등록
    public ProjectMemberResponse getOtherCorporateMember(String emlId) {
        //회원가입이 되어있는 사람만 조회
        //이메일 입력시 등록되어있는 사람이 아니면 에러코드

        TusUsr userData = tusUsrRepository.findByEmlId(emlId).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_USR_UUID_ERROR));

        return ProjectMemberResponse.builder()
                .usrUid(userData.getId())
                .emlId(userData.getEmlId())
                .usrNm(userData.getUsrNm())
                .orgnNm(userData.getOrgnNm())
                .jobTitle(userData.getJobTitl())
                .build();

    }

    //[IFM060]프로젝트 멤버 조회
    public List<ProjectMemberDetailResponse> getProjectMember(Long id) {
        // 프로젝트 정보
        TpjPrj projectData = tpjPrjRepository.findById(id).orElseThrow(DataNotFoundException::new);

        // 프로젝트 멤버 정보
        List<TpjPrjMbr> prjMemberList = tpjPrjMbrRepository.findByTpjPrjId(projectData.getId());

        List<ProjectMemberDetailResponse> responseList = new ArrayList<>();

        prjMemberList.forEach(data -> {
            // 프로필 정보
            TsyFl tsyFl = data.getTusUsr().getTsyFl();
            String filePath = tsyFl == null ? null : tsyFl.getFlPath() + tsyFl.getFlNm() + "." + tsyFl.getFlExtn();

            // 프로세스 역할 정보
            List<TpjPrjPrcsMbr> tpjPrjPrcsMbrList = data.getTpjPrjPrcsMbrList();
            List<ProcessRoleResponse> roleResponseList = processRoleResponses(tpjPrjPrcsMbrList);

            // 멤버 응답 객체 생성
            ProjectMemberDetailResponse response = buildProjectMemberDetailResponse(data, projectData, filePath, roleResponseList);
            responseList.add(response);
        });
        return responseList;
    }

    // ProjectMemberDetailResponse
    private ProjectMemberDetailResponse buildProjectMemberDetailResponse(TpjPrjMbr data, TpjPrj projectData, String filePath, List<ProcessRoleResponse> prcsRolCdList) {
        return ProjectMemberDetailResponse.builder()
                .memberId(data.getTusUsr().getId())
                .usrNm(data.getTusUsr().getUsrNm())
                .filePath(filePath)
                .guestYn(projectData.getTusCorp().getId().equals(data.getTusUsr().getTusCorp().getId()) ? "N" : "Y")
                .orgnNm(data.getTusUsr().getOrgnNm())
                .jobTitle(data.getTusUsr().getJobTitl())
                .projectManagerYn(Objects.equals(data.getPrjRolCd(), ProjectManagerYn.Y.getCode()) ? "Y" : "N")
                .processRoleList(prcsRolCdList)
                .build();
    }

    //해당 멤버의 같은 롤 코드로 그룹화
    private List<ProcessRoleResponse> processRoleResponses(List<TpjPrjPrcsMbr> tpjPrjPrcsMbrList) {
        Map<String, List<TpjPrjPrcsMbr>> groupedByPrcsRolCd = tpjPrjPrcsMbrList.stream()
                .collect(Collectors.groupingBy(TpjPrjPrcsMbr::getPrcsRolCd));

        return groupedByPrcsRolCd.entrySet().stream()
                .map(entry -> {
                    List<String> mergedProcessCodes = entry.getValue().stream()
                            .map(item -> item.getTpjPrjPrcs().getPrcsCd())
                            .collect(Collectors.toList());

                    List<String> mergedProcessNames = entry.getValue().stream()
                            .map(item -> {
                                String processCode = item.getTpjPrjPrcs().getPrcsCd();
                                TcdPrcs tcdPrcs = tcdPrcsRepository.findById(processCode)
                                        .orElseThrow(DataNotFoundException::new);
                                return tcdPrcs.getPrcsNm();
                            })
                            .collect(Collectors.toList());

                    TcdCdItmMlg en = tcdCdItmMlgRepository.findByCdItmCdAndLangCd(
                            entry.getKey(), "en").orElseThrow(DataNotFoundException::new);

                    return ProcessRoleResponse.builder()
                            .processRoleCode(entry.getKey())  //프로세스 롤 코드
                            .processRoleCodeName(en.getCdNm())//프로세스 롤 네임
                            .processCodes(mergedProcessCodes) //프로세스 코드
                            .processName(mergedProcessNames)  //프로세스 네임
                            .build();
                })
                .collect(Collectors.toList());
    }

    private List<ProcessRoleResponse> groupedByReqProcess(List<TpjPrjPrcsMbshReq> tpjPrjPrcsMbrList) {
        Map<String, List<TpjPrjPrcsMbshReq>> groupedByPrcsRolCd = tpjPrjPrcsMbrList.stream()
                .collect(Collectors.groupingBy(TpjPrjPrcsMbshReq::getPrcsRolCd));

        return groupedByPrcsRolCd.entrySet().stream()
                .map(entry -> {
                    List<String> mergedProcessCodes = entry.getValue().stream()
                            .map(item -> item.getTpjPrjPrcs().getPrcsCd())
                            .collect(Collectors.toList());

                    List<String> mergedProcessNames = entry.getValue().stream()
                            .map(item -> {
                                String processCode = item.getTpjPrjPrcs().getPrcsCd();
                                TcdPrcs tcdPrcs = tcdPrcsRepository.findById(processCode)
                                        .orElseThrow(DataNotFoundException::new);
                                return tcdPrcs.getPrcsNm();
                            })
                            .collect(Collectors.toList());

                    TcdCdItmMlg en = tcdCdItmMlgRepository.findByCdItmCdAndLangCd(
                            entry.getKey(), "en").orElseThrow(DataNotFoundException::new);

                    return ProcessRoleResponse.builder()
                            .processRoleCode(entry.getKey())  //프로세스 롤 코드
                            .processRoleCodeName(en.getCdNm())//프로세스 롤 네임
                            .processCodes(mergedProcessCodes) //프로세스 코드
                            .processName(mergedProcessNames)  //프로세스 네임
                            .build();
                })
                .collect(Collectors.toList());
    }

    //[IFM061]프로젝트 멤버 상세 조회
    public List<ProjectMemberListResponse> getMemberDetail(Long id) {
        //프로젝트 멤버 상세조회
        //해당 프로젝트 / 프로세스로 정보조회

        //프로세스멤버조회
        List<TpjPrjMbr> processMemberList = tpjPrjMbrRepository.findByTpjPrjId(id);
        List<ProjectMemberListResponse> responseList = new ArrayList<>();

        processMemberList.forEach(data -> {
            // 프로필 정보
            TsyFl tsyFl = data.getTusUsr().getTsyFl();
            String filePath = tsyFl == null ? null : tsyFl.getFlPath() + tsyFl.getFlNm() + "." + tsyFl.getFlExtn();

            // 프로세스 역할 정보
            List<TpjPrjPrcsMbr> tpjPrjPrcsMbrList = data.getTpjPrjPrcsMbrList();
            List<ProcessRoleResponse> roleResponseList = processRoleResponses(tpjPrjPrcsMbrList);

            //프로젝트시작일/종료일
            TpjPrjMbrHst hstDvsCd = tpjPrjMbrHstRepository.findTopByPrjMbrNumAndPrjNumOrderByMdfDtDesc(
                    data.getId(), id).orElseThrow(DataNotFoundException::new);

            TpjPrjMbr byTpjPrjIdAndTusUsrId = tpjPrjMbrRepository.findByTpjPrjIdAndTusUsrId(id,
                    data.getTusUsr().getId()).orElseThrow(DataNotFoundException::new);

            ProjectMemberListResponse.ProjectMemberListResponseBuilder builder = ProjectMemberListResponse
                    .builder()
                    .memberId(data.getTusUsr().getId())
                    .usrNm(data.getTusUsr().getUsrNm())
                    .orgnNm(data.getTusUsr().getOrgnNm())
                    .usrStsCd(data.getTusUsr().getUsrStsCd())
                    .filePath(filePath)
                    .processRoleList(roleResponseList)
                    .projectManager(data.getPrjRolCd());

            //참여중 TPJ_PRJ_MBR 회원상태가 NRM && TPJ_PRJ_MBR_HST hstDvsCd 가 del 이 아닌멤버

            if (data.getTusUsr().getUsrStsCd().equals(UserStatusCode.NRM.name()) && !hstDvsCd.getHstDvsCd()
                    .equals(HstDvsCd.DEL.name())) {
                builder.startDat(byTpjPrjIdAndTusUsrId.getStartDt())
                        .participation("Participating")//현재 참여 중
                        .build();
            } else if (data.getTusUsr().getUsrStsCd().equals(UserStatusCode.NRM.name())) {
                //참여했음 TPJ_PRJ_MBR 회원상태가 NRM && TPJ_PRJ_MBR_HST hstDvsCd 가 del인 멤버
                builder.startDat(byTpjPrjIdAndTusUsrId.getStartDt())
                        .endDat(hstDvsCd.getMdfDt())
                        .participation("Participated")//참여했음
                        .build();
            } else if (data.getTusUsr().getUsrStsCd().equals(UserStatusCode.WDR.name())) {
                //탈퇴(마스킹처리) TPJ_PRJ_MBR 회원상태가 WDR
                builder.startDat(byTpjPrjIdAndTusUsrId.getStartDt())
                        .endDat(data.getTusUsr().getMdfDt()) //탈퇴날짜
                        .participation("Withdrawal")//탈퇴
                        .build();
            }
            responseList.add(builder.build());

        });
        return responseList;
    }

    //[IFM063]프로젝트 권한 변경 요청 등록
    @Transactional
    public void createProjectAuthority(ProjectAuthorityRequest projectAuthorityRequest, PlatformUserInfo user) {
        //프로세스 권한 변경 요청

        TpjPrj projectData = tpjPrjRepository.findById(projectAuthorityRequest.getId()).orElseThrow(DataNotFoundException::new);
        TusUsr tusUsr = tusUsrRepository.findById(user.getUsrUid())
                .orElseThrow(DataNotFoundException::new);

        //TPJ_PRJ_MBSH_REQ 저장
        String projectMemberRoleCode = ProjectMemberRoleCode.RQC.name();
        TpjPrjMbshReq tpjPrjMbshReq = createTpjPrjMbshReq(projectAuthorityRequest, projectData, tusUsr, projectMemberRoleCode);
        tpjPrjMbshReqRepository.save(tpjPrjMbshReq);

        //TPJ_PRJ_PRCS_MBSH_REQ
        processRoleRequests(projectAuthorityRequest.getId(), projectAuthorityRequest.getProcessCodeList(), tpjPrjMbshReq);
    }

    //TPJ_PRJ_MBSH_REQ 저장
    private TpjPrjMbshReq createTpjPrjMbshReq(ProjectAuthorityRequest projectAuthorityRequest, TpjPrj projectData, TusUsr tusUsr, String projectMemberRoleCode) {
        return TpjPrjMbshReq.builder()
                .prjRolCd(projectAuthorityRequest.getPrjRolCd())
                .reqResnCont(projectAuthorityRequest.getReqResnCont())
                .reqTpCd(projectMemberRoleCode)
                .tpjPrj(projectData)
                .tusUsr(tusUsr)
                .build();
    }

    private void processRoleRequests(Long id, List<ProcessRoleRequest> processRoleRequests, TpjPrjMbshReq tpjPrjMbshReq) {
        processRoleRequests.forEach(data -> data.getProcessList().forEach(processCode -> {
            // 프로세스 코드로 TpjPrjPrcs를 조회
            TpjPrjPrcs processData = tpjPrjPrcsRepository.findByTpjPrjIdAndPrcsCd(id, processCode)
                    .orElseThrow(DataNotFoundException::new);

            // TpjPrjPrcsMbshReq 엔티티 생성
            TpjPrjPrcsMbshReq tpjPrjPrcsMbshReq = TpjPrjPrcsMbshReq.builder()
                    .tpjPrjMbshReq(tpjPrjMbshReq)
                    .tpjPrjPrcs(processData)
                    .prcsRolCd(data.getProcessRoleCode())
                    .build();

            // TpjPrjPrcsMbshReq를 저장
            tpjPrjPrcsMbshReqRepository.save(tpjPrjPrcsMbshReq);
        }));
    }

    //[IFM064]프로젝트 요청 목록 조회
    public Page<ProjectAuthorityResponse> getProjectAuthorityList(Pageable pageable, Long prjNum) {

        List<ProjectAuthorityResponse> projectRequestList =
                projectMapper.getProjectRequestList(pageable.getPageSize(), prjNum, pageable.getOffset()).stream().map(
                        ProjectAuthorityResponse::of).toList();

        int totalSize = projectMapper.getProjectRequestCount();
        return new PageImpl<>(projectRequestList, pageable, totalSize);
    }

    //[IFM065]프로젝트 권한 요청 확인 등록
    @Transactional
    public void updateProjectAuthority(ProjectAuthorityRequest projectAuthorityRequest, PlatformUserInfo user) {
        //프로젝트 권한변경 요청 승인/거절

        //TpjPrjMbshReq 정보
        TpjPrjMbshReq projectParticipationReqData = tpjPrjMbshReqRepository.findById(projectAuthorityRequest.getId())
                .orElseThrow(DataNotFoundException::new);

        //TpjPrj 정보
        TpjPrj projectData = tpjPrjRepository.findById(projectParticipationReqData.getTpjPrj().getId())
                .orElseThrow(DataNotFoundException::new);

        //TusUsr 정보
        TusUsr reqUserData = tusUsrRepository.findById(projectParticipationReqData.getTusUsr().getId())
                .orElseThrow(DataNotFoundException::new);

        //TPJ_PRJ_MBSH_REQ update
        TpjPrjMbshReq tpjPrjMbshReq = TpjPrjMbshReq.builder()
                .id(projectParticipationReqData.getId())
                .tpjPrj(projectData)
                .prjRolCd(projectAuthorityRequest.getPrjRolCd())
                .tusUsr(reqUserData)
                .reqTpCd(projectParticipationReqData.getReqTpCd())
                .aprvRslCd(projectAuthorityRequest.getApprovalCode())
                .aprvDt(LocalDateTime.now())
                .mngrUsrUid(user.getUsrUid())
                .build();
        tpjPrjMbshReqRepository.save(tpjPrjMbshReq);

        if (projectAuthorityRequest.getApprovalCode().equals(ProjectReqApprovalCode.APV.name())) {
            //TPJ_PRJ_MBR update( prj_MBSH_REQ_NUM , JOINTPCD , PRJROLCD)

            TpjPrjMbr projectMemberData = tpjPrjMbrRepository.findByTpjPrjIdAndTusUsrId(projectData.getId(), reqUserData.getId()).orElseThrow(DataNotFoundException::new);

            projectMemberData.setPrjRolCd(projectParticipationReqData.getPrjRolCd());
            projectMemberData.setJoinTpCd(JoinCode.SLF.name());
            projectMemberData.setTpjPrjMbshReq(projectParticipationReqData);
            tpjPrjMbrRepository.save(projectMemberData);

            //TPJ_PRJ_MBR_HST insert
            TpjPrjMbrHst tpjPrjMbrHst = createTusPrjMbrHst(projectMemberData, HstDvsCd.UPD.name());
            tpjPrjMbrHstRepository.save(tpjPrjMbrHst);

            //TPJ_PRJ_PRCS_MBR update (요청 승인시에만)
            //기존 데이터 삭제후 -> 변경 승인된 프로세스정보로 등록
            //기존데이터 삭제
            List<TpjPrjPrcsMbr> processMemberList = tpjPrjPrcsMbrRepository.findByTpjPrjMbrId(projectMemberData.getId());
            tpjPrjPrcsMbrRepository.deleteAll(processMemberList);

            List<TpjPrjPrcsMbrHst> tpjPrjPrcsMbrHstDelList = createTusPrjPrcsMbrHstList(processMemberList, tpjPrjMbrHst, HstDvsCd.DEL.name());
            tpjPrjPrcsMbrHstRepository.saveAll(tpjPrjPrcsMbrHstDelList);

            //변경 승인된 프로세스정보로 등록
            List<TpjPrjPrcsMbshReq> byTpjPrjMbshReqId = tpjPrjPrcsMbshReqRepository.findByTpjPrjMbshReqId(
                    projectAuthorityRequest.getId());
            List<TpjPrjPrcsMbr> tpjPrjPrcsMbrList = createTusPrjPrcsMbrList(byTpjPrjMbshReqId, projectMemberData);
            tpjPrjPrcsMbrRepository.saveAll(tpjPrjPrcsMbrList);

            // //TPJ_PRJ_PRCS_MBR_HST insert(요청 승인시에만)
            List<TpjPrjPrcsMbrHst> tpjPrjPrcsMbrHstList = createTusPrjPrcsMbrHstList(tpjPrjPrcsMbrList, tpjPrjMbrHst, HstDvsCd.CRT.name());
            tpjPrjPrcsMbrHstRepository.saveAll(tpjPrjPrcsMbrHstList);
        }
    }

    private TpjPrjMbrHst createTusPrjMbrHst(TpjPrjMbr tpjPrjMbr, String hstDvsCd) {
        return TpjPrjMbrHst.builder()
                .prjMbrNum(tpjPrjMbr.getId())
                .prjNum(tpjPrjMbr.getTpjPrj().getId())
                .usrUid(tpjPrjMbr.getTusUsr().getId())
                .startDt(tpjPrjMbr.getStartDt())
                .prjRolCd(tpjPrjMbr.getPrjRolCd())
                .joinTpCd(tpjPrjMbr.getJoinTpCd())
                .prjMbshReqNum(tpjPrjMbr.getId())
                .hstDt(LocalDateTime.now())
                .hstDvsCd(hstDvsCd)
                .build();
    }

    private List<TpjPrjPrcsMbr> createTusPrjPrcsMbrList(List<TpjPrjPrcsMbshReq> byTpjPrjMbshReqId, TpjPrjMbr tpjPrjMbr) {
        return byTpjPrjMbshReqId.stream().map(data ->
                TpjPrjPrcsMbr.builder()
                        .prcsRolCd(data.getPrcsRolCd())
                        .tpjPrjPrcs(data.getTpjPrjPrcs())
                        .tpjPrjMbr(tpjPrjMbr)
                        .build()
        ).collect(Collectors.toList());
    }

    private List<TpjPrjPrcsMbrHst> createTusPrjPrcsMbrHstList(List<TpjPrjPrcsMbr> tpjPrjPrcsMbrList, TpjPrjMbrHst tpjPrjMbrHst, String hstDvsCd) {
        return tpjPrjPrcsMbrList.stream().map(data ->
                        TpjPrjPrcsMbrHst.builder()
                                .prjPrcsMbrNum(data.getId())
                                .prjMbrNum(data.getTpjPrjMbr().getId())
                                .prjPrcsNum(data.getTpjPrjPrcs().getId())
                                .prcsRolCd(data.getPrcsRolCd())
                                .hstDvsCd(hstDvsCd)
                                .hstDt(LocalDateTime.now())
                                .tpjPrjMbrHst(tpjPrjMbrHst)
                                .build())
                .collect(Collectors.toList());
    }

    //[IFM066]프로젝트 권한 요청 상세 조회
    public ProjectAuthorityDetailResponse getProjectAuthority(Long id, PlatformUserInfo user) {

        //프로세스 권한변경 요청서 조회
        TpjPrjMbshReq reqData = tpjPrjMbshReqRepository.findById(id).orElseThrow(DataNotFoundException::new);

        TsyFl tsyFl = reqData.getTusUsr().getTsyFl();
        String filePath = tsyFl == null ? null : tsyFl.getFlPath() + tsyFl.getFlNm() + "." + tsyFl.getFlExtn();

        // TpjPrjPrcsMbshReq을 processRoleCode를 기준으로 그룹화
        List<TpjPrjPrcsMbshReq> tpjPrjPrcsMbshReqList = reqData.getTpjPrjPrcsMbshReqList();

        // 그룹화된 항목을 ProcessRoleResponse로 변환하여 리스트에 추가
        List<ProcessRoleResponse> responseList = groupedByReqProcess(tpjPrjPrcsMbshReqList);

        //현재 권한
        TpjPrjMbr byTpjPrjIdAndTusUsrId = tpjPrjMbrRepository.findByTpjPrjIdAndTusUsrId(reqData.getTpjPrj().getId(),
                reqData.getTusUsr().getId()).orElseThrow(() -> new BusinessException(ErrorCode.NO_SUCH_PROJECT_PROCESS_ERROR));

        List<TpjPrjPrcsMbr> tpjPrjPrcsMbrList = byTpjPrjIdAndTusUsrId.getTpjPrjPrcsMbrList();
        Map<String, List<TpjPrjPrcsMbr>> collect = tpjPrjPrcsMbrList.stream()
                .collect(Collectors.groupingBy(TpjPrjPrcsMbr::getPrcsRolCd));

        List<ProcessRoleResponse> currentResponseList = collect.entrySet().stream()
                .map(entry -> {
                    List<String> currentMergedProcessCodes = entry.getValue().stream()
                            .map(item -> item.getTpjPrjPrcs().getPrcsCd())
                            .collect(Collectors.toList());

                    List<String> currentMergedProcessNames = entry.getValue().stream()
                            .map(item -> {
                                String processCode = item.getTpjPrjPrcs().getPrcsCd();
                                TcdPrcs tcdPrcs = tcdPrcsRepository.findById(processCode)
                                        .orElseThrow(DataNotFoundException::new);
                                return tcdPrcs.getPrcsNm();
                            })
                            .collect(Collectors.toList());

                    String cdNm = commonService.getCodeName("PFM018", entry.getKey(), user.getLangCode());

                    return ProcessRoleResponse.builder()
                            .processRoleCode(entry.getKey()) // 프로세스 권한 코드 설정
                            .processRoleCodeName(cdNm)
                            .processCodes(currentMergedProcessCodes) // 병합된 프로세스 코드 설정
                            .processName(currentMergedProcessNames) // 병합된 프로세스 이름 설정
                            .build();
                })
                .collect(Collectors.toList());

        return ProjectAuthorityDetailResponse.builder()
                .id(reqData.getId())
                .filePath(filePath)
                .prjRolCd(reqData.getPrjRolCd())
                .reqResnCont(reqData.getReqResnCont())
                .userNm(reqData.getTusUsr().getUsrNm())
                .orgnNm(reqData.getTusUsr().getOrgnNm())
                .currentPrcsAuth(currentResponseList)
                .prcsAuth(responseList)
                .approvalCode(reqData.getAprvRslCd())
                .reqTpCd(reqData.getReqTpCd())
                .build();

    }

    //[IFM067]프로젝트 참여 요청 등록
    @Transactional
    public void createParticipationDemand(ProjectAuthorityRequest projectAuthorityRequest, PlatformUserInfo user) {
        //프로젝트 참여요청 사용자->관리자 : 선택한프로젝트가 참여가 되어있지 않아야함
        //프로젝트 역할,프로세스 권한,목적(코드),사유,

        TpjPrj projectData = tpjPrjRepository.findById(projectAuthorityRequest.getId()).orElseThrow(DataNotFoundException::new);
        TusUsr tusUsr = tusUsrRepository.findById(user.getUsrUid())
                .orElseThrow(DataNotFoundException::new);

        //TPJ_PRJ_MBSH_REQ 저장
        String projectMemberRoleCode = ProjectMemberRoleCode.RQJ.name();
        TpjPrjMbshReq tpjPrjMbshReq = createTpjPrjMbshReq(projectAuthorityRequest, projectData, tusUsr, projectMemberRoleCode);
        tpjPrjMbshReqRepository.save(tpjPrjMbshReq);


        //TPJ_PRJ_MBSH_REQ_PUPS
        List<String> projectReqPurposeList = projectAuthorityRequest.getProjectReqPurposeList();
        List<TpjPrjMbshReqPups> tpjPrjMbshReqPupsList = new ArrayList<>();

        projectReqPurposeList.forEach(data -> {
            TpjPrjMbshReqPups tpjPrjMbshReqPups = TpjPrjMbshReqPups.builder()
                    .tpjPrjMbshReq(tpjPrjMbshReq)
                    .reqPupsCd(data)
                    .build();
            tpjPrjMbshReqPupsList.add(tpjPrjMbshReqPups);
        });
        tpjPrjMbshReqPupsRepository.saveAll(tpjPrjMbshReqPupsList);

        //TPJ_PRJ_PRCS_MBSH_REQ
        processRoleRequests(projectAuthorityRequest.getId(), projectAuthorityRequest.getProcessCodeList(), tpjPrjMbshReq);

        //알림 설정
        //1.프로젝트 관리자에게 발송
        //1.1참여요청한 프로젝트 관리자 조회(최대2명)
        List<TpjPrjMbr> byTpjPrjIdAndPrjRolCd = tpjPrjMbrRepository.findByTpjPrjIdAndPrjRolCd(
                projectAuthorityRequest.getId(), ProjectManagerYn.Y.getCode());

        //1.2알림발송
        byTpjPrjIdAndPrjRolCd.forEach(
                data -> sendAlarm("C203"
                        , data.getTusUsr().getId()
                        , Map.of("{ID}", projectAuthorityRequest.getId())
                        , user)
        );


    }

    //[IFM068]프로젝트 참여 요청 확인 등록
    @Transactional
    public void updateParticipationDemand(ProjectAuthorityRequest projectAuthorityRequest, PlatformUserInfo user) {
        //프로젝터 참여요청 승인/거절
        TpjPrjMbshReq projectParticipationReqData = tpjPrjMbshReqRepository.findById(projectAuthorityRequest.getId())
                .orElseThrow(DataNotFoundException::new);
        TpjPrj projectData = tpjPrjRepository.findById(projectParticipationReqData.getTpjPrj().getId())
                .orElseThrow(DataNotFoundException::new);
        TusUsr reqUserData = tusUsrRepository.findById(projectParticipationReqData.getTusUsr().getId())
                .orElseThrow(DataNotFoundException::new);

        //TPJ_PRJ_MBSH_REQ update
        TpjPrjMbshReq tpjPrjMbshReq = TpjPrjMbshReq.builder()
                .id(projectParticipationReqData.getId())
                .tpjPrj(projectData)
                .prjRolCd(projectParticipationReqData.getPrjRolCd())
                .tusUsr(reqUserData)
                .reqTpCd(projectParticipationReqData.getReqTpCd())
                .aprvRslCd(projectAuthorityRequest.getApprovalCode())
                .aprvDt(LocalDateTime.now())
                .mngrUsrUid(user.getUsrUid())
                .build();
        tpjPrjMbshReqRepository.save(tpjPrjMbshReq);

        //요청 승인시에만
        if (projectAuthorityRequest.getApprovalCode().equals(ProjectReqApprovalCode.APV.name())) {
            //TPJ_PRJ_MBR insert (요청 승인시에만)
            TpjPrjMbr tpjPrjMbr = createTusPrjMbr(projectData, projectParticipationReqData, reqUserData);
            tpjPrjMbrRepository.save(tpjPrjMbr);

            //TPJ_PRJ_MBR_HST insert(요청 승인시에만)
            TpjPrjMbrHst tpjPrjMbrHst = createTusPrjMbrHst(tpjPrjMbr, HstDvsCd.CRT.name());
            tpjPrjMbrHstRepository.save(tpjPrjMbrHst);

            //TPJ_PRJ_PRCS_MBR insert(요청 승인시에만)
            List<TpjPrjPrcsMbshReq> byTpjPrjMbshReqId = tpjPrjPrcsMbshReqRepository.findByTpjPrjMbshReqId(
                    projectAuthorityRequest.getId());
            List<TpjPrjPrcsMbr> tpjPrjPrcsMbrList = createTusPrjPrcsMbrList(byTpjPrjMbshReqId, tpjPrjMbr);
            tpjPrjPrcsMbrRepository.saveAll(tpjPrjPrcsMbrList);

            //TPJ_PRJ_PRCS_MBR_HST insert(요청 승인시에만)
            List<TpjPrjPrcsMbrHst> tpjPrjPrcsMbrHstList = createTusPrjPrcsMbrHstList(tpjPrjPrcsMbrList, tpjPrjMbrHst, HstDvsCd.CRT.name());
            tpjPrjPrcsMbrHstRepository.saveAll(tpjPrjPrcsMbrHstList);

            //알림 (요청 승인)
            //1.요청자에게 발송
            sendAlarm("C201"
                    , reqUserData.getId()
                    , Map.of("{ID}", projectAuthorityRequest.getId())
                    , user);

            //2. 해당프로젝트 멤버전체에게 발송
            //2.1 해당프로젝트 멤버 조회
            List<TpjPrjMbr> byTpjPrjId = tpjPrjMbrRepository.findByTpjPrjId(projectAuthorityRequest.getId());

            //2.2 알림발송
            byTpjPrjId.forEach(
                    data -> sendAlarm("C204"
                            , data.getTusUsr().getId()
                            , Map.of("{ID}", projectAuthorityRequest.getId()
                                    , "{User Name}", reqUserData.getId())
                            , user)
            );

            //3.참여 요청자 에게 발송(참여요청한 프로세스별로 발송)
            //3.1 참여 요청한 프로세스 조죄
            List<ProcessRoleRequest> processCodeList = projectAuthorityRequest.getProcessCodeList();

            //3.2 알림발송
            processCodeList.forEach(
                    data -> data.getProcessList().forEach(
                            processData -> sendAlarm("C008", user.getUsrUid()
                                    , Map.of("{ID}", projectAuthorityRequest.getId()
                                            , "{Process}", processData
                                            , "{프로젝트 권한}", data.getProcessRoleCode())
                                    , user)
                    )
            );

        } else {
            //알림(요청 거절)
            //요청 거절시 (요청자에게 발송)
            sendAlarm("C202"
                    , reqUserData.getId()
                    , Map.of("{ID}", projectAuthorityRequest.getId())
                    , user);
        }
    }

    private TpjPrjMbr createTusPrjMbr(TpjPrj projectData, TpjPrjMbshReq projectParticipationReqData, TusUsr reqUserData) {
        return TpjPrjMbr.builder()
                .startDt(projectData.getStartDat())
                .prjRolCd(projectParticipationReqData.getPrjRolCd())
                .joinTpCd(JoinCode.SLF.name())
                .tpjPrjMbshReq(projectParticipationReqData)
                .tpjPrj(projectData)
                .tusUsr(reqUserData)
                .build();
    }

    //[IFM069]프로젝트 참여 요청 상세 조회
    public ProjectRequestDetailResponse getParticipationDemandDetail(Long id, PlatformUserInfo user) {
        //프로젝트 참여 요청 상세
        TpjPrjMbshReq reqData = tpjPrjMbshReqRepository.findById(id).orElseThrow(DataNotFoundException::new);

        TsyFl tsyFl = reqData.getTusUsr().getTsyFl();
        String filePath = tsyFl == null ? null : tsyFl.getFlPath() + tsyFl.getFlNm() + "." + tsyFl.getFlExtn();

        List<TpjPrjPrcsMbshReq> tpjPrjPrcsMbshReqList = reqData.getTpjPrjPrcsMbshReqList();

        // 그룹화된 항목을 ProcessRoleResponse로 변환하여 리스트에 추가
        List<ProcessRoleResponse> responseList = groupedByReqProcess(tpjPrjPrcsMbshReqList);

        //신청목적
        List<String> projectReqPurpose = new ArrayList<>();
        List<TpjPrjMbshReqPups> tpjPrjMbshReqPups = reqData.getTpjPrjMbshReqPups();

        // tpjPrjMbshReqPups의 각 요소에 대해 처리합니다.
        tpjPrjMbshReqPups.forEach(data -> {

            // 각 ReqPupsCd에 대한 TcdCdItmMlg를 찾습니다.(목적)
            String cdNm = commonService.getCodeName("PFM026", data.getReqPupsCd(), user.getLangCode());

            // 찾은 값을 projectReqPurpose 리스트에 추가합니다.
            projectReqPurpose.add(cdNm);
        });


        return ProjectRequestDetailResponse.builder()
                .id(reqData.getId())
                .filePath(filePath)
                .prjRolCd(reqData.getPrjRolCd())
                .reqResnCont(reqData.getReqResnCont())
                .userNm(reqData.getTusUsr().getUsrNm())
                .orgnNm(reqData.getTusUsr().getOrgnNm())
                .prcsAuth(responseList)
                .projectReqPurposeList(projectReqPurpose)
                .approvalCode(reqData.getAprvRslCd())
                .reqTpCd(reqData.getReqTpCd())
                .build();
    }

    //[IFM140] 프로젝트 프로세스 정보 조회
    public List<ProjectProcessResponse> getProjectProcessDetailList(Long prjNum, PlatformUserInfo user) {
        String langCd = user.getLangCode();
        if (!tpjPrjRepository.existsById(prjNum))
            throw new BusinessException(ErrorCode.NO_SUCH_PROJECT_ID_ERROR);
        return tpjPrjPrcsRepository.getProjectProcessDetailList(prjNum, langCd);
    }

    public void sendAlarm(
            String notificationCd, // 알림 코드
            String usrUid, // 보낼 사용자 uid
            Map<String, Object> content, //해당 문구
            PlatformUserInfo user
    ) {
        externalService.sendNotification(NotiSenderRequest.builder()
                .usrUid(user.getUsrUid())
                .notfCd(notificationCd)
                .content(content)
                .toUsrUid(usrUid)
                .build(), user);
    }
}
