package com.seegene.main.domain.project.repository;

import java.util.Optional;

import com.seegene.main.domain.project.entity.TpjPrjMbrHst;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TpjPrjMbrHstRepository extends JpaRepository<TpjPrjMbrHst, Long> {
	Optional<TpjPrjMbrHst> findTopByPrjMbrNumAndPrjNumOrderByMdfDtDesc(Long prjMbrNum ,Long prjNum);
}
