package com.seegene.main.domain.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.authority.entity.TrlAdmRolApl;
import com.seegene.main.domain.authority.entity.TrlUsrRol;
import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.domain.user.entity.TusUsr;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record UserDetailResponse(
        @JsonProperty("userInfo")
        @Schema(description = "사용자 정보")
        UserInfoResponse userInfo,
        @JsonProperty("userRolInfo")
        @Schema(description = "사용자 역할 정보")
        CommonRoleInfoResponse userRolInfo,
        @JsonProperty("adminRolList")
        @Schema(description = "어드민 역할 리스트")
        List<CommonAdminRoleInfoResponse> adminRolList
) {
        public static UserDetailResponse of(TusUsr tusUsr, TsyFl tsyFl, TrlUsrRol trlUsrRol, List<TrlAdmRolApl> list) {
                return new UserDetailResponse(
                        UserInfoResponse.of(tusUsr, tsyFl),
                        trlUsrRol != null?CommonRoleInfoResponse.of(trlUsrRol):null,
                        list.stream().map(v-> CommonAdminRoleInfoResponse.of(v.getTrlAdmRol())).toList()
                );
        }
}
