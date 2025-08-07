package com.seegene.main.domain.board.service;

import com.seegene.main.domain.board.constant.DelYn;
import com.seegene.main.domain.board.constant.PrtnOpen;
import com.seegene.main.domain.board.dto.*;
import com.seegene.main.domain.board.entity.*;
import com.seegene.main.domain.board.repository.*;
import com.seegene.main.domain.board.repository.mapper.BoardMapper;
import com.seegene.main.domain.common.dto.DslCommonCodeItemMapResponse;
import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.domain.common.repository.TsyFlRepository;
import com.seegene.main.domain.corporate.constant.CorporateLvlCd;
import com.seegene.main.domain.corporate.entity.TusCorp;
import com.seegene.main.domain.corporate.repository.TusCorpRepository;
import com.seegene.main.domain.datacodemanagement.repository.TcdCdGrpRepository;
import com.seegene.main.domain.external.dto.NotiSenderRequest;
import com.seegene.main.domain.external.service.ExternalService;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.domain.user.repository.TusUsrRepository;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.convert.DefaultDateTimeConverter;
import com.seegene.main.global.exception.DataNotFoundException;
import com.seegene.main.global.exception.EntityExistsException;
import com.seegene.main.global.util.s3.S3Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.seegene.main.global.function.ExceptionInterface.businessException;

