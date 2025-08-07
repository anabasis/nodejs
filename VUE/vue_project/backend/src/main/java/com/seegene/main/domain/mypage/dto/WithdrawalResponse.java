package com.seegene.main.domain.mypage.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
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
@Schema(description = "[IFM008] 탈퇴인증 코드 인증번호 DTO")
public class WithdrawalResponse {

    @JsonProperty("authKey")
    @Schema(description = "authKey", example = "authKey")
    private String authKey;

    public static WithdrawalResponse setWithdrawal(String authKey){
        return WithdrawalResponse.builder()
                .authKey(authKey)
                .build();
    }

}
