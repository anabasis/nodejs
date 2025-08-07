package com.seegene.main.domain.mypage.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.authority.entity.TrlUsrRol;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "사용자 역할 목록 DTO")
public class UserRolResponse {

    @JsonProperty("usrRolNum")
    @Schema(description = "사용자 역할 아이디", requiredMode = Schema.RequiredMode.REQUIRED)
    String usrRolNum;

    @JsonProperty("usrRolNm")
    @Schema(description = "사용자 역할명")
    String usrRolNm;

    public static UserRolResponse of(TrlUsrRol trlUsrRol) {
        return UserRolResponse.builder()
                .usrRolNum(String.valueOf(trlUsrRol.getId()))
                .usrRolNm(trlUsrRol.getUsrRolNm())
                .build();
    }
}
