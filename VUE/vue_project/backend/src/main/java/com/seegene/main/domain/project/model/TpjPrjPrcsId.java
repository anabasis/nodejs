package com.seegene.main.domain.project.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ProjectProcess Composite key
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
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TpjPrjPrcsId implements Serializable {
	private Long prjNum;
	private String prcsCd;
}
