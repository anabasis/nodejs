package com.seegene.main.domain.common.dto;

import com.seegene.main.domain.authority.entity.TrlUsrRol;

public record CommonRoleInfoResponse (
    Long id,
    String name,
    String roleLv,
    String corpLv,
    String usrRolCd
){
    public static CommonRoleInfoResponse of(TrlUsrRol usrRol){
        return new CommonRoleInfoResponse(
                usrRol.getId(),
                usrRol.getUsrRolNm(),
                usrRol.getRolLvlCd(),
                usrRol.getCorpLvlCd(),
                usrRol.getUsrRolCd()
        );
    }
}
