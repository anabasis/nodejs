package com.seegene.main.domain.external.dto;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

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
 *   1 2023/09/14   송주헌(juhun.song)   최초작성
 * </PRE>
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotiSenderRequest {
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "알림코드",example = "C012", requiredMode = Schema.RequiredMode.REQUIRED)
	private String notfCd;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "사용자Uid",example = "FBBD42233FFC11EEBF4902D5D06DD9EE", requiredMode = Schema.RequiredMode.REQUIRED)
	private String usrUid;

	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Schema(description = "받는사람Uid",example = "FBBD42233FFC11EEBF4902D5D06DD9EE", requiredMode = Schema.RequiredMode.REQUIRED)
	private String toUsrUid;

	@Schema(description = "설명")
	private String description;
	@Schema(description = "프로젝트명")
	private String prjNm;

	@Schema(description = "질병카테고리코드")
	private String dissCatCd;
	@Schema(description = "알림 내용")
	private Map<String,Object> content;



}
