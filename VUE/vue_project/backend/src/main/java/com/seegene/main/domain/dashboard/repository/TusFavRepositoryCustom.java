package com.seegene.main.domain.dashboard.repository;

import com.seegene.main.domain.dashboard.dto.ToolListResponse;
import com.seegene.main.domain.dashboard.dto.ToolResponse;

import java.util.List;

public interface TusFavRepositoryCustom {
    List<ToolResponse> findByUserUidAndFavTpCd(String userUid, String favTpCd);
    List<ToolListResponse> findAllByUserUid(String userUid);
}
