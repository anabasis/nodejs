package com.seegene.main.domain.corporate.entity;

import java.time.ZonedDateTime;
import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TUS_CORP_HST")
public class TusCorpHst extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CORP_HST_NUM", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "CORP_NUM", nullable = false)
	private TusCorp tusCorp;

	@Size(max = 80)
	@Column(name = "CORP_NM", length = 80)
	private String corpNm;

	@Size(max = 20)
	@Column(name = "CORP_LVL_CD", length = 20)
	private String corpLvlCd;

	@Size(max = 40)
	@Column(name = "MNGR_USR_UID", length = 40)
	private String mngrUsrUid;

	@Size(max = 20)
	@Column(name = "ROL_LVL_CD", length = 20)
	private String rolLvlCd;

	@Size(max = 20)
	@NotNull
	@Column(name = "CNTRY_CD", nullable = false, length = 20)
	private String cntryCd;

	@Size(max = 230)
	@Column(name = "RPRS_EML_ADDR", length = 230)
	private String rprsEmlAddr;

	@Size(max = 20)
	@NotNull
	@Column(name = "CORP_STS_CD", nullable = false, length = 20)
	private String corpStsCd;

	@Size(max = 20)
	@NotNull
	@Column(name = "HST_DVS_CD", nullable = false, length = 20)
	private String hstDvsCd;

	@NotNull
	@Column(name = "HST_DT", nullable = false)
	private ZonedDateTime hstDt;

}