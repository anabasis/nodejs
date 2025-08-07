package com.seegene.main.domain.board.entity;

import java.util.LinkedHashSet;
import java.util.Set;

import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;

import jakarta.persistence.*;
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
@Table(name = "TBD_QNA_CMNT")
public class TbdQnaCmnt extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "QNA_CMNT_NUM", nullable = false)
	private Long id;

	@Column(name = "PRNT_QNA_CMNT_NUM")
	private Integer prntQnaCmntNum;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "QNA_NUM", nullable = false)
	private TbdQna tbdQna;

	@Size(max = 2000)
	@NotNull
	@Column(name = "CMNT", nullable = false, length = 2000)
	private String cmnt;

	@Size(max = 1)
	@NotNull
	@Column(name = "DEL_YN", nullable = false, length = 1)
	private String delYn;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "USR_UID", nullable = false)
	private TusUsr tusUsr;

}