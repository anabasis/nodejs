package com.seegene.main.domain.user.repository;

import com.seegene.main.domain.authority.entity.TrlUsrRol;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * TrlUsrRolRepository
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
public interface TrlUsrRolRepository extends JpaRepository<TrlUsrRol, Long> {

    public List<TrlUsrRol> findByCorpLvlCd(@NotEmpty String corpLvlCd);

}
