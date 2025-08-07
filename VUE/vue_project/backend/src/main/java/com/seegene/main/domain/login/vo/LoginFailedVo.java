package com.seegene.main.domain.login.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 로그인 시도 실패 횟수 VO
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-10-12        khhong        최초작성
 * </PRE>
 */
@Schema(description = "로그인 시도 실패 횟수 VO")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginFailedVo {

	private String emlId;
	private Long failCnt;
}
