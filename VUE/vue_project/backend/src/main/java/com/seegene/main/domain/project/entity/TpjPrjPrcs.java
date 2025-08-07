package com.seegene.main.domain.project.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/**
 * TPJ_PRJ_PRCS Entity
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-11        khhong        최초작성
 * </PRE>
 */
@Entity
@Table(name = "TPJ_PRJ_PRCS")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TpjPrjPrcs extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PRJ_PRCS_NUM", nullable = false)
	private Long id;

	@Size(max = 20)
	@Column(name = "PRCS_CD", nullable = false, length = 20)
	private String prcsCd;

	@Size(max = 20)
	@Column(name = "PRCS_STS_CD", nullable = false, length = 20)
	private String prcsStsCd;

	@Size(max = 20)
	@Column(name = "PRD_TP_CD", length = 20)
	private String prdTpCd;

	@Size(max = 20)
	@Column(name = "DTA_TP_CD", length = 20)
	private String dtaTpCd;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
//	@JsonBackReference
	@JoinColumn(name = "PRJ_NUM", nullable = false)
	private TpjPrj tpjPrj;

	@OneToMany(mappedBy = "tpjPrjPrcs",  fetch = FetchType.LAZY)
	private List<TpjPrjPrcsMbr> tpjPrjPrcsMbrList = new ArrayList<>();

//	@OneToMany(mappedBy = "prjPrcsNum")
//	private List<TpjPrjPrcsMbshReq> tpjPrjPrcsMbshReqs = new ArrayList<>();

//	@OneToMany(mappedBy = "prjPrcsNum")
//	private List<TpjPrjFl> tpjPrjFls  = new ArrayList<>();

	@OneToMany(mappedBy = "tpjPrjPrcs" , fetch = FetchType.LAZY)
	private List<TpjPrjPrcsSts> tpjPrjPrcStsList = new ArrayList<>();

	@OneToMany(mappedBy = "tpjPrjPrcs")
	private List<TpjPrjFl> tpjPrjFls = new ArrayList<>();

}