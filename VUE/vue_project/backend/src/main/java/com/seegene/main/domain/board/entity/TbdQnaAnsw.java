package com.seegene.main.domain.board.entity;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
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
@Table(name = "TBD_QNA_ANSW")
public class TbdQnaAnsw extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "QNA_ANSW_NUM", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "QNA_NUM", nullable = false)
	private TbdQna tbdQna;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "ANSW_USR_UID", nullable = false)
	private TusUsr tusUsr;

	@NotNull
	@Column(name = "ANSW_CONT", nullable = false, columnDefinition = "LONGTEXT")
	private String answCont;

	@OneToMany(mappedBy = "tbdQnaAnsw")
	private List<TbdQnaAnswAtch> tbdQnaAnswAtches = new ArrayList<>();


}