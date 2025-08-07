package com.seegene.main.domain.datacodemanagement.entity;

import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TCD_CD_ITM_MLG")
public class TcdCdItmMlg extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CD_ITM_MLG_NUM", nullable = false)
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "CD_ITM_NUM", nullable = false)
	private TcdCdItm cdItm;

	@Column(name = "LANG_CD", nullable = false, length = 20)
	private String langCd;

	@Column(name = "CD_NM", nullable = false, length = 100)
	private String cdNm;

}