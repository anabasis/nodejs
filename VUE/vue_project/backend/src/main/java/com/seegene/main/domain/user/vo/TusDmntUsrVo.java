package com.seegene.main.domain.user.vo;

import lombok.Builder;
import lombok.Getter;

/**
 * TusDmntUsrVo
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
public class TusDmntUsrVo {

	// public static TusDmntUsr toEntity(String usrUid) {
	// 	return TusDmntUsr.builder()
	// 		.dmntUsrUid(UUID.randomUUID().toString())
	// 		.usrUid(usrUid)
	// 		.crtrUid(usrUid)
	// 		.crtDt(DefaultDateTimeConverter.convertZonedDateTime(LocalDateTime.now(), ))
	// 		.mdfrUid(usrUid)
	// 		.mdfDt(DefaultDateTimeConverter.convertZonedDateTime(LocalDateTime.now()))
	// 		.wkupDt(DefaultDateTimeConverter.convertZonedDateTime(LocalDateTime.now()))
	// 		.wkupDvsCd("CODE")
	// 		.wkupCmnt("Wakeup Comment 입니다.")
	// 		.build();
	// }
}
