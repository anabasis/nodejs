package com.seegene.main.domain.databox.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seegene.main.domain.databox.entity.TbdLibr;
import com.seegene.main.domain.databox.entity.TbdLibrPrtlyOpen;

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
 *   1 2023-09-21        khhong        최초작성
 * </PRE>
 */
@Repository
public interface TbdLibrPrtlyOpenRepository extends JpaRepository<TbdLibrPrtlyOpen, Long> {

	Optional<List<TbdLibrPrtlyOpen>> findByTbdLibr(TbdLibr tbdLibr);
}
