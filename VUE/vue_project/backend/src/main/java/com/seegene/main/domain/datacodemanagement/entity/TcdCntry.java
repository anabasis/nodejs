package com.seegene.main.domain.datacodemanagement.entity;

import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TCD_CNTRY")
public class TcdCntry extends BaseEntity {
	@Id
	@Column(name = "CNTRY_CD", nullable = false)
	private String id;
	@Column(name = "ENG_CONTINT_NM")
	private String engContintNm;
	@Column(name = "ADMTV_CONTINT_NM")
	private String admtvContintNm;
	@Column(name = "ENG_CNTRY_NM")
	private String engCntryNm;
	@Column(name = "KOR_CNTRY_NM")
	private String korCntryNm;
	@Column(name = "MOTHR_CNTRY_NM")
	private String mothrCntryNm;
}
