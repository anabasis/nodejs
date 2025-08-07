package com.seegene.main.domain.project.vo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectHistoryVo {
	private String processCode;
	private String process;
	private String statusCode;
	private String status;
	private String startDate;
	private String endDate;
	private String memberId;
	private String member;
	private String lastUpdateDate;
}
