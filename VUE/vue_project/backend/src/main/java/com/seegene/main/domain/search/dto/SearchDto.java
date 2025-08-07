package com.seegene.main.domain.search.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : mistersoh@naver.com
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-06-29        mistersoh        최초작성
 * </PRE>
 */
@Builder
@Getter
public class SearchDto {
	@Schema(description = "프로젝트 명", example = "프로젝트1")
	private String projectName;

	@Schema(description = "리퀘스트 명", example = "리퀘스트1")
	private String requestName;

}
