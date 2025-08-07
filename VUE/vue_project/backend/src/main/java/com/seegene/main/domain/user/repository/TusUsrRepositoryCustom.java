package com.seegene.main.domain.user.repository;

import java.util.List;
import java.util.Optional;

import com.seegene.main.domain.board.dto.QnaSearchResponse;
import com.seegene.main.domain.join.dto.JoinInviteResponse;
import com.seegene.main.domain.login.dto.LoginApprovalResponse;
import com.seegene.main.domain.login.dto.LoginValidResponse;
import com.seegene.main.domain.login.dto.WakeupAccountResponse;

/**
 * TusUsrRepositoryCustom
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
public interface TusUsrRepositoryCustom {

	Optional<LoginApprovalResponse> findByTusUsrSts(String emailId);
	Optional<WakeupAccountResponse> findByDormantUser(String emailId);

	Optional<List<JoinInviteResponse>> findByJoinInvite(String cntryCode, String langCode);
	Optional<List<JoinInviteResponse>> findByJoinInviteUser(String userUid, String langCode);

	Optional<List<QnaSearchResponse>> findBySearchList(Long corpNum, String keyword);

	Optional<List<QnaSearchResponse>> findBySearchList(String corpLvlCd, String keyword);

	Optional<LoginValidResponse> findByTusValidInfo(String usrUid);
}
