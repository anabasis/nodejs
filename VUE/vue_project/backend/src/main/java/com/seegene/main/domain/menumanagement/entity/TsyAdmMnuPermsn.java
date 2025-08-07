package com.seegene.main.domain.menumanagement.entity;

import com.seegene.main.domain.authority.entity.TrlAdmRol;
import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Builder
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TSY_ADM_MNU_PERMSN")
public class TsyAdmMnuPermsn extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ADM_MNU_PERMSN_NUM", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "MNU_NUM", nullable = false)
	private TsyMnu tsyMnu;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "ADM_ROL_NUM", nullable = false)
	private TrlAdmRol trlAdmRol;

	@Size(max = 1)
	@NotNull
	@Column(name = "RED_YN", nullable = false, length = 1)
	private String redYn;

	@Size(max = 1)
	@NotNull
	@Column(name = "CRT_YN", nullable = false, length = 1)
	private String crtYn;

	@Size(max = 1)
	@NotNull
	@Column(name = "UPT_YN", nullable = false, length = 1)
	private String uptYn;

	@Size(max = 1)
	@NotNull
	@Column(name = "DEL_YN", nullable = false, length = 1)
	private String delYn;
}