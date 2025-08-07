package com.seegene.main.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seegene.main.domain.user.entity.TusUsrIdtfVerf;

/**
 * TusUsrIdtfVerfRepository
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
@Repository
public interface TusUsrIdtfVerfRepository extends JpaRepository<TusUsrIdtfVerf, String>, TusUsrIdtfVerfRepositoryCustom {
}
