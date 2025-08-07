package com.seegene.main.domain.menumanagement.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TSY_DEV_MNU_PERMSN_HST")
public class TsyDevMnuPermsnHst extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DEV_MNU_PERMSN_HST_NUM", nullable = false)
	private Long id;

	@Column(name = "DEV_MNU_PERMSN_NUM", nullable = false)
	private Long devMnuPermsnNum;

	@Column(name = "MNU_NUM", nullable = false)
	private Long mnuNum;

	@Column(name = "USR_ROL_NUM", nullable = false)
	private Long usrRolNum;

	@Column(name = "RED_YN", nullable = false, length = 1)
	private String redYn;

	@Column(name = "CRT_YN", nullable = false, length = 1)
	private String crtYn;

	@Column(name = "UPT_YN", nullable = false, length = 1)
	private String uptYn;

	@Column(name = "DEL_YN", nullable = false, length = 1)
	private String delYn;

	@Column(name = "HST_DT", nullable = false)
	private LocalDateTime hstDt;

	@Column(name = "HST_DVS_CD", nullable = false, length = 20)
	private String hstDvsCd;
}