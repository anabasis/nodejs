package com.seegene.main.domain.board.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;
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
@Table(name = "TBD_MDL_MNGR")
public class TbdMdlMngr extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MDL_MNGR_NUM", nullable = false)
	private Long id;

	@Size(max = 20)
	@NotNull
	@Column(name = "QNA_CAT_CD", nullable = false, length = 20)
	private String qnaCatCd;

	@Size(max = 20)
	@NotNull
	@Column(name = "MDL_TP_CD", nullable = false, length = 20)
	private String mdlTpCd;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "MNGR_USR_UID", nullable = false)
	private TusUsr tusUsr;

}