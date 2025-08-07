package com.seegene.main.domain.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.common.entity.TsyFl;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Objects;

public record AuthorityRoleMenuResponse(
        @JsonProperty("parentsMnuNum")
        @Schema(description = "상위메뉴번호", example = "")
        Long parentsMnuNum,
        @JsonProperty("parentsMnuName")
        @Schema(description = "상위메뉴명", example = "")
        String parentsMnuName,
        @JsonProperty("mnuNum")
        @Schema(description = "메뉴번호", example = "")
        Long mnuNum,
        @JsonProperty("mnuName")
        @Schema(description = "메뉴명", example = "")
        String mnuName,
        @JsonProperty("mnuUrl")
        @Schema(description = "메뉴 url", example = "")
        String mnuUrl,
        @JsonProperty("mnuDpth")
        @Schema(description = "메뉴 dpth", example = "")
        Long mnuDpth,
        @JsonProperty("acvIconTsyFl")
        @Schema(description = "Active Icon File 정보", example = "")
        FileInfoResponse acvIconTsyFl,
        @JsonProperty("dftIconTsyFl")
        @Schema(description = "기본 아이콘 정보", example = "")
        FileInfoResponse dftIconTsyFl,
        @JsonProperty("hovIconFl")
        @Schema(description = "Hover Icon File 정보", example = "")
        FileInfoResponse hovIconFl,
        @JsonProperty("redYn")
        @Schema(description = "read yn", example = "N")
        String redYn,
        @JsonProperty("uptYn")
        @Schema(description = "upt yn", example = "N")
        String uptYn,
        @JsonProperty("crtYn")
        @Schema(description = "crt yn", example = "N")
        String crtYn,
        @JsonProperty("delYn")
        @Schema(description = "del yn", example = "N")
        String delYn
) {
    public static AuthorityRoleMenuResponse of(
        Long parentsMnuNum,
        String parentsMnuName,
        Long mnuNum,
        String mnuName,
        String mnuUrl,
        Long mnuDpth,
        TsyFl acvIconTsyFl,
        TsyFl dftIconTsyFl,
        TsyFl hovIconFl,
        String redYn,
        String uptYn,
        String crtYn,
        String delYn
    ){
        return new AuthorityRoleMenuResponse(
                parentsMnuNum,
                parentsMnuName,
                mnuNum,
                mnuName,
                mnuUrl,
                mnuDpth,
                Objects.isNull(acvIconTsyFl)?null:FileInfoResponse.of(acvIconTsyFl),
                Objects.isNull(dftIconTsyFl)?null:FileInfoResponse.of(dftIconTsyFl),
                Objects.isNull(hovIconFl)?null:FileInfoResponse.of(hovIconFl),
                redYn,
                uptYn,
                crtYn,
                delYn
        );
    }

}
