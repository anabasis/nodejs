package com.seegene.main.domain.account.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TSW_LICN")
public class TswLicn extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LICN_NUM", nullable = false)
	private Long id;

	@Size(max = 20)
	@NotNull
	@Column(name = "SYST_CD", nullable = false, length = 20)
	private String systCd;

	@NotNull
	@Column(name = "CONT", nullable = false, columnDefinition = "LONGTEXT")
	private String cont;

}