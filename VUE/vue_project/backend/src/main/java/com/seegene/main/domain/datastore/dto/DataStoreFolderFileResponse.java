package com.seegene.main.domain.datastore.dto;


import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "폴더/파일 DTO")
public record DataStoreFolderFileResponse(

        @Schema(description = "폴더아이디/파일아이디")
        String id,

        @Schema(description = "폴더명/파일명")
        String name,

        @Schema(description = "파일 url")
        String url,
        @Schema(description = "파일 key")
        String file,

        @Schema(description = "용량")
        int size,

        @Schema(description = "수정일")
        String modifyDate
) {
}
