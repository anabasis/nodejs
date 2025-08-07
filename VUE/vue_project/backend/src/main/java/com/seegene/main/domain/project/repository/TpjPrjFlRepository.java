package com.seegene.main.domain.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seegene.main.domain.project.entity.TpjPrjFl;
import com.seegene.main.domain.project.entity.TpjPrjPrcs;

@Repository
public interface TpjPrjFlRepository extends JpaRepository<TpjPrjFl, Long> {

	// boolean existsByIdAndTpjPrjPrcs_Id (Long id, Long prjPrcsNum);

}
