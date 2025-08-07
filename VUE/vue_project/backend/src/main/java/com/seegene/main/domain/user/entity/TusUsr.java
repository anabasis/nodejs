package com.seegene.main.domain.user.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import com.seegene.main.domain.authority.entity.TrlUsrRolApl;
import com.seegene.main.domain.authority.entity.TrlUsrRolReq;
import com.seegene.main.domain.board.entity.TbdQna;
import com.seegene.main.domain.board.entity.TbdQnaCmnt;
import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.domain.corporate.entity.TusCorp;
import com.seegene.main.domain.databox.entity.TbdLibr;
import com.seegene.main.domain.databox.entity.TbdLibrCat;
import com.seegene.main.domain.notice.entity.TbdNtc;
import com.seegene.main.domain.project.entity.TpjPrjMbshReq;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "TUS_USR")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TusUsr extends BaseEntity {

	@Id
	@Size(max = 50)
	@Column(name = "USR_UID", nullable = false, length = 50)
	private String id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "CORP_NUM", nullable = false)
	private TusCorp tusCorp;

	@Size(max = 230)
	@NotNull
	@Column(name = "EML_ID", nullable = false, length = 230)
	private String emlId;

	@Size(max = 120)
	@Column(name = "LOGIN_PWD", length = 120)
	private String loginPwd;

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

	@OneToOne(fetch = FetchType.LAZY, targetEntity = TsyFl.class)
	@JoinColumn(name = "PRFL_FL_NUM" ,referencedColumnName = "FL_NUM")
	private TsyFl tsyFl;

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

	@OneToMany(mappedBy = "tusUsr")
	private Set<TbdNtc> tbdNtcs = new LinkedHashSet<>();
	@OneToMany(mappedBy = "tusUsr")
	private List<TbdQnaCmnt> tbdQnaCmnts = new ArrayList<>();

	@OneToMany(mappedBy = "tusUsr")
	private Set<TusUsrSt> tusUsrSts = new LinkedHashSet<>();
	@OneToMany(mappedBy = "tusUsr")
	private Set<TrlUsrRolReq> trlUsrRolReqs = new LinkedHashSet<>();

	@OneToMany(mappedBy = "tusUsr2")
	private Set<TrlUsrRolReq> trlUsrRolReqs2 = new LinkedHashSet<>();
	@OneToMany(mappedBy = "tusUsr")
	private List<TbdQna> tbdQnas = new ArrayList<>();

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USR_UID", referencedColumnName = "USR_UID")
	private TrlUsrRolApl trlUsrRolApl;

	public void updateLangCd(String langCd) {
		this.langCd = langCd;
	}

	// @OneToOne(mappedBy = "toUsrUid")
	// private TpjInvtPrjMbr tpjInvtPrjMbr;

	// @OneToMany(mappedBy = "usrUid")
	// private Set<TusDmntUsr> tusDmntUsrs = new LinkedHashSet<>();

	// @OneToMany(mappedBy = "tusUsr")
	// private Set<TusUsrNotfSetg> tusUsrNotfSetgs = new LinkedHashSet<>();

	// @OneToMany(mappedBy = "frmTusUsr")
	// private Set<TusUsrInvt> tusUsrInvts = new LinkedHashSet<>();

	// @OneToOne(mappedBy = "toTusUsr")
	// private TusUsrInvt tusUsrInvt;

	// @OneToMany(mappedBy = "tusUsr")
	// private List<TbdQnaAnsw> tbdQnaAnsws = new ArrayList<>();

	// @OneToMany(mappedBy = "mngrUsrUid")
	// private Set<TbdMdlMngr> tbdMdlMngrs = new LinkedHashSet<>();

	// @OneToMany(mappedBy = "usrUid")
	// private Set<TusPwdReset> tusPwdResets = new LinkedHashSet<>();

	// @OneToMany(mappedBy = "usrUid")
	// private Set<TbdLibr> tbdLibrs = new LinkedHashSet<>();

	// @OneToMany(mappedBy = "usrUid")
	// private Set<TpjPrjMbr> tpjPrjMbrs = new LinkedHashSet<>();
	//
	// @OneToMany(mappedBy = "tusUsr")
	// private List<TbdQnaPrtlyOpen> tbdQnaPrtlyOpens = new ArrayList<>();
	//
	// @OneToMany(mappedBy = "tusUsr")
	// private Set<TusUsrIdtfVerf> tusUsrIdtfVerfs = new LinkedHashSet<>();
	//
	// @OneToOne(mappedBy = "tusUsr")
	// private TusUsrAprv tusUsrAprv;
	//
	// @OneToMany(mappedBy = "crtUsrUid")
	// private Set<TpjPrj> tpjPrjs = new LinkedHashSet<>();
	//
	// @OneToMany(mappedBy = "usrUid")
	// private Set<TbdNotf> tbdNotfs = new LinkedHashSet<>();
	//
	// @OneToMany(mappedBy = "usrUid")
	// private Set<TrlRolReq> trlRolReqs = new LinkedHashSet<>();

	// @OneToMany(mappedBy = "usrUid")
	// private Set<TusTermsAgr> tusTermsAgrs = new LinkedHashSet<>();

	@OneToMany(mappedBy = "tusUsr")
	private Set<TpjPrjMbshReq> tpjPrjMbshReqs = new LinkedHashSet<>();

	@OneToMany(mappedBy = "tusUsr")
	private Set<TbdLibrCat> tbdLibrCats = new LinkedHashSet<>();

	// @OneToMany(mappedBy = "usrUid")
	// private Set<TrlAdmRolApl> trlAdmRolApls = new LinkedHashSet<>();

	// @OneToMany(mappedBy = "usrUid")
	// private Set<TusFav> tusFavs = new LinkedHashSet<>();

	// @OneToMany(mappedBy = "tusUsr")
	// private Set<TusVistPage> tusVistPages = new LinkedHashSet<>();
}