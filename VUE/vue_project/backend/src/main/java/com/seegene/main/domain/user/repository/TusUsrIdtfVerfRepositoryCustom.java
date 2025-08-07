package com.seegene.main.domain.user.repository;

import java.util.Optional;

import com.seegene.main.domain.login.dto.LoginVerifyAuthenticateRequest;
import com.seegene.main.domain.user.entity.TusUsrIdtfVerf;

/**
 * TusUsrIdtfVerfRepositoryCustom
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-24        khhong        최초작성
 * </PRE>
 */
public interface TusUsrIdtfVerfRepositoryCustom {

	Optional<LoginVerifyAuthenticateRequest> findByVerfKey(String emailId, String idtfVerfCatCd, String authKey);

}
