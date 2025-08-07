package com.seegene.main.domain.menumanagement.entity;


import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TSY_ADM_MNU_PERMSN_HST")
public class TsyAdmMnuPermsnHst extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ADM_MNU_PERMSN_HST_NUM", nullable = false)
	private Long id;

	@NotNull
	@Column(name = "ADM_MNU_PERMSN_NUM", nullable = false)
	private Long admMnuPermsnNum;

	@NotNull
	@Column(name = "MNU_NUM", nullable = false)
	private Long mnuNum;

	@NotNull
	@Column(name = "ADM_ROL_NUM", nullable = false)
	private Long admRolNum;

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

	@NotNull
	@Column(name = "HST_DT", nullable = false)
	private LocalDateTime hstDt;

	@Size(max = 20)
	@NotNull
	@Column(name = "HST_DVS_CD", nullable = false, length = 20)
	private String hstDvsCd;
}