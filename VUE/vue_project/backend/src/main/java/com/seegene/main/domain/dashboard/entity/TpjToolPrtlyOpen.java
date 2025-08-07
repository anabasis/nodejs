package com.seegene.main.domain.dashboard.entity;


import com.seegene.main.domain.corporate.entity.TusCorp;
import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@Table(name = "TPJ_TOOL_PRTLY_OPEN")
@NoArgsConstructor
@AllArgsConstructor
public class TpjToolPrtlyOpen extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TOOL_PRTLY_OPEN_NUM", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "TOOL_NUM", nullable = false)
	private TpjTool tpjTool;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "CORP_NUM", nullable = false)
	private TusCorp tusCorp;

	public static TpjToolPrtlyOpen toEntity(TpjTool tpjTool, TusCorp tusCorp) {

		return TpjToolPrtlyOpen.builder()
			.tpjTool(tpjTool)
			.tusCorp(tusCorp)
			.build();
	}

}