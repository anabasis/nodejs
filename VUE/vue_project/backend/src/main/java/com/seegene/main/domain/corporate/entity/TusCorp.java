package com.seegene.main.domain.corporate.entity;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import com.seegene.main.domain.notice.entity.TbdNtcPrtlyOpen;
import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TUS_CORP")
public class TusCorp extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CORP_NUM", nullable = false)
	private Long id;

	@Size(max = 80)
	@NotNull
	@Column(name = "CORP_NM", nullable = false, length = 80)
	private String corpNm;

	@Size(max = 20)
	@NotNull
	@Column(name = "CORP_LVL_CD", nullable = false, length = 20)
	private String corpLvlCd;

	@Size(max = 40)
	@Column(name = "MNGR_USR_UID", length = 40)
	private String mngrUsrUid;

	@Size(max = 20)
	@Column(name = "ROL_LVL_CD", length = 20)
	private String rolLvlCd;

	@Size(max = 20)
	@NotNull
	@Column(name = "CNTRY_CD")
	private String cntryCd;

	@Size(max = 230)
	@Column(name = "RPRS_EML_ADDR", length = 230)
	private String rprsEmlAddr;

	@Size(max = 20)
	@NotNull
	@Column(name = "CORP_STS_CD", nullable = false, length = 20)
	private String corpStsCd;

	@Size(max = 100)
	@Column(name = "DOMN_NM", length = 100)
	private String domnNm;

	@Column(name = "DSCRP")
	private String dscrp;

	@OneToMany(mappedBy = "tusCorp" ,fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	private List<TusCorpHst> tusCorpHstList = new ArrayList<>();

	@OneToMany(mappedBy = "tusCorp" ,fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	private List<TusCorpSt> tusCorpStList = new ArrayList<>();
	@OneToMany
	@JoinColumn(name="CORP_NUM", referencedColumnName = "CORP_NUM")
	private List<TusUsr> tusUsrList;

	@OneToMany(mappedBy = "tusCorp",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	private List<TbdNtcPrtlyOpen> tbdNtcPrtlyOpens = new ArrayList<>();

}
