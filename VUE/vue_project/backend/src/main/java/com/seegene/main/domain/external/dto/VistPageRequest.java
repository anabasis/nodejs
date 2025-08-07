package com.seegene.main.domain.external.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : 송주헌(juhun.song@mz.co.kr)
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023/09/22   송주헌(juhun.song)   최초작성
 * </PRE>
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VistPageRequest {
	@Schema(description = "제목",example = "Project Title")
	private String title;

	@Schema(description = "내용",example = "Planning > Planning detail")
	private String content;

	@Schema(description = "연결URL",example = "http://seegene.com")
	private String pageUrl;
}
