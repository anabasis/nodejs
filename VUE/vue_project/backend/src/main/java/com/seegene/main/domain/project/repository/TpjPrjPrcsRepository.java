package com.seegene.main.domain.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seegene.main.domain.project.entity.TpjPrjPrcs;

@Repository
public interface TpjPrjPrcsRepository extends JpaRepository<TpjPrjPrcs, Long>, TpjPrjPrcsRepositoryCustom{

    boolean existsByTpjPrjIdAndPrcsCd(Long prjNum, String prcsCd);

    List<TpjPrjPrcs> findByTpjPrjId(Long prjNum);

    Optional<TpjPrjPrcs> findByTpjPrjIdAndPrcsCd(Long prjNum, String prcsCd);

    List<TpjPrjPrcs> findAllByTpjPrjIdAndPrcsCd(Long prjNum, String prcsCd);

    List<TpjPrjPrcs> findByTpjPrjIdAndPrcsCdIn(Long prjNum, List<String> prcsCd);

    List<TpjPrjPrcs> findByTpjPrjIdAndPrcsStsCd(Long prjNum, String prcsStsCd);

    Optional<TpjPrjPrcs> findByTpjPrjIdAndIdContaining(Long prjNum,Long prcsNum);
}
