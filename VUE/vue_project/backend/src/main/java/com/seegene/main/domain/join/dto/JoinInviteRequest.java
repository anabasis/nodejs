package com.seegene.main.domain.join.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.join.entity.TusTermsAgr;
import com.seegene.main.domain.join.entity.TusTermsVer;
import com.seegene.main.domain.user.entity.TusUsr;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

/**
 * JoinInviteRequest DTO
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
@Schema(description = "초대가입 Request DTO")
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JoinInviteRequest {

	@JsonProperty("emailId")
	@Schema(description = "초대 가입 사용자 emailId", example = "seegene1@seegene.com", requiredMode = REQUIRED)
	private String emailId;

	@JsonIgnore
	@Schema(description = "초대 가입 사용자 고유 ID", example = "FBBD42233FFC11EEBF4902D5D06DD9EE", requiredMode = REQUIRED)
	private String usrUid;

	@JsonProperty("termsVerNum")
	@Schema(description = "버전 고유정보", example = "10051", requiredMode = REQUIRED)
	private Long termsVerNum;

	@JsonProperty("agrYn")
	@Schema(description = "동의여부", example = "Y or N", requiredMode = REQUIRED)
	private String agrYn;

	public TusTermsAgr toEntity(TusUsr tusUsr, TusTermsVer tusTermsVer, JoinInviteRequest joinInviteRequest) {

		return TusTermsAgr.builder()
			.tusUsr(tusUsr)
			.tusTermsVer(tusTermsVer)
			.agrYn(joinInviteRequest.getAgrYn())
			.build();
	}
}
