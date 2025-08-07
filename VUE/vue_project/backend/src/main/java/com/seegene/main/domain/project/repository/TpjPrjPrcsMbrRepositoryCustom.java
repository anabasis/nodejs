package com.seegene.main.domain.project.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.seegene.main.domain.project.dto.ProjectMemberListResponse;
import com.seegene.main.domain.project.entity.TpjPrjPrcsMbr;

@Repository
public interface TpjPrjPrcsMbrRepositoryCustom {

	List<ProjectMemberListResponse> getProjectMemberList(Long id ,Long prjPrcsNumber);
}
