package com.seegene.main.domain.project.vo;

import lombok.Data;

/**
 * ProjectListVo
 * <PRE>
 * </PRE>
 * @author   : jskim4@seegene.com
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-08-09        jskim        최초작성
 * </PRE>
 */
@Data
public class ProjectListVo {
	private Long projectId;
	private String diseaseCategoryCode;
	private String diseaseCategory;
	private String targetMarketCode;
	private String targetMarket;
	private String purposeCode;
	private String purpose;
	private String projectName;
	private String processCode;
	private String process;
	private Long corporateId;
	private String corporate;
	private String dueDate;
	private String projectRoleCode;
}
