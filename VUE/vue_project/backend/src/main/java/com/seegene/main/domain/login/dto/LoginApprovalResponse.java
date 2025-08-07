package com.seegene.main.domain.login.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.global.convert.DefaultDateTimeFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

/**
 * 로그인 가입 승인 Response DTO
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-10        khhong        최초작성
 * </PRE>
 */
@Schema(description = "로그인 가입 승인 Response DTO")
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginApprovalResponse {

	@JsonProperty("emailId")
	@Schema(description = "Email Id", example = "kk@seegene.com", requiredMode = REQUIRED)
	private String emailId;

	@JsonProperty("userUid")
	@Schema(description = "User Uid", example = "User Uid", requiredMode = REQUIRED)
	private String userUid;

	@JsonProperty("corporateNumber")
	@Schema(description = "Corporate Number", example = "Corporate Number")
	private String corporateNumber;

	@JsonProperty("userName")
	@Schema(description = "User Name", example = "User Name", requiredMode = REQUIRED)
	private String userName;

	@JsonProperty("organizationName")
	@Schema(description = "Organization Name", example = "Organization Name")
	private String organizationName;

	@JsonProperty("jobTitle")
	@Schema(description = "Job title", example = "Job title")
	private String jobTitle;

	@JsonProperty("profileFileNumber")
	@Schema(description = "Profile File Number", example = "Profile File Number")
	private String profileFileNumber;

	@JsonProperty("joinTypeCode")
	@Schema(description = "Join Type Code (#CD_GRP_ID=US002:(초대[IVT],셀프[SLF]))", example = "Join Type Code")
	private String joinTypeCode;

	@JsonProperty("countryCode")
	@Schema(description = "Country Code", example = "Country Code")
	private String countryCode;

	@JsonProperty("languageCode")
	@Schema(description = "Language Code", example = "Language Code")
	private String languageCode;

	@JsonProperty("userStatusCode")
	@Schema(description = "User Status Code(승인대기[APW],휴면[DMT],탈퇴[WDR],정상[NRM],작성중[WRG],승인거절[RJT])", example = "User Status Code")
	private String userStatusCode;

	@JsonProperty("otpAuthYn")
	@Schema(description = "OTP Authentication YN", example = "Y/N")
	private String otpAuthYn;

	@JsonProperty("emailAuthYn")
	@Schema(description = "Email Authentication YN", example = "Y/N")
	private String emailAuthYn;

	@JsonProperty("adSynchYn")
	@Schema(description = "AD Synch YN", example = "Y/N")
	private String adSynchYn;

	@JsonProperty("crtrUid")
	@Schema(description = "생성자 고유 아이디", example = "crtr uid")
	private String crtrUid;

	@JsonProperty("crtDt")
	@Schema(description = "생성 일자", example = "2023-07-10")
	private String crtDt;

	@JsonProperty("mdfrUid")
	@Schema(description = "변경자 고유 아이디", example = "mdfr uid")
	private String mdfrUid;

	@JsonProperty("mdfDt")
	@Schema(description = "변경 일자", example = "2023-07-10")
	private String mdfDt;

	public LoginApprovalResponse(String emailId, String userUid, String corporateNumber, String userName, String organizationName,
		String jobNm, String profileFileNumber, String joinTypeCode, String countryCode, String languageCode,
		String userStatusCode, String otpAuthYn, String emailAuthYn, String adSynchYn, String crtrUid, String crtDt,
		String mdfrUid, String mdfDt) {
		this.emailId = emailId;
		this.userUid = userUid;
		this.corporateNumber = corporateNumber;
		this.userName = userName;
		this.organizationName = organizationName;
		this.jobTitle = jobNm;
		this.profileFileNumber = profileFileNumber;
		this.joinTypeCode = joinTypeCode;
		this.countryCode = countryCode;
		this.languageCode = languageCode;
		this.userStatusCode = userStatusCode;
		this.otpAuthYn = otpAuthYn;
		this.emailAuthYn = emailAuthYn;
		this.adSynchYn = adSynchYn;
		this.crtrUid = crtrUid;
		this.crtDt = crtDt;
		this.mdfrUid = mdfrUid;
		this.mdfDt = mdfDt;
	}

	public LoginApprovalResponse(TusUsr tusUsr) {
		this.emailId = tusUsr.getEmlId();
		this.userUid = tusUsr.getId();
		this.corporateNumber = String.valueOf(tusUsr.getId());
		this.userName = tusUsr.getUsrNm();
		this.organizationName = tusUsr.getOrgnNm();
		this.jobTitle = tusUsr.getJobTitl();
		this.profileFileNumber = String.valueOf(tusUsr.getTsyFl().getId());
		this.joinTypeCode = tusUsr.getJoinTpCd();
		this.countryCode = tusUsr.getCntryCd();
		this.languageCode = tusUsr.getLangCd();
		this.userStatusCode = tusUsr.getUsrStsCd();
		this.otpAuthYn = tusUsr.getOtpAuthYn();
		this.emailAuthYn = tusUsr.getEmlAuthYn();
		this.adSynchYn = tusUsr.getAdSynYn();
		this.crtrUid = tusUsr.getCrtrUid();
		this.crtDt = tusUsr.getCrtDt().format(DefaultDateTimeFormat.DATE_TIME_FORMAT);
		this.mdfrUid = tusUsr.getMdfrUid();
		this.mdfDt = tusUsr.getMdfDt().format(DefaultDateTimeFormat.DATE_TIME_FORMAT);
	}
}