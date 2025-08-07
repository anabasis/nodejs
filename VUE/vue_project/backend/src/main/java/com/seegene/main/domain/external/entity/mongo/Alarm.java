package com.seegene.main.domain.external.entity.mongo;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
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
@Builder
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Alarm {
	private String title;
	private String desc;
	private String content;
	private String notfCd;
	private String notfTpCd;
	private String lndgUrl;
	private String langCd;
	private String prjNm;
	private String dissCatCd;
	@Schema(description = "받는사람", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
	private String toUsrUid;
	private String crtrUid;
	@JsonProperty("crtDt")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	@Schema(description = "등록일", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
	private LocalDateTime crtDt;
	private String mdfrUid;
	@JsonProperty("mdfDt")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	@Schema(description = "수정일", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
	private LocalDateTime mdfDt;

}
