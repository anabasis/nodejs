package com.seegene.main.domain.login.entity;

import java.time.LocalDateTime;

import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

@Table(name = "TUS_PWD_RESET")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TusPwdReset extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PWD_RESET_NUM", nullable = false)
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "USR_UID", nullable = false)
	private TusUsr tusUsr;

	@Column(name = "RESET_DT", nullable = false)
	private LocalDateTime resetDt;

}