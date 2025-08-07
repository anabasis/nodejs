package com.seegene.main.domain.project.repository;

import java.util.List;
import java.util.Optional;

import com.seegene.main.domain.project.dto.ProjectProcessUserResponse;
import org.springframework.stereotype.Repository;

import com.seegene.main.domain.external.dto.ProjectProcessInfoResponse;
import com.seegene.main.domain.project.dto.ProjectProcessResponse;

@Repository
public interface TpjPrjPrcsRepositoryCustom {
    List<ProjectProcessResponse> getProjectProcessDetailList(Long prjNum, String langCd);

    Optional<List<ProjectProcessInfoResponse>> findByPrjPrcsPrjId(String usrUid);

    List<ProjectProcessUserResponse> findByNoteToUserList(Long prjNum, Long prjPrcsNum);

    Optional<ProjectProcessInfoResponse> existsByTpjPrjIdAndprocessIdAndPrcsRoleCd(String usrUid, Long prjNum, Long processId, String procsRoleCode);
}
