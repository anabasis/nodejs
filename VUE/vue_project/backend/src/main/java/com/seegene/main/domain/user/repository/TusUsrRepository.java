package com.seegene.main.domain.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seegene.main.domain.user.entity.TusUsr;

/**
 * TusUsrRepository
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
public interface TusUsrRepository extends JpaRepository<TusUsr, String>, TusUsrRepositoryCustom {

	Optional<TusUsr> findByEmlId(String emalId);

	Optional<TusUsr> findById(String uid);

	@EntityGraph(attributePaths={"trlUsrRolApl"})
	Optional<TusUsr> findTusUsrById(String uid);

	List<TusUsr> findByTusCorpIdAndUsrNmContainingAndEmlIdContainingAndUsrStsCd(Long corpNum,String usrNm,String emlId,String userStatusCode);
}
