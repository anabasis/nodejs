package com.seegene.main.domain.user.entity;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-20        khhong        최초작성
 * </PRE>
 */

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TUS_USR_INVT_ADM_ROL")
public class TusUsrInvtAdmRol extends BaseEntity {

	@Id
	@Column(name = "USR_INVT_UID", length = 40)
	private String id;

	@Column(name = "ADM_ROL_NUM")
	private Long admRolNum;
}
