package com.seegene.main.domain.project.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

/**
 * TPJ_PRJ_PRCS_MBR Entity
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
@Table(name = "TPJ_PRJ_PRCS_MBR")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TpjPrjPrcsMbr extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PRJ_PRCS_MBR_NUM", nullable = false)
	private Long id;

	@Size(max = 20)
	@Column(name = "PRCS_ROL_CD", nullable = false, length = 20)
	private String prcsRolCd;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "PRJ_PRCS_NUM", nullable = false)
	private TpjPrjPrcs tpjPrjPrcs;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "PRJ_MBR_NUM", nullable = false)
	private TpjPrjMbr tpjPrjMbr;

	public void updateByProjectUpdate(String prcsRolCd){
		this.setPrcsRolCd(prcsRolCd);
	}
}