package com.seegene.main.domain.board.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import com.seegene.main.domain.common.dto.FileInfoResponse;
import com.seegene.main.domain.common.entity.TsyFl;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
 *   1 2023-07-05        hwkwak        최초작성
 * </PRE>
 */
@Getter
@Builder
@NoArgsConstructor
public class QnaSearchResponse {
    @JsonProperty("iconFile")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "소프트웨어 아이콘 파일 번호")
    private FileInfoResponse image;

    @JsonProperty("userUid")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "사용자 Uid", example = "이니션")
    private String usrUid;

    @JsonProperty("userName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "사용자 이름", example = "이니션")
    private String usrNm;

    @JsonProperty("organizationNumber")
    @Schema(description = "소속조직 고유번호", example = "30017")
    private Long orgnNum;

    @JsonProperty("organizationName")
    @Schema(description = "소속조직", example = "생산시약1팀")
    private String orgnNm;

    @QueryProjection
    public QnaSearchResponse(FileInfoResponse image, String usrUid, String usrNm, Long orgnNum, String orgnNm) {
        this.image = image;
        this.usrUid = usrUid;
        this.usrNm = usrNm;
        this.orgnNum = orgnNum;
        this.orgnNm = orgnNm;
    }
}
