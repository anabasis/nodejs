package com.seegene.main.domain.account.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "TUS_TERMS_CONDIT")
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AccountTusTermsCondit extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TERMS_CONDIT_NUM", nullable = false)
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "TERMS_VER_NUM", nullable = false)
	private AccountTusTermsVer termsVerNum;

	@Column(name = "LANG_CD", nullable = false, length = 20)
	private String langCd;

	@Column(name = "CONT", nullable = false,columnDefinition = "LONGTEXT")
	private String cont;
}