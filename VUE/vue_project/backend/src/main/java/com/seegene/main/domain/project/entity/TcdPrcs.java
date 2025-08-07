package com.seegene.main.domain.project.entity;

import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "TCD_PRCS")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TcdPrcs extends BaseEntity {
	@Id
	@Column(name = "PRCS_CD", length = 20, nullable = false)
	private String id;
	@Column(name = "PRCS_NM", length = 40, nullable = false)
	private String prcsNm;
	@Column(name = "SORT_NUM", nullable = false)
	private Long sortNum;
}