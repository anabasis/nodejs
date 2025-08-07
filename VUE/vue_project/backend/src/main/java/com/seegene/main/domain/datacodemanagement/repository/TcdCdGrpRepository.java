package com.seegene.main.domain.datacodemanagement.repository;

import com.seegene.main.domain.common.repository.TcdCdGrpRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import com.seegene.main.domain.datacodemanagement.entity.TcdCdGrp;

import java.util.Optional;

public interface TcdCdGrpRepository extends JpaRepository<TcdCdGrp, String> , TcdCdGrpRepositoryCustom {

}
