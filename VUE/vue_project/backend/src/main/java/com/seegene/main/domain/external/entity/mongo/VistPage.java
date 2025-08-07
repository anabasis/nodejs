package com.seegene.main.domain.external.entity.mongo;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.user.entity.TusUsr;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
 *   1 2023/09/20   송주헌(juhun.song)   최초작성
 * </PRE>
 */
@Builder
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VistPage {

	private String title;

	private String content;

	private String pageUrl;

	private String crtrUid;
	private String type;

	@JsonProperty("crtDt")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	@Schema(description = "등록일", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
	private LocalDateTime crtDt;
	private String mdfrUid;
	@JsonProperty("mdfDt")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	@Schema(description = "수정일", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
	private LocalDateTime mdfDt;

	public LocalDateTime getCrtDt() {
		return (this.crtDt != null) ? this.crtDt.minusHours(9) : null;
	}

	public LocalDateTime getMdfDt() {
		return (this.mdfDt != null) ? this.mdfDt.minusHours(9) : null;
	}
}
