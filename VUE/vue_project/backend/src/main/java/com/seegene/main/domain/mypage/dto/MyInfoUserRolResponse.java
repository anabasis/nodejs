package com.seegene.main.domain.mypage.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.authority.entity.TrlUsrRolApl;
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
@Schema(description = "회원 사용자 역할 조회 DTO")
public class MyInfoUserRolResponse {

    @JsonProperty("usrRolNum")
    @Schema(description = "사용자 역할 코드", example = "usrRolNum")
    private Long usrRolNum;

    public static MyInfoUserRolResponse of(TrlUsrRolApl trlUsrRolApl) {
        return MyInfoUserRolResponse.builder()
                .usrRolNum(trlUsrRolApl.getTrlUsrRol().getId())
                .build();
    }
}
