package com.seegene.main.domain.user.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "TUS_USR_APRV")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TusUsrAprv extends BaseEntity {

	@Id
	@Column(name = "USR_UID", nullable = false, length = 40)
	private String id;

	@Column(name = "APRV_RSL_CD", length = 20)
	private String aprvRslCd;

	@Column(name = "DNY_RESN_CD")
	private String dnyResnCd;

	@Column(name = "APRV_DT")
	private LocalDateTime aprvDt;
}