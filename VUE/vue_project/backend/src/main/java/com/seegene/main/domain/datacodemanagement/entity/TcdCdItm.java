package com.seegene.main.domain.datacodemanagement.entity;

import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TCD_CD_ITM")
public class TcdCdItm extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CD_ITM_NUM", nullable = false)
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "CD_GRP_ID", nullable = false)
	private TcdCdGrp cdGrp;

	@OneToMany(mappedBy = "cdItm")
	private List<TcdCdItmMlg> tcdCdItmMlgList = new ArrayList<>();

	@Column(name = "CD", nullable = false, length = 20)
	private String cd;

	@NotNull
	@Column(name = "DFT_CD_NM", nullable = false)
	private String dftcdNm;

	@Column(name = "SORT_NUM", nullable = false)
	private Long sortNum;

	@Column(name = "DYN1_ATTR", length = 360)
	private String dyn1Attr;

	@Column(name = "DYN2_ATTR", length = 360)
	private String dyn2Attr;

}