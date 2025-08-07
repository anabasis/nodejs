package com.seegene.main.domain.account.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.seegene.main.domain.datacodemanagement.entity.TcdCdItm;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 통합설정 알림 Response Dto
 * <PRE>
 * </PRE>
 * @author   : @mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1                 최초작성
 * </PRE>
 */
@Schema(description = "통합설정 알림 Response DTO")
@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AccountNotfResponse {

	@JsonProperty("notificationCode")
	@Schema(description = "알림 코드", requiredMode = Schema.RequiredMode.REQUIRED)
	private String notiCd;

	@JsonProperty("notificationCodeName")
	@Schema(description = "알림 코드명", requiredMode = Schema.RequiredMode.REQUIRED)
	private String notiCdNm;

	@JsonProperty("receiveYn")
	@Schema(description = "알림 허용", requiredMode = Schema.RequiredMode.REQUIRED)
	private String recvYn;

	public void updateRecvYn(String recvYn) {
		this.recvYn = recvYn;
	}

	public static AccountNotfResponse defaultNotf(TcdCdItm tcdCdItm) {
		return AccountNotfResponse.builder()
				.notiCd(tcdCdItm.getCd())
				.notiCdNm(tcdCdItm.getTcdCdItmMlgList().get(0).getCdNm())
				.recvYn("N")
				.build();
	}
}
