package com.seegene.main.domain.mypage.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "[IFM001] 회원 기본 정보 조회 DTO")
public record MypageResponse (

    @JsonProperty("userInformation")
    @Schema(description = "회원 기본 정보 조회")
    List<MyInfoResponse> myInfoResponseList,

    @JsonProperty("userRole")
    @Schema(description = "회원 사용자 역할 조회")
    List<MyInfoUserRolResponse> myInfoUserRolResponseList,

    @JsonProperty("adminRole")
    @Schema(description = "회원 관리자 역할 조회")
    List<MyInfoAdmRolResponse> myInfoAdmRolResponseList,

    @JsonProperty("LoginLogList")
    @Schema(description = "로그인 로그 정보 조회")
    List<LoginLogResponse> loginLogResponseList

) {

    public static MypageResponse of(List<MyInfoResponse> myInfoResponseList,
                                    List<MyInfoUserRolResponse> myInfoUserRolResponseList,
                                    List<MyInfoAdmRolResponse> myInfoAdmRolResponseList,
                                    List<LoginLogResponse> loginLogResponseList){
        return new MypageResponse(myInfoResponseList, myInfoUserRolResponseList, myInfoAdmRolResponseList, loginLogResponseList);
    }
}
