package com.seegene.main.domain.databox.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seegene.main.domain.databox.entity.TbdLibrCat;

/**
 * TbdLibrCatRepository
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-08-10        khhong        최초작성
 * </PRE>
 */
@Repository
public interface TbdLibrCatRepository extends JpaRepository<TbdLibrCat, Long> {
}
