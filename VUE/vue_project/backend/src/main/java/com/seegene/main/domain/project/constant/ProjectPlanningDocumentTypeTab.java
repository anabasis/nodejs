package com.seegene.main.domain.project.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProjectPlanningDocumentTypeTab {

	/**
	 * ProjectListResponse
	 * <PRE>
	 * </PRE>
	 * @author   : wwsoh@seegene.com
	 *
	 * @History
	 * <PRE>
	 * No  Date           Author            Desc
	 *---- ------------ ---------------- ------------------------------------
	 *   1 2023-07-07        wwsoh        최초작성
	 * </PRE>
	 */

	연구개발계획서("PF01"),
	위험관리계획서("PF02"),
	인실리코카드("PF03"),
	개발계획심의서("PF04"),
	연구개발제안서("PF05"),
	개발선행조사서("PF06"),
	제품요구사항("PF07"),
	위험관리분석("PF08"),
	기초자료조사("PF09"),
	기타("PF99")
	;

	private final String code;

}
