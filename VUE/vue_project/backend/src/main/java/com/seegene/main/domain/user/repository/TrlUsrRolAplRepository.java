package com.seegene.main.domain.user.repository;

import com.seegene.main.domain.authority.entity.TrlUsrRolApl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * TrlUsrRolAplRepository
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-08-11        khhong        최초작성
 * </PRE>
 */
@Repository
public interface TrlUsrRolAplRepository extends JpaRepository<TrlUsrRolApl, String > {
}
