package com.seegene.main.domain.login.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.global.convert.DefaultDateTimeConverter;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

/**
 * 휴면계정안내 조회 Response DTO
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-03        khhong        최초작성
 * </PRE>
 */
@Schema(description = "휴면계정 안내 조회 Response DTO")
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WakeupAccountResponse {

	@JsonProperty("usrUid")
	@Schema(description = "작성자 아이디", example = "sample id", requiredMode = REQUIRED)
	private String usrUid;

	@JsonProperty("emailId")
	@Schema(description = "이메일주소", example = "kk@seegene.com", requiredMode = REQUIRED)
	private String emailId;

	@JsonProperty("lastAccessDate")
	@Schema(description = "마지막 접속일", example = "2023-05-11")
	private String lastAccessDate;

	@JsonProperty("wakeupAccountDate")
	@Schema(description = "휴면 전환일", example = "2023-05-13")
	private String wakeupAccountDate;

	@Builder
	public WakeupAccountResponse(String usrUid, String emailId, String lastAccessDate, String wakeupAccountDate) {
		this.usrUid = usrUid;
		this.emailId = emailId;
		this.lastAccessDate = lastAccessDate;
		this.wakeupAccountDate = wakeupAccountDate;
	}

	public WakeupAccountResponse(String usrUid, String emailId, LocalDateTime lastAccessDatetime, LocalDateTime wakeupDatetime) {
		this.usrUid = usrUid;
		this.emailId = emailId;
		this.lastAccessDate = DefaultDateTimeConverter.convertDateTime(lastAccessDatetime);
		this.wakeupAccountDate = DefaultDateTimeConverter.convertDateTime(wakeupDatetime);
	}
}
