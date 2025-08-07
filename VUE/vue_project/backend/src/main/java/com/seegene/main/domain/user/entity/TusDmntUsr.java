package com.seegene.main.domain.user.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "TUS_DMNT_USR")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TusDmntUsr extends BaseEntity {

	@Id
	@Column(name = "DMNT_USR_UID", nullable = false, length = 40)
	private String id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "USR_UID", nullable = false)
	private TusUsr usrUid;

	@Column(name = "WKUP_DVS_CD", length = 20)
	private String wkupDvsCd;

	@Column(name = "WKUP_DT")
	private LocalDateTime wkupDt;

	@Column(name = "WKUP_CMNT", length = 500)
	private String wkupCmnt;
}