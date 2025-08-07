package com.seegene.main.domain.project.entity;

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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "TPJ_PRJ_PRCS_MBSH_REQ")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TpjPrjPrcsMbshReq extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PRJ_PRCS_MBSH_REQ_NUM", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "PRJ_MBSH_REQ_NUM", nullable = false)
	private TpjPrjMbshReq tpjPrjMbshReq;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "PRJ_PRCS_NUM", nullable = false)
	private TpjPrjPrcs tpjPrjPrcs;

	@Column(name = "PRCS_ROL_CD", nullable = false)
	private String prcsRolCd;

}
