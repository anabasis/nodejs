package com.seegene.main.domain.user.vo;

import lombok.Builder;
import lombok.Getter;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : @mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1                 최초작성
 * </PRE>
 */
@Builder
@Getter
public class TusLoginLogVo {

	// public static TusLoginLog toEntity(String usrUid, String ipAddr) {
	// 	return TusLoginLog.builder()
	// 		.usrUid(usrUid)
	// 		.ipAddr(ipAddr)
	// 		.loginDt(DefaultDateTimeConverter.convertZonedDateTime(LocalDateTime.now()))
	// 		.crtrUid(usrUid)
	// 		.crtDt(DefaultDateTimeConverter.convertZonedDateTime(LocalDateTime.now()))
	// 		.mdfrUid(usrUid)
	// 		.mdfDt(DefaultDateTimeConverter.convertZonedDateTime(LocalDateTime.now()))
	// 		.build();
	// }

}
