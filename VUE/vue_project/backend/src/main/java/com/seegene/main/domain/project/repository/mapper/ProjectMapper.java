package com.seegene.main.domain.project.repository.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.seegene.main.domain.notice.vo.NoticeListVo;
import com.seegene.main.domain.project.dto.ProjectAuthorityResponse;
import com.seegene.main.domain.project.vo.ProjectAuthorityVo;
import com.seegene.main.domain.project.vo.ProjectDocumentListVo;
import com.seegene.main.domain.project.vo.ProjectHistoryVo;
import com.seegene.main.domain.project.vo.ProjectListVo;

@Mapper
public interface ProjectMapper {
	List<ProjectListVo> getProjectPage(
		@Param("projectTab") String projectTab
		, @Param("startDate") String startDate
		, @Param("endDate") String endDate
		, @Param("diseaseCategoryCode") String diseaseCategoryCode
		, @Param("purposeCode") String purposeCode
		, @Param("processCode") String processCode
		, @Param("keyword") String keyword
		, @Param("limit") Integer limit
		, @Param("offset") Long offset
		, @Param("sort") String sort
		, @Param("langCd") String langCd
		, @Param("usrUid") String usrUid
		, @Param("corpNum") Long corpNum
	);

	Long getProjectTotal(
		@Param("projectTab") String projectTab
		, @Param("startDate") String startDate
		, @Param("endDate") String endDate
		, @Param("diseaseCategoryCode") String diseaseCategoryCode
		, @Param("purposeCode") String purposeCode
		, @Param("processCode") String processCode
		, @Param("keyword") String keyword
		, @Param("langCd") String langCd
		, @Param("usrUid") String usrUid
		, @Param("corpNum") Long corpNum
	);

	List<ProjectHistoryVo> getProjectHistoryPage(
		@Param("prjNum") Long prjNum
		, @Param("langCd") String langCd
		, @Param("limit") Integer limit
		, @Param("offset") Long offset
		, @Param("sort") String sort
	);

	Long getProjectHistoryTotal(
		@Param("prjNum") Long prjNum
		, @Param("langCd") String langCd
	);

	List<ProjectDocumentListVo> getProjectPlanningDocumentList(Map<String, Object> param);

	List<ProjectDocumentListVo> getProjectOligoDesignDocumentList(Map<String, Object> param);

	List<ProjectAuthorityVo> getProjectRequestList(int pageSize,long prjNum, long offset);
	int getProjectRequestCount();

}
