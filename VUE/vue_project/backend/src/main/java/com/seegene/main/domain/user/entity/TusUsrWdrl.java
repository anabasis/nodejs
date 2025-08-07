package com.seegene.main.domain.user.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "TUS_USR_WDRL")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TusUsrWdrl extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "USR_WDRL_NUM", nullable = false)
	private Long id;

	@Column(name = "USR_UID", nullable = false, length = 40)
	private String usrUid;

	@Column(name = "WDRL_RESN_CD", length = 500)
	private String wdrlResnCd;

	@Column(name = "WDRL_TP_CD", nullable = false, length = 20)
	private String wdrlTpCd;

	@Column(name = "WDRL_DT")
	private LocalDateTime wdrlDt;
}