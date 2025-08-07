package com.seegene.main.domain.board.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

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
 *   1 2023-06-30        hwkwak        최초작성
 * </PRE>
 */
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QnaAttachmentRequest {

    @JsonProperty("fileId")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "파일 아이디", example = "123", requiredMode = REQUIRED)
    private long fileId;
}
