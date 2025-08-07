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
@Table(name = "TBD_QNA_ANSW_ATCH")
public class TbdQnaAnswAtch extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "QNA_ANSW_ATCH_NUM", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "QNA_ANSW_NUM", nullable = false)
	private TbdQnaAnsw tbdQnaAnsw;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "FL_NUM")
	private TsyFl qnaAnswerAttach;

	public void setQnaAnswerEntity(TbdQnaAnsw answerEntity){
		if(this.tbdQnaAnsw != null){
			this.tbdQnaAnsw.getTbdQnaAnswAtches().remove(this);
		}
		this.tbdQnaAnsw = answerEntity;
		answerEntity.getTbdQnaAnswAtches();
	}

}