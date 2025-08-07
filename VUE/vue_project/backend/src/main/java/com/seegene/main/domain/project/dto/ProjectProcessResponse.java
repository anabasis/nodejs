package com.seegene.main.domain.project.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

public record ProjectProcessResponse(
        @Schema(description = "프로젝트 번호", example = "100197")
        Long prjNumber,
        @Schema(description = "프로젝트 프로세스 번호", example = "10303")
        Long prjPrcsNumber,
        @Schema(description = "프로젝트 프로세스 코드", example = "OLDS")
        String prcsCode,
        @Schema(description = "프로젝트 프로세스 명", example = "Ordering")
        String prcsName,
        @Schema(description = "프로젝트 프로세스 상태 코드", example = "PCWT")
        String prcsStsCode,
        @Schema(description = "프로젝트 프로세스 상태 명", example = "프로젝트 프로세스 상태 명")
        String prcsStsName
) {}
