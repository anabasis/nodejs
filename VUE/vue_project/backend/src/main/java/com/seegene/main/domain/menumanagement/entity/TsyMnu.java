package com.seegene.main.domain.menumanagement.entity;


import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TSY_MNU")
public class TsyMnu extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MNU_NUM", nullable = false)
	private Long id;

	@Column(name = "PRNT_MNU_NUM")
	private Long prntMnuNum;

	@NotNull
	@Column(name = "MNU_DPTH", nullable = false)
	private Integer mnuDpth;

	@Column(name = "SORT_NUM")
	private Long sortNum;

	@Size(max = 20)
	@NotNull
	@Column(name = "MNU_TP_CD", nullable = false, length = 20)
	private String mnuTpCd;

	@Size(max = 20)
	@Column(name = "MNU_LOCT_CD", length = 20)
	private String mnuLoctCd;

	@Size(max = 20)
	@Column(name = "SYST_CD", length = 20)
	private String systCd;

	@Size(max = 480)
	@Column(name = "MNU_URL", length = 480)
	private String mnuUrl;

	@Column(name = "DFT_ICON_FL_NUM")
	private Long dftIconFlNum;

	@Column(name = "ACV_ICON_FL_NUM")
	private Long acvIconFlNum;

	@Column(name = "HOV_ICON_FL_NUM")
	private Long hovIconFlNum;

	@OneToMany(mappedBy = "tsyMnu", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<TsyAdmMnuPermsn> tsyAdmMnuPermsns = new ArrayList<>();

	@OneToMany(mappedBy = "tsyMnu", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<TsyDevMnuPermsn> tsyDevMnuPermsns = new ArrayList<>();

	@OneToMany(mappedBy = "prntMnuNum", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<TsyMnu> tsyMnus = new ArrayList<>();

	@OneToMany(mappedBy = "tsyMnu", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<TsyMnuMlg> tsyMnuMlgs = new ArrayList<>();
}
