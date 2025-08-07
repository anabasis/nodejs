package com.seegene.main.domain.mypage.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "[IFM002] 사용자 역할 및 관리자 역할 정보를 조회")
public class MyInfoRoleResponse {

    @JsonProperty("userRolList")
    @Schema(description = "사용자 권한 목록 조회")
    List<UserRolResponse> userRolList;

    @JsonProperty("admRolList")
    @Schema(description = "관리자 권한 목록 조회")
    List<AdminRolResponse> admRolList;

    public static MyInfoRoleResponse of (List<UserRolResponse> userRolList, List<AdminRolResponse> admRolList){
        return new MyInfoRoleResponse(userRolList, admRolList);
    }

}