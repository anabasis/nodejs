package com.seegene.main.domain.join.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seegene.main.domain.join.entity.TusTermsAgr;
import com.seegene.main.domain.user.entity.TusUsr;

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
 *   1 2023-08-07        khhong        최초작성
 * </PRE>
 */
@Repository
public interface TusTermsAgrRepository extends JpaRepository<TusTermsAgr, Long> {

	Optional<List<TusTermsAgr>> findByTusUsr(TusUsr tusUsr);

	List<TusTermsAgr> findByTusUsrId(String usrUid);
}
