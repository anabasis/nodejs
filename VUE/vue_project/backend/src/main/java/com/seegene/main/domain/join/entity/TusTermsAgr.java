package com.seegene.main.domain.join.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;

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
@Table(name = "TUS_TERMS_AGR")
public class TusTermsAgr extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TERMS_AGR_NUM", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "USR_UID", nullable = false)
	private TusUsr tusUsr;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "TERMS_VER_NUM", nullable = false)
	private TusTermsVer tusTermsVer;

	@Size(max = 1)
	@NotNull
	@Column(name = "AGR_YN", nullable = false, length = 1)
	private String agrYn;

}