package com.seegene.main.domain.common.dto;

import com.seegene.main.domain.authority.entity.TrlAdmRol;

public record CommonAdminRoleInfoResponse (
    Long admRolNum,
    String admRolCd,
    String admRolNm
    ) {
        public static CommonAdminRoleInfoResponse of(TrlAdmRol trlAdmRol){
            return new CommonAdminRoleInfoResponse(
                    trlAdmRol.getId(),
                    trlAdmRol.getAdmRolCd(),
                    trlAdmRol.getAdmRolNm()
            );
        }

}
