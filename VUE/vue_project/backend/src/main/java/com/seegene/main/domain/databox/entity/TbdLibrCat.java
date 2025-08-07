package com.seegene.main.domain.databox.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;

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

@Table(name = "TBD_LIBR_CAT")
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TbdLibrCat extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LIBR_CAT_NUM", nullable = false)
	private Long id;

	@Column(name = "LIBR_CAT_NM", nullable = false, length = 100)
	private String librCatNm;

	@Column(name = "DSCRP", nullable = false, columnDefinition = "LONGTEXT")
	private String dscrp;

	@Column(name = "ICON_FL_NM", nullable = false, length = 40)
	private String iconFlNm;

	@Column(name = "SORT_NUM", nullable = false)
	private Long sortNum;

	@ManyToOne(optional = false)
	@JoinColumn(name = "USR_UID", nullable = false)
	private TusUsr tusUsr;
}