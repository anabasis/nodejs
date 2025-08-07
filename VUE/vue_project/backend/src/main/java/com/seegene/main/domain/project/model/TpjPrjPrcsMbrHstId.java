package com.seegene.main.domain.project.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ProjectMemberProcessHistory  Composite key
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
public class TpjPrjPrcsMbrHstId implements Serializable {

	private Long prjMbrHstNum;
	private Long prjNum;
	private String usrUid;
	private String prcsCd;
}
