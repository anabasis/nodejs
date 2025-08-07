package com.seegene.main.domain.join.entity;

import java.util.ArrayList;
import java.util.List;

import com.seegene.main.domain.common.entity.TcdCntryGrp;
import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "TUS_TERMS")
public class TusTerm extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TERMS_NUM", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "TERMS_CAT_CD", nullable = false)
	private TusTermsCat tusTermsCat;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "CNTRY_GRP_ID", nullable = false)
	private TcdCntryGrp tcdCntryGrp;

	@OneToMany(mappedBy = "tusTerm")
	private List<TusTermsVer> tusTermsVerList = new ArrayList<>();

	public void addTusTermVer(TusTermsVer tusTermsVer){
		this.tusTermsVerList = new ArrayList<>();
		tusTermsVerList.add(tusTermsVer);
		tusTermsVer.setTusTerm(this);
	}

}