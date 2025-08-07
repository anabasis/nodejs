package com.seegene.main.domain.project.repository;

import com.seegene.main.domain.project.entity.TpjPrjMbr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TpjPrjMbrRepository extends JpaRepository<TpjPrjMbr, Long> {

    Optional<TpjPrjMbr> findByTpjPrjIdAndTusUsrId(Long prjNum, String usrUid);

    Long countDistinctByTusUsr_IdAndPrjRolCdAllIgnoreCase(String id, String prjRolCd);

    List<TpjPrjMbr> findByTpjPrjId(Long prjNum);

    List<TpjPrjMbr> findByTpjPrjIdAndPrjRolCd(Long prjNum,String prjRolCd);

    Optional<TpjPrjMbr> findByTusUsrId(String usrUid);

}
