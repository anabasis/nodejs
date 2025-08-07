package com.seegene.main.domain.user.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "TUS_USR_IDTF_VERF")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TusUsrIdtfVerf extends BaseEntity {

	@Id
	@Column(name = "USR_IDTF_VERF_UID", nullable = false, length = 40)
	private String id;

	@Column(name = "IDTF_VERF_CAT_CD", nullable = false, length = 20)
	private String idtfVerfCatCd;

	@ManyToOne
	@JoinColumn(name = "USR_UID")
	private TusUsr usrUid;

	@Column(name = "VERF_METHD_CD", nullable = false, length = 20)
	private String verfMethdCd;

	@Column(name = "VERF_KEY", length = 26)
	private String verfKey;

	@Column(name = "EXPR_DT", nullable = false)
	private LocalDateTime exprDt;

	@Column(name = "EML_ID", length = 230)
	private String emlId;

	@Column(name = "MOBL_PHON_NUM", length = 80)
	private String moblPhonNum;
}