package com.seegene.main.domain.project.entity;

import java.util.ArrayList;
import java.util.List;

import com.seegene.main.domain.project.dto.DocumentAddRequest;
import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * TPJ_PRJ_PRCS Entity
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-11        khhong        최초작성
 * </PRE>
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "TPJ_PRJ_FL")
public class TpjPrjFl extends BaseEntity {

	@Id
	@Column(name = "FL_NUM", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "PRJ_PRCS_NUM", nullable = false)
	private TpjPrjPrcs tpjPrjPrcs;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "USR_UID", nullable = false)
	private TusUsr tusUsr;

	@Size(max = 20)
	@Column(name = "PRJ_FL_TP_CD", length = 20)
	private String prjFlTpCd;

	@Size(max = 1)
	@Column(name = "FNL_YN", length = 1)
	private String fnlYn;

	@Column(name = "DSCRP")
	private String dscrp;

	public static TpjPrjFl toEntity(DocumentAddRequest documentAddRequest, TpjPrjPrcs tpjPrjPrcs, TusUsr tusUsr){
		return TpjPrjFl.builder()
			.id(documentAddRequest.getFileNum())
			.tpjPrjPrcs(tpjPrjPrcs)
			.prjFlTpCd(documentAddRequest.getFileType())
			.tusUsr(tusUsr)
			.fnlYn("N")
			.dscrp(documentAddRequest.getDescription())
			.build();
	}
}