package com.seegene.main.domain.board.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import com.seegene.main.domain.board.entity.TbdQnaPrtlyOpen;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

@Getter
@Builder
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@EqualsAndHashCode(of = "prtnNum")
public class PrtnUserCreateRequest {


    @JsonProperty("userUid")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "사용자 UID", example = "FCF627323FE911EEBF4902D5D06DD9EE", requiredMode = REQUIRED)
    private String usrUid;

    @QueryProjection
    public PrtnUserCreateRequest(String usrUid) {
        this.usrUid = usrUid;
    }

    public static PrtnUserCreateRequest entityToDto(TbdQnaPrtlyOpen prtnOpen) {
        return PrtnUserCreateRequest.builder()
                .usrUid(prtnOpen.getTusUsr().getId())
                .build();
    }
}
