package com.seegene.main.domain.project.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * TPJ_PRJ_MBR Entity
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
@Table(name = "TPJ_PRJ_MBR")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TpjPrjMbr extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PRJ_MBR_NUM", nullable = false)
	private Long id;

	@Column(name = "START_DT", nullable = false)
	private LocalDateTime startDt;

	@Size(max = 20)
	@Column(name = "PRJ_ROL_CD", nullable = false, length = 20)
	private String prjRolCd;

	@Size(max = 20)
	@Column(name = "JOIN_TP_CD", nullable = false, length = 20)
	private String joinTpCd;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PRJ_MBSH_REQ_NUM")
	private TpjPrjMbshReq tpjPrjMbshReq;

//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "INVT_PRJ_MBR_UID")
//	private TpjInvtPrjMbr invtPrjMbrUid;


	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JsonBackReference
	@JoinColumn(name = "PRJ_NUM",  nullable = false)
	private TpjPrj tpjPrj;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JsonBackReference
	@JoinColumn(name = "USR_UID", nullable = false)
	private TusUsr tusUsr;

	@OneToMany(mappedBy = "tpjPrjMbr", fetch = FetchType.LAZY)
	private List<TpjPrjPrcsMbr> tpjPrjPrcsMbrList = new ArrayList<>();

	@OneToMany(mappedBy = "prjMbrNum")
	private List<TpjPrjMbrHst> tpjPrjMbrHsts = new ArrayList<>();

	public void updateByProjectUpdate(String prjRolCd){
		this.setPrjRolCd(prjRolCd);
	}

	public void addTpjPrjMbrHst(TpjPrjMbrHst tpjPrjMbrHst){
		this.tpjPrjMbrHsts = new ArrayList<>();
		tpjPrjMbrHsts.add(tpjPrjMbrHst);
	}
}