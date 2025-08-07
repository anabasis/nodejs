package com.seegene.main.domain.join.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.join.vo.JoinAgreementVo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * JoinInviteResponse DTO
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
@Schema(description = "초대가입 Response DTO")
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
public class JoinInviteResponse {

	@JsonIgnore
	// @Schema(description = "초대 가입 이메일 주소", example = "kk@seegene.com", requiredMode = REQUIRED)
	private String emailId;

	@JsonProperty("termsCategoryCode")
	@Schema(description = "구분 항목 코드", example = "TM01")
	private String termsCategoryCode;

	@JsonProperty("termsVersionId")
	@Schema(description = "약관버전 고유 번호", example = "10052")
	private String termsVersionId;

	@JsonProperty("countryGrpId")
	@Schema(description = "국가 그룹", example = "CG0004")
	private String countryGrpId;

	@JsonProperty("termsVersionNum")
	@Schema(description = "약관버전 번호", example = "2.2")
	private String termsVersionNum;

	@JsonProperty("termsCategoryName")
	@Schema(description = "구분 항목", example = "서비스 이용약관, 개인정보 처리방침, 정보보약서약서..")
	private String termsCategoryName;

	@JsonProperty("cont")
	@Schema(description = "약관 내용", example = "대한민국")
	private String cont;

	@JsonProperty("agrYn")
	@Schema(description = "동의여부", example = "Y or N")
	private String agrYn;

	@JsonProperty("essential")
	@Schema(description = "필수여부", example = "Y or N")
	private String essential;

	@JsonProperty("langCode")
	@Schema(description = "약관 설정 언어", example = "ko, en")
	private String langCode;

	@JsonProperty("applyDate")
	@Schema(description = "게시일자", example = "2023-04-23")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime applyDate;

	public JoinInviteResponse(String termsCategoryCode, Long termsVersionId, String countryGrpId, String termsVersionNum, String termsCategoryName, String cont, String agrYn, String essential, String langCode, LocalDateTime applyDate) {
		this.termsCategoryCode = termsCategoryCode;
		this.termsVersionId = String.valueOf(termsVersionId);
		this.countryGrpId = countryGrpId;
		this.termsVersionNum = termsVersionNum;
		this.termsCategoryName = termsCategoryName;
		this.cont = cont;
		this.agrYn = agrYn;
		this.essential = essential;
		this.langCode = langCode;
		this.applyDate = applyDate;
	}

	public static JoinInviteResponse fromVo(JoinAgreementVo joinAgreementVo) {
		return JoinInviteResponse.builder()
			.termsCategoryCode(joinAgreementVo.getTermsCatCd())
			.termsVersionId(joinAgreementVo.getTermsVerNum())
			.termsCategoryName(joinAgreementVo.getCdNm())
			.essential(joinAgreementVo.getEssYn())
			.countryGrpId(joinAgreementVo.getCntryGrpId())
			.termsVersionNum(joinAgreementVo.getVer())
			.langCode(joinAgreementVo.getLangCode())
			.cont(joinAgreementVo.getCont())
			.applyDate(joinAgreementVo.getCrtDt())
			.build();
	}
}
