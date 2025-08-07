package com.seegene.main.domain.project.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * TPJ_PRJ_MBSH_REQ Entity
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
@Table(name = "TPJ_PRJ_MBSH_REQ")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TpjPrjMbshReq extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PRJ_MBSH_REQ_NUM", nullable = false)
	private Long id;

	@Size(max = 20)
	@Column(name = "PRJ_ROL_CD", nullable = false, length = 20)
	private String prjRolCd;

	@Size(max = 500)
	@Column(name = "REQ_RESN_CONT", length = 500)
	private String reqResnCont;

	@Size(max = 20)
	@Column(name = "REQ_TP_CD", nullable = false, length = 20)
	private String reqTpCd;

	@Size(max = 20)
	@Column(name = "APRV_RSL_CD", length = 20)
	private String aprvRslCd;

	@Column(name = "APRV_DT")
	private LocalDateTime aprvDt;

	@Size(max = 1000)
	@Column(name = "MNGR_CMNT", length = 1000)
	private String mngrCmnt;

	@Size(max = 40)
	@Column(name = "MNGR_USR_UID", length = 40)
	private String mngrUsrUid;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JsonBackReference
	@JoinColumn(name = "PRJ_NUM",  nullable = false)
	private TpjPrj tpjPrj;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JsonBackReference
	@JoinColumn(name = "REQ_USR_UID", nullable = false)
	private TusUsr tusUsr;

	@OneToOne(mappedBy = "tpjPrjMbshReq" , fetch = FetchType.EAGER)
	private TpjPrjMbr tpjPrjMbr;

	@OneToMany(mappedBy = "tpjPrjMbshReq")
	private List<TpjPrjPrcsMbshReq> tpjPrjPrcsMbshReqList = new ArrayList<>();

	@OneToMany(mappedBy = "tpjPrjMbshReq")
	private List<TpjPrjMbshReqPups> tpjPrjMbshReqPups = new ArrayList<>();
}