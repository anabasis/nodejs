package com.seegene.main.domain.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seegene.main.domain.user.entity.TusLoginFailLog;

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
 *   1 2023-10-04        khhong        최초작성
 * </PRE>
 */
@Repository
public interface TusLoginFailLogRepository extends JpaRepository<TusLoginFailLog, Long> {

	Optional<List<TusLoginFailLog>> findAllByEmlId(String emlId);
}
