package com.seegene.main.domain.login.dto;

import static com.seegene.main.domain.login.constant.UserValidCorpCode.*;
import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.login.constant.UserValidCorpCode;
import com.seegene.main.global.convert.DefaultDateTimeConverter;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 사용자 로그인 검증 조회 Response DTO
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-09-12        khhong        최초작성
 * </PRE>
 */
@Schema(description = "사용자 로그인 검증 조회 Response DTO")
@Setter
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
public class LoginValidResponse {

	@JsonProperty("emailId")
	@Schema(description = "Email Id", example = "kk@seegene.com", requiredMode = REQUIRED)
	private String emailId;

	@JsonProperty("userUid")
	@Schema(description = "User Uid", example = "User Uid", requiredMode = REQUIRED)
	private String userUid;

	@JsonProperty("corporateNumber")
	@Schema(description = "Corporate Number", example = "Corporate Number")
	private Long corporateNumber;

	@JsonProperty("corporateName")
	@Schema(description = "Corporate Name", example = "Corporate Name")
	private String corporateName;

	@JsonProperty("corporateLvlCode")
	@Schema(description = "Corporate LevelCode", example = "Corporate LevelCode")
	private String corporateLvlCode;

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
	private Long profileFileNumber;

	@JsonProperty("joinTypeCode")
	@Schema(description = "Join Type Code (#CD_GRP_ID=US002:(초대[IVT],셀프[SLF]))", example = "Join Type Code")
	private String joinTypeCode;

	@JsonProperty("countryCode")
	@Schema(description = "Country Code")
	private String countryCode;

	@JsonProperty("languageCode")
	@Schema(description = "Language Code", example = "Language Code")
	private String languageCode;

	@JsonProperty("userStatusCode")
	@Schema(description = "User Status Code(승인대기[APW],휴면[DMT],탈퇴[WDR],정상[NRM],작성중[WRG],승인거절[RJT])", example = "User Status Code")
	private String userStatusCode;

	@JsonProperty("denyReasonCode")
	@Schema(description = "Deny Reason Code(#CD_GRP_ID=PFM064:(직무 불명확[UNC],직무 부적합[UFR]))", example = "Deny Reason Code")
	private String denyReasonCode;

	@JsonProperty("userCode")
	@Schema(description = "SEEGENE or NEWCO")
	private UserValidCorpCode userCode;

	@JsonProperty("rolLvlCd")
	@Schema(description ="Level 1[LV1],Level 2[LV2],Level 3[LV3],Level 4[LV4],Level 5[LV5]) ", example = "LV1")
	private String rolLvlCode;

	@JsonProperty("corpStsCd")
	@Schema(description ="계약 진행 중[ONG],활성[ACT],비활성[INC],삭제[DEL]", example = "ACT")
	private String corpStsCd;

	@JsonProperty("isSignUp")
	@Schema(description = "회원가입 여부", example = "Y/N")
	private String isSignUp;

	@JsonProperty("isTermsAgr")
	@Schema(description = "약관동의 여부", example = "Y/N")
	private String isTermsAgr;

	@JsonProperty("isPwdUpdate")
	@Schema(description = "패스워드 90일이후 변경필요여부", example = "Y/N")
	private String isPwdUpdate;

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

	public LoginValidResponse(String emailId, String userUid, Long corporateNumber, String corporateName, String corporateLvlCode, String userName, String organizationName, String jobTitle, Long profileFileNumber, String joinTypeCode, String countryCode, String languageCode,
							  String userStatusCode, String userCode, String rolLvlCode, String corpStsCd, String otpAuthYn, String emailAuthYn, String adSynchYn, String crtrUid, LocalDateTime crtDt, String mdfrUid, LocalDateTime mdfDt) {
		this.emailId = emailId;
		this.userUid = userUid;
		this.corporateNumber = corporateNumber;
		this.corporateName = corporateName;
		this.corporateLvlCode = corporateLvlCode;
		this.userName = userName;
		this.organizationName = organizationName;
		this.jobTitle = jobTitle;
		this.profileFileNumber = profileFileNumber;
		this.joinTypeCode = joinTypeCode;
		this.countryCode = countryCode;
		this.languageCode = languageCode;
		this.userStatusCode = userStatusCode;
		this.userCode = userCode.equals("LV1")? SEEGENE: NEWCO;
		this.rolLvlCode = rolLvlCode;
		this.corpStsCd = corpStsCd;
		this.otpAuthYn = otpAuthYn;
		this.emailAuthYn = emailAuthYn;
		this.adSynchYn = adSynchYn;
		this.crtrUid = crtrUid;
		this.crtDt = DefaultDateTimeConverter.convertDateTime(crtDt);
		this.mdfrUid = mdfrUid;
		this.mdfDt = DefaultDateTimeConverter.convertDateTime(mdfDt);
	}
}
