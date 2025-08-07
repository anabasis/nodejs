package com.seegene.main.domain.common.entity;

import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TSY_FL")
public class TsyFl extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FL_NUM", nullable = false)
	private Long id;

	@Column(name = "FL_NM", nullable = false, length = 100)
	private String flNm;

	@Column(name = "DSP_FL_NM", length = 100)
	private String dspFlNm;

	@Column(name = "FL_EXTN", length = 28)
	private String flExtn;

	@Column(name = "FL_PATH", nullable = false, length = 360)
	private String flPath;

	@Column(name = "FL_SZ", nullable = false)
	private Long flSz;

	@Column(name = "STOG_TP_CD")
	private String stogTpCd;

	@Column(name = "TBL_NM", nullable = false, length = 100)
	private String tblNm;
	

}