package com.seegene.main.domain.notice.entity;

import java.util.ArrayList;
import java.util.List;

import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TBD_NTC_ATCH")
public class TbdNtcAtch extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "NTC_ATCH_NUM", nullable = false)
	private Long id;

	@NotNull
	@Column(name = "FL_NUM", nullable = false)
	private Long flNum;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "NTC_NUM", nullable = false)
	private TbdNtc tbdNtc;

}
