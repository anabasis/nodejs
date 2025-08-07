package com.seegene.main.domain.account.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name = "TUS_TERMS")
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AccountTusTerms extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TERMS_NUM", nullable = false)
	private Long id;

	@Column(name = "TERMS_CAT_CD", nullable = false, length = 20)
	private String termsCatCd;

	@Column(name = "CNTRY_GRP_ID", nullable = false, length = 10)
	private String cntryGrpId;

	@OneToMany(mappedBy = "termsNum", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<AccountTusTermsVer> accountTusTermsVerList;
}