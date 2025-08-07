package com.seegene.main.domain.board.entity;

import com.seegene.main.domain.user.entity.BaseEntity;

import com.seegene.main.domain.user.entity.TusUsr;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
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
@Table(name = "TBD_QNA_PRTLY_OPEN")
public class TbdQnaPrtlyOpen extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "QNA_PRTLY_OPEN_NUM", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "USR_UID", nullable = false)
	private TusUsr tusUsr;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "QNA_NUM", nullable = false)
	private TbdQna tbdQna;

	public void setQnaEntity(TbdQna boardQna){
		if(this.tbdQna != null){
			this.tbdQna.getTbdQnaPrtlyOpens().remove(this);
		}
		this.tbdQna = boardQna;
		boardQna.getTbdQnaPrtlyOpens();
	}
}