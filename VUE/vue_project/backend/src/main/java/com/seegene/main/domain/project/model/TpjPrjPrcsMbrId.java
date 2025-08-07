package com.seegene.main.domain.project.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ProjectMemberProcess  Composite key
 * <PRE>
 * </PRE>
 * @author   : @mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1                 최초작성
 * </PRE>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TpjPrjPrcsMbrId implements Serializable {

	private Long prjNum;
	private String usrUid;
	private String prcsCd;
}
