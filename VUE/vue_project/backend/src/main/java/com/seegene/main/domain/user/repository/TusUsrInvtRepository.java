package com.seegene.main.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seegene.main.domain.user.entity.TusUsrInvt;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : 송주헌(juhun.song@mz.co.kr)
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023/07/25   송주헌(juhun.song)   최초작성
 * </PRE>
 */
public interface TusUsrInvtRepository extends JpaRepository<TusUsrInvt, String> {

}
