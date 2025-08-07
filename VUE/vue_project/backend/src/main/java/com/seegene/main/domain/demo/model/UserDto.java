package com.seegene.main.domain.demo.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-06-21        khhong        최초작성
 * </PRE>
 */
@Builder
public record UserDto(@NotBlank String id, @NotBlank String userId, String userName, String userPassword, String email, String fullName, String firstName, String lastName, String configureTotp, String userWorkStatus, String userRole) {

}