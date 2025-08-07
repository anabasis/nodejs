package com.seegene.main.domain.common.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import com.google.common.net.MediaType;
import com.seegene.main.domain.authority.constant.MnuLoctCode;
import com.seegene.main.domain.authority.entity.TrlAdmRolApl;
import com.seegene.main.domain.authority.entity.TrlUsrRol;
import com.seegene.main.domain.authority.entity.TrlUsrRolApl;
import com.seegene.main.domain.common.constant.MnuType;
import com.seegene.main.domain.common.dto.*;
import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.domain.common.repository.TsyFlRepository;
import com.seegene.main.domain.common.repository.mapper.CommonMapper;
import com.seegene.main.domain.common.vo.CommonLnbMenuVo;
import com.seegene.main.domain.datacodemanagement.entity.TcdCdItm;
import com.seegene.main.domain.datacodemanagement.entity.TcdCdItmMlg;
import com.seegene.main.domain.datacodemanagement.repository.TcdCdItmMlgRepository;
import com.seegene.main.domain.user.dto.NewCoInviteResponse;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.domain.user.entity.TusUsrInvt;
import com.seegene.main.domain.user.repository.TrlAdmRolAplRepository;
import com.seegene.main.domain.user.repository.TrlUsrRolAplRepository;
import com.seegene.main.domain.user.repository.TusUsrInvtRepository;
import com.seegene.main.domain.user.repository.TusUsrRepository;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.exception.BusinessException;
import com.seegene.main.global.exception.DataNotFoundException;
import com.seegene.main.global.util.s3.S3Service;
import com.seegene.main.global.util.s3.constant.Bucket;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.seegene.main.domain.datacodemanagement.repository.TcdCdItmRepository;
import com.seegene.main.domain.datacodemanagement.repository.TcdCntryRepository;
import com.seegene.main.global.exception.EntityNotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.util.ObjectUtils;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommonService {
    private final TcdCdItmRepository tcdCdItmRepository;
    private final TcdCntryRepository tcdCntryRepository;
    private final TusUsrInvtRepository tusUsrInvtRepository;
    private final S3Service s3Service;
    private final TsyFlRepository tsyFlRepository;
    private final CommonMapper commonMapper;
    private final TusUsrRepository tusUsrRepository;
    private final TrlUsrRolAplRepository trlUsrRolAplRepository;
    private final TrlAdmRolAplRepository trlAdmRolAplRepository;
    private final TcdCdItmMlgRepository tcdCdItmMlgRepository;


    public List<CommonCodeItemResponse> getCodeItemList(String grpId,  PlatformUserInfo user) {
        List<TcdCdItm> tcdCdItemList = tcdCdItmRepository.findByCdGrpIdOrderBySortNumAsc(grpId);
        List<TcdCdItmMlg> tcdCdItmMlgList = tcdCdItemList.stream().flatMap(cdItem -> {
                    return cdItem.getTcdCdItmMlgList().stream().filter(cdItemMlgs -> cdItemMlgs.getLangCd().equals(
                            ObjectUtils.isEmpty(user) ? "en" :  user.getLangCode())
                    );
                }
        ).toList();

        return CommonCodeItemResponse.of(tcdCdItmMlgList);
//		return tcdCdItemRepository.dslFindByGrpIdAndLangCdOrderBySortNum(grpId, langCd);
    }



    public List<CommonCountryResponse> getCountryList() {
        return tcdCntryRepository.findAll().stream().map(CommonCountryResponse::of).toList();
    }

    public List<AuthorityRoleMenuResponse> getUsrLnbList(String langCode, String usrUid) {
        String paramUid = Optional.ofNullable(usrUid).orElse("");
        if(!"".equals(paramUid)){
            List<CommonLnbMenuVo> voList = commonMapper.getUsrLnbMenuInfo(Map.of("langCd", langCode,"mnuTpCd",MnuType.MDV,"mnuLoctCd" , MnuLoctCode.LNB,"usrUid", paramUid));
            return voList.stream().map(v->AuthorityRoleMenuResponse.of(
                    v.getPrntMnuNum(),
                    v.getPrntMnuNm(),
                    v.getMnuNum(),
                    v.getMnuNm(),
                    v.getMnuUrl(),
                    v.getMnuDpth(),
                    tsyFlRepository.findById(v.getAcvIconFlNum()).orElse(null),
                    tsyFlRepository.findById(v.getDftIconFlNum()).orElse(null),
                    tsyFlRepository.findById(v.getHovIconFlNum()).orElse(null),
                    v.getRedYn(),
                    v.getUptYn(),
                    v.getCrtYn(),
                    v.getDelYn()
            )).toList();
        }else{ return Collections.EMPTY_LIST;}
    }

    public List<AuthorityRoleMenuResponse> getUsrGnbList(String langCode, String usrUid) {
        String paramUid = Optional.ofNullable(usrUid).orElse("");
        if(!"".equals(paramUid)){
            List<CommonLnbMenuVo> voList = commonMapper.getUsrGnbMenuInfo(Map.of("langCd"    , langCode,"mnuTpCd"   , MnuType.MDV,"mnuLoctCd" , MnuLoctCode.GNB));
            return  voList.stream().map(v->AuthorityRoleMenuResponse.of(
                    v.getPrntMnuNum(),
                    v.getPrntMnuNm(),
                    v.getMnuNum(),
                    v.getMnuNm(),
                    v.getMnuUrl(),
                    v.getMnuDpth(),
                    tsyFlRepository.findById(v.getAcvIconFlNum()).orElse(null),
                    tsyFlRepository.findById(v.getDftIconFlNum()).orElse(null),
                    tsyFlRepository.findById(v.getHovIconFlNum()).orElse(null),
                    "N", // gnb 권한 체크 하지 않는다.
                    "N",
                    "N",
                    "N"
            )).toList();
        }else{ return Collections.EMPTY_LIST;}
    }

    public NewCoInviteResponse inviteRejectCheck(String userInvtUid){
        TusUsrInvt byId = tusUsrInvtRepository.findById(userInvtUid).orElseThrow(EntityNotFoundException::new);

        if(byId.getInvtCnclDt() != null){
            return NewCoInviteResponse.builder()
                .inviteRejectYn("Y")
                .build();
        }else{
            return NewCoInviteResponse.builder()
                .inviteRejectYn("N")
                .build();
        }

    }

    public String getPreSignedUrl(String key, String expireTime) {
        return s3Service.getPreSignedUrl(key , expireTime);
    }

    public List<S3PreSignedUrlResponse> getPutPreSignedUrl(List<S3PreSignedUrlRequest> s3PreSignedUrlRequestList, PlatformUserInfo user) {
        List<S3PreSignedUrlResponse> result = new ArrayList<>();
        for (S3PreSignedUrlRequest request : s3PreSignedUrlRequestList) {

            String key = request.getTableName() +  "/temp/" + s3Service.getUuid() + "." + request.getExtension();
            String url = s3Service.putPreSignedUrl(key, request.getStogTpCd(), request.getExpireSecondTime());

            result.add(S3PreSignedUrlResponse.builder().index(request.getIndex()).key(key).url(url).build());
        }
        return result;
    }

    @Transactional
    public List<FileNumberResponse> createS3FileData(List<S3FileCreateRequest> s3FileCreateRequestList) {
        List<TsyFl> s3FileList = new ArrayList<>();
        for (S3FileCreateRequest request : s3FileCreateRequestList) {
            // temp -> origin
            String afterKey = s3Service.copyObject(request.getKey(), request.getStogTpCd());

            // delete temp file
            s3Service.deleteObject(request.getKey(),  request.getStogTpCd());

            s3FileList.add(
                    S3FileCreateRequest.dtoToEntity(
                            afterKey,
                            request.getFlSz(),
                            request.getDspFlNm(),
                            request.getStogTpCd()
                    )
            );
        }
        return tsyFlRepository.saveAll(s3FileList).stream().map(FileNumberResponse::of).toList();
    }

    public S3KeyResponse getS3FileKey(Long fileNumber) {
        TsyFl tsyFl = tsyFlRepository.findById(fileNumber).orElseThrow(EntityNotFoundException::new);
        return S3KeyResponse.builder().key(s3Service.getS3Key(tsyFl)).stogTpCd(tsyFl.getStogTpCd()).build();
    }

    public UserDetailResponse getUserDetail(String usrUid) {
        // 사용자 정보
        TusUsr tusUsr = tusUsrRepository.getReferenceById(usrUid);
        // 파일 정보
        TsyFl tsyFl = Optional.ofNullable(tusUsr.getTsyFl()).orElseGet(() -> new TsyFl());
        // 사용자롤 정보
        Optional<TrlUsrRolApl> optionalTrlUsrRolApl = trlUsrRolAplRepository.findById(usrUid);
        TrlUsrRol trlUsrRol = null;
        if (optionalTrlUsrRolApl.isPresent())
            trlUsrRol = optionalTrlUsrRolApl.get().getTrlUsrRol();
        // 어드민롤정보
        List<TrlAdmRolApl> list = trlAdmRolAplRepository.findAll(Example.of(
                TrlAdmRolApl.builder().tusUsr(TusUsr.builder().id(usrUid).build()).build()
        ));
        return UserDetailResponse.of(tusUsr, tsyFl, trlUsrRol, list);
    }

    public String getCodeName (String cdGrpId, String cd , String langCd){
        //사용자 언어코드가 코드테이블에 있으면 해당 codeNm 조회 , 없을경우 default 언어 -> en
        TcdCdItm byCdGrpIdAndCd = tcdCdItmRepository.findByCdGrpIdAndCd(cdGrpId, cd).orElseThrow(DataNotFoundException::new);
        Optional<TcdCdItmMlg> byCdItmCdAndLangCd = tcdCdItmMlgRepository.findByCdItmCdAndLangCd(byCdGrpIdAndCd.getCd(),
            langCd);

        if(byCdItmCdAndLangCd.isPresent()){
            return byCdItmCdAndLangCd.get().getCdNm();
        }

        //디폴트(영어)
        return  byCdGrpIdAndCd.getDftcdNm();
    }
    /*
    파일리스트 zip 반환 한다.
     */
    public void getDownloadFiles(HttpServletResponse response, List<FileDownloadRequest> objectKeys) {
        String zipName      = "downloadFile";
        ZipEntry zipentry   = null;
        try(ZipOutputStream zos = new ZipOutputStream(response.getOutputStream())){
            byte [] bytes = new byte[4096];
            response.setContentType(MediaType.ZIP.type());
            response.setHeader("Content-Disposition","attachment; filename="+zipName+".zip");
            for(FileDownloadRequest fileDownloadRequest : objectKeys) {
                String key      = fileDownloadRequest.filePath() + fileDownloadRequest.fileName() + "." + fileDownloadRequest.fileExtension();
                String fileName = fileDownloadRequest.fileName() + "." + fileDownloadRequest.fileExtension();
                log.info("Start key::{}", key);
                log.info("Start Writing File::{}", fileName);
                zipentry = new ZipEntry(fileName);
                zos.putNextEntry(zipentry);
                InputStream in = s3Service.downloadFiles(fileDownloadRequest.storageTypeCode(), key);
                int bytesRead = -1;
                while ((bytesRead = in.read(bytes)) != -1) {
                    zos.write(bytes, 0, bytesRead);
                }
                log.info("Finsih Writing File:: {}", fileName);
                in.close();
            }
        }catch (Exception e){
            log.error("******* error {}", e.getLocalizedMessage());
            throw new BusinessException(ErrorCode.NO_SUCH_FILE_ERROR);
        }
    }
}
