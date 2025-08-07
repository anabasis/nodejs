package com.seegene.main.domain.user.entity;

import java.time.LocalDateTime;

import com.seegene.main.domain.authority.entity.TrlUsrRol;
import com.seegene.main.domain.corporate.entity.TusCorp;

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

@Table(name = "TUS_USR_INVT")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TusUsrInvt extends BaseEntity {

	@Id
	@Column(name = "USR_INVT_UID", nullable = false, length = 40)
	private String id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "FRM_USR_UID", nullable = false)
	private TusUsr frmUsrUid;

	@ManyToOne(optional = false)
	@JoinColumn(name = "CORP_NUM", nullable = false)
	private TusCorp corpNum;

	@Column(name = "EML_ID", nullable = false, length = 230)
	private String emlId;

	@ManyToOne(optional = false)
	@JoinColumn(name = "USR_ROL_NUM", nullable = false)
	private TrlUsrRol usrRolNum;

	@Column(name = "INVT_CNCL_DT")
	private LocalDateTime invtCnclDt;

	@ManyToOne
	@JoinColumn(name = "TO_USR_UID")
	private TusUsr toUsrUid;
}