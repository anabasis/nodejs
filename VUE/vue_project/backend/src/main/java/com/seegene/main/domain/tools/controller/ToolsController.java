package com.seegene.main.domain.tools.controller;

import com.seegene.main.global.auth.PlatformUserInfo;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seegene.main.domain.tools.dto.ToolsListResponse;
import com.seegene.main.domain.tools.service.ToolsService;
import com.seegene.main.global.config.annotation.CurrentUser;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name="tools", description = "Tools API, 담당자: 정재학")
@RequestMapping("/tools")
@RequiredArgsConstructor
@RestController
public class ToolsController {

    private final ToolsService toolsService;

    @Operation(summary = "[IFM021]툴 관리 등록한 툴 목록 조회 [완료] 23.09.15", description = "툴 관리 등록한 툴 목록을 조회한다.")
    @GetMapping(path = "/support-tools/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ToolsListResponse> getSupportToolsList(PlatformUserInfo user) {

        return toolsService.getSupportToolsList(user);
    }

}
