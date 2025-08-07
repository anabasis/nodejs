package com.seegene.main.domain.corporate.entity;

import java.time.LocalDateTime;
import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TUS_CORP_STS")
public class TusCorpSt extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CORP_STS_NUM", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "CORP_NUM", nullable = false)
	private TusCorp tusCorp;

	@NotNull
	@Column(name = "STS_DT", nullable = false)
	private LocalDateTime stsDt;

	@Size(max = 20)
	@NotNull
	@Column(name = "CORP_STS_CD", nullable = false, length = 20)
	private String corpStsCd;

}