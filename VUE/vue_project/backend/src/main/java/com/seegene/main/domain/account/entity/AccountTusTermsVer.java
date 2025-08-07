package com.seegene.main.domain.account.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Table(name = "TUS_TERMS_VER")
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AccountTusTermsVer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TERMS_VER_NUM", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TERMS_NUM", nullable = false)
	private AccountTusTerms termsNum;

	@Column(name = "VER", nullable = false, length = 16)
	private String ver;

	@Column(name = "APL_DT", nullable = false)
	private LocalDateTime aplDt;

	@OneToMany(mappedBy = "termsVerNum", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<AccountTusTermsCondit> accountTusTermsConditList;
}