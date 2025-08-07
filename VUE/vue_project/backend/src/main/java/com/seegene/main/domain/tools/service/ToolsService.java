package com.seegene.main.domain.tools.service;

import com.seegene.main.domain.tools.dto.ToolsListResponse;
import com.seegene.main.domain.tools.repository.ToolsToolsTpjToolRepository;
import com.seegene.main.global.auth.PlatformUserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ToolsService {

    private final ToolsToolsTpjToolRepository toolsTpjToolRepository;

    public List<ToolsListResponse> getSupportToolsList(PlatformUserInfo user) {

        return toolsTpjToolRepository.findAllByUserUid(user.getUsrUid());
    }
}
