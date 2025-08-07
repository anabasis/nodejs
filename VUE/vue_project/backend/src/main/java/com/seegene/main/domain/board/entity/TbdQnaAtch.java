package com.seegene.main.domain.board.entity;

import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "TBD_QNA_ATCH")
public class TbdQnaAtch extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "QNA_ATCH_NUM", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "QNA_NUM", nullable = false)
	private TbdQna tbdQna;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "FL_NUM")
	private TsyFl qnaAttach;

	public void setQnaEntity(TbdQna boardQnaEntity){
		if(this.tbdQna != null){
			this.tbdQna.getTbdQnaAnsws().remove(this);
		}
		this.tbdQna = boardQnaEntity;
		boardQnaEntity.getTbdQnaAnsws();
	}

}