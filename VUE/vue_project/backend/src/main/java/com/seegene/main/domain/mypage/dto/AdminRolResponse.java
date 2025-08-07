package com.seegene.main.domain.mypage.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.authority.entity.TrlAdmRol;
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
@Schema(description = "관리자 역할 목록 DTO")
public class AdminRolResponse {

    @JsonProperty("admRolNum")
    @Schema(description = "관리자 역할 아이디", requiredMode = Schema.RequiredMode.REQUIRED)
    String admRolNum;

    @JsonProperty("admRolNm")
    @Schema(description = "관리자 역할명")
    String admRolNm;

    public static AdminRolResponse of(TrlAdmRol trlAdmRol) {
        return AdminRolResponse.builder()
                .admRolNum(String.valueOf(trlAdmRol.getId()))
                .admRolNm(trlAdmRol.getAdmRolNm())
                .build();
    }
}
