package com.seegene.main.domain.mypage.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.authority.entity.TrlAdmRolApl;
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
@Schema(description = "회원 관리자 역할 조회 DTO")
public class MyInfoAdmRolResponse {

    @JsonProperty("admRolNum")
    @Schema(description = "관리자 역할 코드", example = "admRolNum")
    private Long admRolNum;

    public static MyInfoAdmRolResponse of(TrlAdmRolApl trlAdmRolApl) {
        return MyInfoAdmRolResponse.builder()
                .admRolNum(trlAdmRolApl.getTrlAdmRol().getId())
                .build();
    }

}
