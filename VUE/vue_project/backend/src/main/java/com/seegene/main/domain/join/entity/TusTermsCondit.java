package com.seegene.main.domain.join.entity;

import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
@Table(name = "TUS_TERMS_CONDIT")
public class TusTermsCondit extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TERMS_CONDIT_NUM", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "TERMS_VER_NUM", nullable = false)
	private TusTermsVer tusTermsVer;

	@Size(max = 20)
	@NotNull
	@Column(name = "LANG_CD", nullable = false, length = 20)
	private String langCd;

	@NotNull
	@Column(name = "CONT", nullable = false)
	private String cont;

}