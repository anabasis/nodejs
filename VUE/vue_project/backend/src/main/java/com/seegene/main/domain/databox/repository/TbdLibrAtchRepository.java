package com.seegene.main.domain.databox.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seegene.main.domain.databox.entity.TbdLibr;
import com.seegene.main.domain.databox.entity.TbdLibrAtch;

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
public interface TbdLibrAtchRepository extends JpaRepository<TbdLibrAtch, Long> {

	Optional<List<TbdLibrAtch>> findAllByTbdLibr(TbdLibr tbdLibr);
}
