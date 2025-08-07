package com.seegene.main.domain.common.entity;

import com.seegene.main.domain.datacodemanagement.entity.TcdCntry;
import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.Instant;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TCD_CNTRY_GRP_TG")
public class TcdCntryGrpTg extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CNTRY_GRP_TG_NUM", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "CNTRY_GRP_ID", nullable = false)
	private TcdCntryGrp cntryGrp;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "CNTRY_CD", nullable = false)
	private TcdCntry cntryCd;
}