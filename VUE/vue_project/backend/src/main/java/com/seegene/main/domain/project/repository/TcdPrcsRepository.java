package com.seegene.main.domain.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seegene.main.domain.project.entity.TcdPrcs;
import org.springframework.stereotype.Repository;

@Repository
public interface TcdPrcsRepository extends JpaRepository<TcdPrcs,String> {

	List<TcdPrcs> findBySortNumGreaterThanOrderBySortNumAsc(Long sortNum);

	List<TcdPrcs> findBySortNumLessThanOrderBySortNumAsc(Long sortNum);

	List<TcdPrcs> findByOrderBySortNum();

	List<TcdPrcs> findByIdIn(List<String> prcsCd);
	List<TcdPrcs> findByIdInOrderBySortNum(List<String> prcsCdList);
}
