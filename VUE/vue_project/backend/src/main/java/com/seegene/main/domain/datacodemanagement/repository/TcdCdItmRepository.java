package com.seegene.main.domain.datacodemanagement.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import com.seegene.main.domain.datacodemanagement.entity.TcdCdItm;

import java.util.List;
import java.util.Optional;

public interface TcdCdItmRepository extends JpaRepository<TcdCdItm, Long>{
    List<TcdCdItm> findByCdGrpId(String cdGrpId);
    @EntityGraph(attributePaths = {"tcdCdItmMlgList"})
    List<TcdCdItm> findTcdCdItmByCdGrpId(String cdGrpId);

    Optional<TcdCdItm> findByCdGrpIdAndSortNum(String cdGrpId, Long sortNum);
    List<TcdCdItm> findByCdGrpIdOrderBySortNumAsc(String cdGrpId);
    Optional<TcdCdItm> findByCdGrpIdAndCd(String cdGrpId, String cd);
}
