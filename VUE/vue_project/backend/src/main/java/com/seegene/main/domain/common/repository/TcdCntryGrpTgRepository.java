package com.seegene.main.domain.common.repository;

import com.seegene.main.domain.common.entity.TcdCntryGrpTg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TcdCntryGrpTgRepository extends JpaRepository<TcdCntryGrpTg, Long> {
    List<TcdCntryGrpTg> findByCntryCd_Id(String CntryCd);
}
