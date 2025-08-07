package com.seegene.main.domain.datacodemanagement.entity;

import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TCD_CD_GRP")
public class TcdCdGrp extends BaseEntity {
	@Id
	@Size(max = 10)
	@Column(name = "CD_GRP_ID", nullable = false, length = 10)
	private String id;

	@Size(max = 40)
	@Column(name = "CD_GRP_NM", nullable = false, length = 40)
	private String cdGrpNm;

	@OneToMany(mappedBy = "cdGrp")
	private List<TcdCdItm> tcdCdItmList = new ArrayList<>();
}
