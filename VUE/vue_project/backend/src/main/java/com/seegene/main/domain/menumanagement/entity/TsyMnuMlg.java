package com.seegene.main.domain.menumanagement.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Builder
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TSY_MNU_MLG")
public class TsyMnuMlg extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MNU_MLG_NUM", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "MNU_NUM", nullable = false)
	private TsyMnu tsyMnu;

	@Size(max = 20)
	@NotNull
	@Column(name = "LANG_CD", nullable = false, length = 20)
	private String langCd;

	@Size(max = 100)
	@NotNull
	@Column(name = "MNU_NM", nullable = false, length = 100)
	private String mnuNm;
}
