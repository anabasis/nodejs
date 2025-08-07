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

@Table(name = "TBD_LIBR")
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TbdLibr extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LIBR_NUM", nullable = false)
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "LIBR_CAT_NUM", nullable = false)
	private TbdLibrCat librCatNum;

	@Column(name = "TITL", nullable = false, length = 260)
	private String titl;

	@Column(name = "CONT", nullable = false, columnDefinition = "LONGTEXT")
	private String cont;

	@Column(name = "DOWL_USE_YN", nullable = false, length = 1)
	private String dowlUseYn;

	@Column(name = "OPEN_LVL_CD", nullable = false, length = 20)
	private String openLvlCd;

	@ManyToOne(optional = false)
	@JoinColumn(name = "USR_UID", nullable = false)
	private TusUsr usrUid;
}