package com.seegene.main.domain.common.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TCD_CNTRY_GRP")
public class TcdCntryGrp extends BaseEntity {
	@Id
	@Size(max = 10)
	@Column(name = "CNTRY_GRP_ID", nullable = false, length = 10)
	private String cntryGrpId;

	@Size(max = 40)
	@NotNull
	@Column(name = "CNTRY_GRP_NM", nullable = false, length = 40)
	private String cntryGrpNm;

	@Size(max = 20)
	@NotNull
	@Column(name = "CNTRY_GRP_CAT_CD", nullable = false, length = 20)
	private String cntryGrpCatCd;


	@OneToMany(mappedBy = "cntryGrp")
	private Set<TcdCntryGrpTg> tcdCntryGrpTgs = new LinkedHashSet<>();

}