package com.seegene.main.domain.databox.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seegene.main.domain.databox.entity.TbdLibr;

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
@Repository
public interface TbdLibrRepository extends JpaRepository<TbdLibr, Long>, TbdLibrAtchRepositoryCustom {
}
