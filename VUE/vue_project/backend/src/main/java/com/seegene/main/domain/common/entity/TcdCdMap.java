package com.seegene.main.domain.common.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TCD_CD_MAP")
public class TcdCdMap {

	@Id
	@Column(name = "CD_MAP_NUM", nullable = false )
	private Long id;

	@Column(name = "MAP_TP_CD", nullable = false)
	private String mapTpCd;

	@Column(name = "SRC_CD_ITM_NUM", nullable = false)
	private Long srcCdItmNum;

	@Column(name = "TG_CD_ITM_NUM",nullable = false)
	private Long tgCdItmNum;

}