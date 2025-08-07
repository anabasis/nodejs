package com.seegene.main.domain.tools.repository;

import com.seegene.main.domain.tools.dto.ToolsListResponse;

import java.util.List;

public interface ToolsTpjToolRepositoryCustom {

    List<ToolsListResponse> findAllByUserUid(String userUid);

}
