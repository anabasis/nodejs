package com.seegene.main.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seegene.main.domain.user.entity.TusUsrAprv;

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
 *   1 2023-10-14        khhong        최초작성
 * </PRE>
 */
@Repository
public interface TusUsrAprvRepository extends JpaRepository<TusUsrAprv, String> {
}
