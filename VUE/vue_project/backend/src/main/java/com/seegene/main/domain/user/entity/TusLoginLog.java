package com.seegene.main.domain.user.entity;

import java.time.Instant;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "TUS_LOGIN_LOG")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TusLoginLog extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LOGIN_LOG_NUM", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "USR_UID", nullable = false)
	private TusUsr tusUsr;

	@Column(name = "LOGIN_DT", nullable = false)
	private LocalDateTime loginDt;

	@Column(name = "IP_ADDR", nullable = false, length = 60)
	private String ipAddr;

	@Column(name = "CNTRY_CD", length = 20)
	private String cntryCd;

	@Column(name = "CNTRY_NM", length = 80)
	private String cntryNm;

	@Column(name = "CTY_NM", length = 100)
	private String ctyNm;

	@Column(name = "RGN_NM", length = 100)
	private String rgnNm;

	@Column(name = "TM_ZN_NM", length = 40)
	private String tmZnNm;
}