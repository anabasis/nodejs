package com.seegene.main.domain.notice.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.seegene.main.domain.common.dto.FileInfoResponse;
import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.domain.notice.entity.TbdNtc;
import com.seegene.main.domain.notice.entity.TbdNtcMlg;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : wwsoh@seegene.com
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-07        wwsoh        최초작성
 * </PRE>
 */
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDetailResponse {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "공지사항 번호", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long noticeNum;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "공지사항 타입", example = "PUB", requiredMode = Schema.RequiredMode.REQUIRED)
    private String noticeType;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "공지사항 생성일자", example = "2023-07-07", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime noticeCreateDate;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "공지사항 작성자", example = "Annonymous", requiredMode = Schema.RequiredMode.REQUIRED)
    private String noticeWriter;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "공지사항 내용 dto", requiredMode = Schema.RequiredMode.REQUIRED)
    private NoticeDetailMlgResponse noticeDetailMlgResponse;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "공지사항 파일 URL 리스트", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<FileInfoResponse> fileInfoResponses;


    public static NoticeDetailResponse of(TbdNtc tbdNtc, List<TsyFl> tsyFls, TbdNtcMlg tbdNtcMlg){
        return NoticeDetailResponse.builder()
            .noticeNum(tbdNtc.getId())
            .noticeType(tbdNtc.getNtcTpCd())
            .noticeCreateDate(tbdNtc.getCrtDt())
            .noticeWriter(tbdNtc.getTusUsr().getUsrNm())
            .noticeDetailMlgResponse(NoticeDetailMlgResponse.of(tbdNtcMlg))
            .fileInfoResponses(tsyFls.stream().map(FileInfoResponse::of).collect(Collectors.toList()))
            // .noticeURL(tbdNtc.getTbdNtcAtches().stream()
            //     .map(atch -> atch.getFlNum().toString()) // Adjust this based on how you construct URLs
            //     .collect(Collectors.toList()))
            .build();
    }

}
