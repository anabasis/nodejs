package com.seegene.main.domain.datastore.dto;

import com.seegene.main.domain.datastore.constant.IDTYPE;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
public record DataStoreFileRequest(
    @Schema(description = "폴더/파일 아이디 리스트")
    List<String> idlist,
    @Parameter(description="다운 로드 요청 타입" ,example = " Folder|File")
    @Schema(description = "파라미터 타입여부")
    IDTYPE idType
) {}
