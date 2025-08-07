package com.seegene.main.domain.common.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TCD_LANG")
public class TcdLang extends BaseEntity {
	@Id
	@Size(max = 20)
	@Column(name = "LANG_CD", nullable = false, length = 20)
	private String langCd;

	@Size(max = 100)
	@NotNull
	@Column(name = "ISO_LANG_NM", nullable = false, length = 100)
	private String isoLangNm;

	@Size(max = 100)
	@NotNull
	@Column(name = "NTV_NM", nullable = false, length = 100)
	private String ntvNm;

	@Size(max = 100)
	@NotNull
	@Column(name = "LANG_FML_NM", nullable = false, length = 100)
	private String langFmlNm;

	@Size(max = 1)
	@NotNull
	@Column(name = "USE_YN", nullable = false, length = 1)
	private String useYn;

}