package com.seegene.main.domain.user.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "TSR_WTHD_USR")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TsrWthdUsr extends BaseEntity {

	@Id
	@Size(max = 50)
	@Column(name = "USR_UID", nullable = false, length = 50)
	private String id;

	@NotNull
	@Column(name = "CORP_NUM", nullable = false)
	private long corpNum;

	@Size(max = 230)
	@NotNull
	@Column(name = "EML_ID", nullable = false, length = 230)
	private String emlId;

	@Size(max = 100)
	@NotNull
	@Column(name = "USR_NM", nullable = false, length = 100)
	private String usrNm;

	@Size(max = 80)
	@Column(name = "ORGN_NM", length = 80)
	private String orgnNm;

	@Size(max = 40)
	@Column(name = "JOB_TITL", length = 40)
	private String jobTitl;

	@Size(max = 40)
	@Column(name = "JOB_NM", length = 40)
	private String jobNm;

	@Column(name = "PRFL_FL_NUM")
	private Long prflFlNum;

	@Size(max = 20)
	@NotNull
	@Column(name = "JOIN_TP_CD", nullable = false, length = 20)
	private String joinTpCd;

	@Size(max = 20)
	@Column(name = "CNTRY_CD", length = 20)
	private String cntryCd;

	@Size(max = 20)
	@Column(name = "LANG_CD", length = 20)
	private String langCd;

	@Size(max = 20)
	@NotNull
	@Column(name = "USR_STS_CD", nullable = false, length = 20)
	private String usrStsCd;

	@Size(max = 1)
	@NotNull
	@Column(name = "OTP_AUTH_YN", nullable = false, length = 1)
	private String otpAuthYn;

	@Size(max = 1)
	@NotNull
	@Column(name = "EML_AUTH_YN", nullable = false, length = 1)
	private String emlAuthYn;

	@Size(max = 1)
	@NotNull
	@Column(name = "AD_SYN_YN", nullable = false, length = 1)
	private String adSynYn;

	@NotNull
	@Column(name = "LST_ALM_INQR_DT", nullable = false)
	private LocalDateTime lstAlmInqrDt;


	@NotNull
	@Column(name = "SEPER_DT", nullable = false)
	private LocalDateTime seperDt;

}