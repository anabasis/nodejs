package com.seegene.main.domain.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seegene.main.domain.login.entity.TusPwdChg;

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
 *   1 2023-09-26        khhong        최초작성
 * </PRE>
 */
@Repository
public interface TusPwdChgRepository extends JpaRepository<TusPwdChg, Long> {
}
