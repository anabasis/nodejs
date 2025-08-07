package com.seegene.main.domain.board.controller;

import com.seegene.main.domain.board.dto.*;
import com.seegene.main.domain.board.service.BoardService;
import com.seegene.main.domain.common.dto.DslCommonCodeItemMapResponse;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.config.annotation.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

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
@Tag(name="board", description = "사용자 QnA 담당자 : 곽호원")
@RequestMapping("/board")
@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardService boardService;

    @Operation(summary = "[IFM022]Qna 리스트를 조회 23.08.25 [완료]", description = "Qna 목록을 조회한다.")
    @Parameter(name = "page", description = "조회 대상 페이지", example = "0", required = true)
    @Parameter(name = "size", description = "조회 대상 건수", example = "10")
    @Parameter(name = "sort", description = "정렬")
    @GetMapping(path = "/qna/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<QnaListResponse> getQnaList(
            PlatformUserInfo user,
            @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
            @Schema( description = "기간시작일", example = "2023-01-01 00:00:00")
            @RequestParam( name = "startDate", required = false)
            LocalDateTime startDate,
            @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
            @Schema( description = "기간종료일", example = "2023-12-31 23:59:59")
            @RequestParam( name = "endDate", required = false)
            LocalDateTime endDate,
            @Parameter(description = "문의 타입", example= "QT1") @RequestParam(value = "type", required = false)
            String type,
            @Parameter(description = "카테고리", example= "SVM") @RequestParam(value = "category", required = false)
            String category,
            @Parameter(description = "모듈", example= "ACC") @RequestParam(value = "module", required = false)
            String module,
            @Parameter(description = "상태", example= "WFR") @RequestParam(value = "status", required = false)
            String status,
            @Parameter(name = "pageable", hidden = true) Pageable pageable
    ){
        return boardService.getQnaList(user, startDate, endDate, type, category, module,status , pageable);
    }

    @Operation(summary = "[IFM023]Qna를 등록 23.08.25 [완료]", description = "Qna를 등록한다. [완료]")
    @PostMapping(path = "/qna/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public void createQna (PlatformUserInfo user, @RequestBody QnaRequest qnaRequest) {
        boardService.createQna(user, qnaRequest);
    }

    @Operation(summary = "[IFM024]공개여부 지정인원 선택시의 사용자를 검색 23.08.25 [완료]", description = "공개여부 지정인원 선택시의 사용자를 검색한다 [완료]")
    @GetMapping(path ="/qna/search-member", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<QnaSearchResponse> searchMember(PlatformUserInfo userDetails,
                                                          @Parameter(description = "키워드", example= "이") @RequestParam(value = "keyword", required = false)
                                                            String keyword
    ){
        return boardService.searchMember(userDetails, keyword);
    }
    @Operation(summary = "[IFM026]Qna 상세 내용 조회 23.08.25 [완료]", description = "통합 문의 Qna 상세 내용 조회 한다.")
    @GetMapping(path = "/qna/{qnaNum}/detail", produces = MediaType.APPLICATION_JSON_VALUE)
    public QnaResponse getQnaDetail(
            @Parameter(name = "qnaNum", description = "Qna Number", example = "100001", required = true)
            @PathVariable long qnaNum){
        return boardService.getQnaDetail(qnaNum);
    }

    @Operation(summary = "[IFM131]Qna 상세 답변 내용 조회 23.08.25 [완료]", description = "통합 문의 Qna 상세 답변 내용 조회 한다.")
    @GetMapping(path = "/qna/{qnaNum}/detail-answer", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<AnswerResponse> getQnaDetailAnswer(
            @Parameter(name = "qnaNum", description = "Qna Number", example = "100001", required = true)
            @PathVariable long qnaNum){
        return boardService.getQnaDetailAnswer(qnaNum);
    }

    @Operation(summary = "[IFM027]해당 Qna 상세 댓글 및 대댓글 조회 23.08.25 [완료]", description = "해당 Qna 상세 댓글 및 대댓글 조회한다. [완료]")
    @GetMapping(path = "/qna/{qnaNum}/detail/comment", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<QnaCommentResultResponse> getQnaDetailComment(
            @Parameter(name = "qnaNum", description = "Qna Number", example = "100001", required = true)
            @PathVariable long qnaNum){
        return boardService.getQnaDetailComment(qnaNum);
    }

    @Operation(summary = "[IFM028]통합 문의 Qna 댓글을 등록 23.08.25 [완료]", description = "통합 문의 Qna 댓글을 등록한다. [완료]")
    @PostMapping(path = "/qna/{qnaNum}/comment/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public void createQnaComment (PlatformUserInfo userDetails,
            @Parameter(name = "qnaNum", description = "Qna Number", example = "100001", required = true)
            @PathVariable long qnaNum,
            @RequestBody CommentRequest commentRequest){
        boardService.createQnaDetailComment(userDetails, qnaNum, commentRequest);
    }

    @Operation(summary = "[IFM029]통합 문의 Qna 대댓글을 등록 23.08.25 [완료]", description = "통합 문의 Qna 대댓글을 등록한다. [완료]")
    @PostMapping(path = "/qna/{qnaNum}/comment/{qnaCmntNum}/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public void createQnaDetailReReply (PlatformUserInfo userDetails,
            @Parameter(name = "qnaNum", description = "Qna Number", example = "100001", required = true)
            @PathVariable long qnaNum,
            @Parameter(name = "qnaCmntNum", description = "Comment Number", example = "11006",required = true)
            @PathVariable long qnaCmntNum,
            @RequestBody CommentRequest commentRequest) {
        boardService.createQnaDetailReComment(userDetails, qnaNum, qnaCmntNum, commentRequest);
    }

    @Operation(summary = "[IFM030]해당 Qna 댓글 수정 23.08.25 [완료]", description = "해당 Qna 댓글 수정한다. [완료]")
    @PostMapping(path = "/qna/{qnaNum}/comment/{qnaCmntNum}/modify", produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateQnaComment (PlatformUserInfo userDetails,
                                @Parameter(name = "qnaNum", description = "Qna Number", example = "100001",required = true)
                                @PathVariable long qnaNum,
                                @Parameter(name = "qnaCmntNum", description = "Comment Number", example = "11006",required = true)
                                    @PathVariable long qnaCmntNum,
                                @RequestBody CommentUpdateRequest commentUpdateRequest) {
        boardService.updateQnaComment(userDetails, qnaCmntNum, commentUpdateRequest);
    }

    @Operation(summary = "[IFM031]해당 Qna 대댓글 수정 23.08.25 [완료]", description = "해당 Qna 대댓글 수정한다. [완료]")
    @PostMapping(path = "/qna/{qnaNum}/comment/{prntQnaCmntNum}/{qnaCmntNum}/modify", produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateQnaReComment (PlatformUserInfo userDetails,
                                    @Parameter(name = "qnaNum", description = "Qna Number", example = "100001", required = true)
                                    @PathVariable long qnaNum,
                                    @Parameter(name = "prntQnaCmntNum", description = "Parent Comment Number", example = "11006",required = true)
                                        @PathVariable long prntQnaCmntNum,
                                    @Parameter(name = "qnaCmntNum", description = "Comment Number", example = "11007",required = true)
                                        @PathVariable long qnaCmntNum,
                                    @RequestBody CommentUpdateRequest commentRequest) {
        boardService.updateQnaReComment(userDetails, prntQnaCmntNum, qnaCmntNum, commentRequest);
    }

    @Operation(summary = "[IFM032]해당 Qna 댓글 삭제 23.08.25 [완료]", description = "해당 Qna 댓글 삭제한다. [완료]")
    @PostMapping(path = "/qna/{qnaNum}/comment/{qnaCmntNum}/delete", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteQnaComment (PlatformUserInfo userDetails,
                                  @Parameter(name = "qnaNum", description = "Qna Number", example = "100001",required = true)
                                  @PathVariable long qnaNum,
                                  @Parameter(name = "qnaCmntNum", description = "Comment Number", example = "11006",required = true)
                                      @PathVariable long qnaCmntNum) {
        boardService.deleteQnaComment(userDetails, qnaCmntNum);
    }

    @Operation(summary = "[IFM033]해당 Qna 대댓글 삭제 23.08.25 [완료]", description = "해당 Qna 대댓글 삭제한다. [완료]")
    @PostMapping(path = "/qna/{qnaNum}/comment/{prntQnaCmntNum}/{qnaCmntNum}/delete", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteQnaReComment (PlatformUserInfo userDetails,
                                    @Parameter(name = "qnaNum", description = "Qna Number", example = "100001",required = true)
                                    @PathVariable long qnaNum,
                                    @Parameter(name = "prntQnaCmntNum", description = "Parent Comment Number", example = "11006",required = true)
                                        @PathVariable long prntQnaCmntNum,
                                    @Parameter(name = "qnaCmntNum", description = "Comment Number", example = "11007",required = true)
                                        @PathVariable long qnaCmntNum) {
        boardService.deleteQnaReComment(userDetails, prntQnaCmntNum, qnaCmntNum);
    }

    @Operation(summary = "[IFM034]해당 Qna 수정 23.08.25 [완료]", description = "해당 Qna 수정한다. [완료]")
    @PostMapping(path = "/qna/{qnaNum}/modify", produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateQna (PlatformUserInfo userDetails,
            @Parameter(name = "qnaNum", description = "Qna Number", example = "1", required = true)
            @PathVariable long qnaNum,
            @RequestBody QnaUpdateRequest qnaUpdateRequest){
        boardService.updateQna(userDetails, qnaNum, qnaUpdateRequest);
    }

    @Operation(summary = "[IFM035]해당 Qna 삭제 23.08.25 [완료]", description = "해당 Qna 삭제한다. [완료]")
    @PostMapping(path = "/qna/{qnaNum}/delete", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteQna (PlatformUserInfo userDetails,
            @Parameter(name = "qnaNum", description = "Qna Number", example = "1", required = true)
            @PathVariable long qnaNum){
        boardService.deleteQna(userDetails, qnaNum);
    }

    @Operation(summary = "Qna 카테고리별 List 조회 23.08.25 [완료]", description = "Qna 카테고리별 List 조회한다[완료]")
    @GetMapping(path = "/code/item-map-list")
    public List<DslCommonCodeItemMapResponse> getSourceCodeItemMapList(
            PlatformUserInfo user,
            @Parameter(name = "sourceCodeItemNum", description = "공통 그룹 아이디", example = "10248", required = true)
            Long sourceCodeItemNum
    ){
        return boardService.getSourceCodeItemMapList(sourceCodeItemNum, user.getLangCode());
    }
}
