package com.seegene.main.domain.notice.entity;

import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TBD_NTC_MLG")
public class TbdNtcMlg extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "NTC_MLG_NUM", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "NTC_NUM", nullable = false)
	private TbdNtc tbdNtc;

	@Size(max = 20)
	@NotNull
	@Column(name = "LANG_CD", nullable = false, length = 20)
	private String langCd;

	@Size(max = 260)
	@NotNull
	@Column(name = "TITL", nullable = false, length = 260)
	private String titl;

	@NotNull
	@Column(name = "CONT", nullable = false)
	private String cont;

}
