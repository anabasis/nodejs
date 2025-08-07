package com.seegene.main.domain.join.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.join.entity.TusTermsAgr;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * AgreementResponse DTO
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
@Schema(description = "약관동의 Response DTO")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TusTermsAgrResponse {

	@JsonProperty("usrUid")
	@Schema(description = "초대 가입 사용자 고유 ID", example = "...", requiredMode = REQUIRED)
	private String usrUid;

	@JsonProperty("termsAgrNum")
	@Schema(description = "약관 동의 고유 번호", example = "10000", requiredMode = REQUIRED)
	private String termsAgrNum;

	@JsonProperty("termsConditNum")
	@Schema(description = "약관 아이디", example = "TM01", requiredMode = REQUIRED)
	private String termsConditNum;

	@JsonProperty("termsVerNum")
	@Schema(description = "약관 버전 번호", example = "10050", requiredMode = REQUIRED)
	private String termsVerNum;

	@JsonProperty("langCd")
	@Schema(description = "국가", example = "ko, en, ja")
	private String langCd;

	@JsonProperty("cont")
	@Schema(description = "약관내용", example = "Seegene agreement.....")
	private String cont;

	@JsonProperty("agrYn")
	@Schema(description = "약관 동의 여부", example = "Y or N")
	private String agrYn;


	@JsonProperty("agrDate")
	@Schema(description = "약관 동의일자", example = "2023-09-14 00:00:00")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime agrDate;


	public TusTermsAgrResponse(Long termsConditNum, Long termsVerNum, String langCd, String cont) {
		this.termsConditNum = String.valueOf(termsConditNum);
		this.termsVerNum = String.valueOf(termsVerNum);
		this.langCd = langCd;
		this.cont = cont;
	}

	public TusTermsAgrResponse(String usrUid, Long termsAgrNum, String termsVerNum, String agrYn, LocalDateTime agrDate) {
		this.usrUid = usrUid;
		this.termsAgrNum = String.valueOf(termsAgrNum);
		this.termsVerNum = termsVerNum;
		this.agrYn = agrYn;
		this.agrDate = agrDate;
	}

	public static List<TusTermsAgrResponse> fromEntity(List<TusTermsAgr> tusTermsAgrs) {
		return tusTermsAgrs.stream().map(tusTermsAgr -> new TusTermsAgrResponse(tusTermsAgr.getTusUsr().getId(), tusTermsAgr.getId(), tusTermsAgr.getTusTermsVer().getVer(), tusTermsAgr.getAgrYn(), tusTermsAgr.getCrtDt()))
			.collect(Collectors.toList());
	}

}