/**
 * 사용자 게시판
 * <PRE>
 * </PRE>
 * @author   : hwkwak@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-06-29        hwkwak        최초작성
 * </PRE>
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class BoardService {
    private final TusCorpRepository tusCorpRepository;
    private final TusUsrRepository tusUsrRepository;

    private final TbdQnaRepository qnaRepository;
    private final TbdQnaAnswRepository answerRepository;
    private final TbdQnaAtchRepository qnaAttachRepository;
    private final TbdQnaCmntRepository commentRepository;
    private final TbdQnaAnswAtchRepository qnaAnswAtchRepository;
    private final TbdMdlMngrRepository tbdMdlMngrRepository;

    private final BoardMapper boardMapper;
    private final TbdQnaPrtlyOpenRepository partiallyOpenRepository;

    private final TcdCdGrpRepository codeGroupRepository;
    private final TsyFlRepository tsyFlRepository;
    private final S3Service s3Service;
    private final ExternalService externalService;

    public Page<QnaListResponse> getQnaList(PlatformUserInfo user, LocalDateTime startDate, LocalDateTime endDate, String type, String category, String module, String status, Pageable pageable) {
        LocalDateTime startDt = DefaultDateTimeConverter.convertStartLocalDateTime(startDate);
        LocalDateTime endDt = DefaultDateTimeConverter.convertEndLocalDateTime(endDate);
        List<QnaListResponse> allQna = boardMapper.findAllQna(user.getUsrUid(), startDt, endDt, type, category, module, status, pageable.getPageSize(), pageable.getOffset());
        Long totalCount = boardMapper.findAllQnaCount(user.getUsrUid(), startDt, endDt, type, category, module, status);
        Page<QnaListResponse> page=new PageImpl<>(allQna, pageable, totalCount);
        return page;
    }
    private TsyFl getFileData(Long fileNumber) {
        return tsyFlRepository.findById(fileNumber).orElseThrow(DataNotFoundException::new);
    }
    @Transactional
    public void createQna(PlatformUserInfo user, QnaRequest qnaRequest) {
        TusUsr byUser = tusUsrRepository.findById(user.getUsrUid()).orElseThrow(DataNotFoundException::new);
        TbdQna qna = qnaRequest.toEntity(byUser);
        qnaRepository.save(qna);
        if(qnaRequest.getQnaAttachmentRequests() != null){
            qnaRequest.getQnaAttachmentRequests().stream().map(qnaAttach -> TbdQnaAtch.builder()
                    .qnaAttach(ObjectUtils.isEmpty(qnaAttach.getFileId()) ? null : getFileData(qnaAttach.getFileId()))
                    .tbdQna(qna)
                    .build()).forEach(qnaEntity -> {
               qna.insertQnaAttach(qnaEntity);
               qnaAttachRepository.save(qnaEntity);
            });

        }
        if ((Objects.equals(qnaRequest.getOpenLevel(), "PTL")) && qnaRequest.getPrtnUserRequest() != null){
            qnaRequest.getPrtnUserRequest().stream().map(prtnUser -> TbdQnaPrtlyOpen.builder()
                    .tusUsr(tusUsrRepository.findById(prtnUser.getUsrUid()).get())
                    .tbdQna(qna)
                    .build()).forEach(qnaEntity -> {
                qna.insertPrtlyUser(qnaEntity);
                partiallyOpenRepository.save(qnaEntity);
            });
            IntStream.range(0, qnaRequest.getPrtnUserRequest().size()).forEach(i -> externalService.sendNotification(
                    NotiSenderRequest.builder()
                            .toUsrUid(qnaRequest.getPrtnUserRequest().get(i).getUsrUid())
                            .usrUid(user.getUsrUid())
                            .notfCd("C004")
                            .content(Map.of("{name}", byUser.getUsrNm(), "{ID}", qna.getId()))
                            .build()
                    , user));

        }
        List<TbdMdlMngr> byQnaCatCdAndMdlTpCd = tbdMdlMngrRepository.findByQnaCatCdAndMdlTpCd(qnaRequest.getCategory(), qnaRequest.getModule());
        Set<String> collect = byQnaCatCdAndMdlTpCd.stream().map(TbdMdlMngr::getTusUsr).collect(Collectors.toSet()).stream().map(TusUsr::getId).collect(Collectors.toSet());
        Iterator<String> userList = collect.iterator();
        while (userList.hasNext()) {
            externalService.sendNotification(
                    NotiSenderRequest.builder()
                            .toUsrUid(userList.next())
                            .usrUid(user.getUsrUid())
                            .notfCd("C025")
                            .content(Map.of( "{ID}", qna.getId()))
                            .build()
                    , user);
        }

    }
    public List<QnaSearchResponse> searchMember(PlatformUserInfo user, String keyword) {
        TusUsr byUser = tusUsrRepository.findById(user.getUsrUid()).orElseThrow(DataNotFoundException::new);
        TusCorp tusCorp = tusCorpRepository.findById(byUser.getTusCorp().getId()).orElseThrow(DataNotFoundException::new);
        if(Objects.equals(tusCorp.getCorpLvlCd(), CorporateLvlCd.LV2.getCode())) {
            return tusUsrRepository.findBySearchList(tusCorp.getId(), keyword).orElseThrow(DataNotFoundException::new);
        }
        else return tusUsrRepository.findBySearchList(tusCorp.getCorpLvlCd(), keyword).orElseThrow(DataNotFoundException::new);
    }
    public QnaResponse getQnaDetail(long qnaNumber) {
        return qnaRepository.findByQnaNum(qnaNumber);
    }
    public List<AnswerResponse> getQnaDetailAnswer(long qnaNumber) {
        List<TbdQnaAnsw> byTbdQnaId = answerRepository.findByTbdQna_Id(qnaNumber);
        return byTbdQnaId.stream().map(AnswerResponse::entityToDto).collect(Collectors.toList());
    }
    public List<QnaCommentResultResponse> getQnaDetailComment(Long qnaNumber) {
        return boardMapper.getCommentList(qnaNumber);
    }
    @Transactional
    public void createQnaDetailComment(PlatformUserInfo user, long qnaNumber, CommentRequest commentRequest) {
        TbdQna tbdQna = qnaRepository.findById(qnaNumber).orElseThrow(DataNotFoundException::new);
        TusUsr byUser = tusUsrRepository.findById(user.getUsrUid()).orElseThrow(DataNotFoundException::new);
        log.info("commentRequest -> {}", commentRequest.toString());
        TbdQnaCmnt commentEntity = TbdQnaCmnt.builder()
                .tbdQna(tbdQna)
                .tusUsr(byUser)
                .delYn(DelYn.N.getCode())
                .cmnt(commentRequest.getContent())
                .build();
        commentRepository.save(commentEntity);
        externalService.sendNotification(
                NotiSenderRequest.builder()
                        .toUsrUid(tbdQna.getTusUsr().getId())
                        .usrUid(user.getUsrUid())
                        .notfCd("C005")
                        .content(Map.of("{ID}", tbdQna.getId()))
                        .build()
                , user);
    }
    @Transactional
    public void createQnaDetailReComment(PlatformUserInfo user, long qnaNumber, long commentNumber, CommentRequest commentRequest) {
        //Admin Qna 댓글 생성 구현
        log.info("[createQnaReComment] Comment Number: " + commentNumber);
        TbdQna tbdQna = qnaRepository.findById(qnaNumber).orElseThrow(DataNotFoundException::new);
        TusUsr byUser = tusUsrRepository.findById(user.getUsrUid()).orElseThrow(DataNotFoundException::new);
        TbdQnaCmnt commentEntity = TbdQnaCmnt.builder()
                .tbdQna(tbdQna)
                .tusUsr(byUser)
                .prntQnaCmntNum((int) commentNumber)
                .cmnt(commentRequest.getContent())
                .delYn(DelYn.N.getCode())
                .build();
        commentRepository.save(commentEntity);
        externalService.sendNotification(
                NotiSenderRequest.builder()
                        .toUsrUid(tbdQna.getTusUsr().getId())
                        .usrUid(user.getUsrUid())
                        .notfCd("C005")
                        .content(Map.of("{ID}", tbdQna.getId()))
                        .build()
                , user);
    }
    @Transactional
    public void updateQnaComment(PlatformUserInfo user, long commentNum, CommentUpdateRequest commentRequest) {
        log.info("[updateQnaComment] get comment Number " + commentNum);
        TbdQnaCmnt byQnaCommentNumber = commentRepository.findById(commentNum).orElseThrow(() -> new DataNotFoundException("CommentNumber doesn't exist : " + commentNum));
        byQnaCommentNumber.setCmnt(commentRequest.getContent());

    }
    @Transactional
    public void updateQnaReComment(PlatformUserInfo user, long parentReplyNumber, long commentNumber, CommentUpdateRequest commentRequest) {
        log.info("[updateQnaReComment] get comment Number " + commentNumber);
        TbdQnaCmnt byQnaCommentNumber = commentRepository.findByPrntQnaCmntNumAndId(parentReplyNumber, commentNumber).orElseThrow(()->new DataNotFoundException("CommentNumber doesn't exist : " + commentNumber));
        byQnaCommentNumber.setCmnt(commentRequest.getContent());
    }
    @Transactional
    public void deleteQnaComment(PlatformUserInfo user, Long commentNumber) {
        log.info("[deleteQnaComment] get comment Number " + commentNumber);
        TbdQnaCmnt byQnaCommentNumber = commentRepository.findById(commentNumber).orElseThrow(()->new DataNotFoundException("CommentNumber doesn't exist : " + commentNumber));
        byQnaCommentNumber.setDelYn(DelYn.Y.getCode());
    }
    @Transactional
    public void deleteQnaReComment(PlatformUserInfo user, Long parentCommentNumber, Long commentNumber) {
        log.info("[deleteQnaReComment] get comment Number " + commentNumber);
        TbdQnaCmnt byQnaCommentNumber = commentRepository.findByPrntQnaCmntNumAndId(parentCommentNumber, commentNumber).orElseThrow(()->new DataNotFoundException("CommentNumber doesn't exist : " + commentNumber));
        byQnaCommentNumber.setDelYn(DelYn.Y.getCode());
    }
    @Transactional
    public void updateQna(PlatformUserInfo user, long qnaNumber, QnaUpdateRequest qnaUpdateRequest) {
        TbdQna tbdQna = qnaRepository.findTbdQnaById(qnaNumber).orElseThrow(DataNotFoundException::new);
        tbdQna.updateQna(qnaUpdateRequest.getType(), qnaUpdateRequest.getCategory(), qnaUpdateRequest.getModule(), qnaUpdateRequest.getOpenLevel(), qnaUpdateRequest.getTitle(), qnaUpdateRequest.getContent());
        List<TbdQnaAtch> qnaAtches = qnaAttachRepository.findByTbdQna_Id(qnaNumber).orElseThrow(DataNotFoundException::new);
        if(!qnaAtches.isEmpty() && (qnaUpdateRequest.getQnaAttachmentRequests() != null)) {
            Set<TbdQnaAtch> originFile = tbdQna.getTbdQnaAtches().stream().filter(
                    n -> qnaUpdateRequest.getQnaAttachmentRequests()
                            .stream()
                            .map(QnaAttachmentRequest::getFileId)
                            .noneMatch(Predicate.isEqual(n.getQnaAttach().getId()))
            ).collect(Collectors.toSet());
            List<Long> newFileId = qnaUpdateRequest.getQnaAttachmentRequests().stream().map(QnaAttachmentRequest::getFileId).filter(
                    n -> tbdQna.getTbdQnaAtches()
                            .stream()
                            .map(e -> e.getQnaAttach().getId())
                            .noneMatch(Predicate.isEqual(n))
            ).toList();
            tbdQna.getTbdQnaAtches().removeAll(originFile);
//        for (TsyFl file : originFile) {
//            //s3에서 파일 삭제
//            s3Service.deleteObjectByTsyFl(file);
//            }
            for (Long fileId : newFileId) {
                TbdQnaAtch qnaAtch = TbdQnaAtch.builder().tbdQna(tbdQna).qnaAttach(getFileData(fileId)).build();
                tbdQna.insertQnaAttach(qnaAtch);
                qnaAttachRepository.save(qnaAtch);
            }
            qnaRepository.flush();
        }else {
            if(qnaUpdateRequest.getQnaAttachmentRequests() != null) {
                List<Long> newFileId = qnaUpdateRequest.getQnaAttachmentRequests().stream().map(QnaAttachmentRequest::getFileId).filter(
                        n -> tbdQna.getTbdQnaAtches()
                                .stream()
                                .map(e -> e.getQnaAttach().getId())
                                .noneMatch(Predicate.isEqual(n))
                ).toList();
                for (Long fileId : newFileId) {
                    TbdQnaAtch qnaAtch = TbdQnaAtch.builder().tbdQna(tbdQna).qnaAttach(getFileData(fileId)).build();
                    tbdQna.insertQnaAttach(qnaAtch);
                    qnaAttachRepository.save(qnaAtch);
                }
            }
        }
        // 여기까지 수정함
        if(Objects.equals(tbdQna.getOpenLvlCd(), PrtnOpen.PRIVATE.getCode()) && (tbdQna.getTbdQnaPrtlyOpens() != null)) {
            List<Long> collect = tbdQna.getTbdQnaPrtlyOpens().stream().map(TbdQnaPrtlyOpen::getId).collect(Collectors.toList());
            List<TbdQnaPrtlyOpen> prtlyOpens = partiallyOpenRepository.findAllById(collect);
            partiallyOpenRepository.deleteAllInBatch(prtlyOpens);
        }
        if(tbdQna.getOpenLvlCd().equals(PrtnOpen.PARTIALLY_OPEN.getCode()) && qnaUpdateRequest.getPrtnUserRequest() != null) {
            List<Long> collect = tbdQna.getTbdQnaPrtlyOpens().stream().map(TbdQnaPrtlyOpen::getId).collect(Collectors.toList());
            List<TbdQnaPrtlyOpen> prtlyOpens = partiallyOpenRepository.findAllById(collect);
            partiallyOpenRepository.deleteAllInBatch(prtlyOpens);
            qnaUpdateRequest.getPrtnUserRequest().stream().map(prtnUserDto -> tusUsrRepository.findById(prtnUserDto.getUsrUid()).orElseThrow(DataNotFoundException::new))
                    .map(tusUsr -> TbdQnaPrtlyOpen.builder()
                    .tusUsr(tusUsr)
                    .tbdQna(tbdQna)
                    .build()).forEach(partiallyOpenRepository::save);
        }
        qnaRepository.save(tbdQna);
        }

    @Transactional
    public void deleteQna(PlatformUserInfo user, long qnaNumber) {
        TbdQna tbdQna = qnaRepository.findById(qnaNumber).orElseThrow(EntityExistsException::new);
        if (user.getUsrUid().equals(tbdQna.getTusUsr().getId())) {
            // QnA 파일 S3 에서 삭제
            for (TbdQnaAtch tbdQnaAtch : tbdQna.getTbdQnaAtches()) {
                TsyFl qnaAttach = tbdQnaAtch.getQnaAttach();
                s3Service.deleteObjectByTsyFl(qnaAttach);
            }
            for (int i = 0; i < tbdQna.getTbdQnaAnsws().size(); i++)
                for (int j = 0; j < tbdQna.getTbdQnaAnsws().get(i).getTbdQnaAnswAtches().size(); j++) {
                    s3Service.deleteObjectByTsyFl(tbdQna.getTbdQnaAnsws().get(i).getTbdQnaAnswAtches().get(j).getQnaAnswerAttach());
                    qnaAnswAtchRepository.deleteAllByIdInBatch(tbdQna.getTbdQnaAnsws().stream().map(TbdQnaAnsw::getId).collect(Collectors.toList()));
                }
            List<TbdQnaCmnt> byTbdQnaId = commentRepository.findByTbdQna_Id(qnaNumber);
            IntStream.range(0, byTbdQnaId.size()).forEach(i -> {
                if (!commentRepository.existsByPrntQnaCmntNum(byTbdQnaId.get(i).getId())) {
                    commentRepository.deleteById(byTbdQnaId.get(i).getId());
                }
                commentRepository.flush();
            });
            commentRepository.deleteByTbdQna_Id(qnaNumber);
            answerRepository.deleteByTbdQna_Id(qnaNumber);
            qnaRepository.deleteById(qnaNumber);

        }else {
            businessException.accept(ErrorCode.NOT_ACCESS_USER_ERROR);
        }
    }
    public List<DslCommonCodeItemMapResponse> getSourceCodeItemMapList(Long sourceCodeItemNum, String langCode) {
        if(langCode == null) langCode = "en";
        return codeGroupRepository.dslFindBySourceCodeItemNumAndLangCdOrderBySortNum(sourceCodeItemNum, langCode);
    }
}
