package com.seegene.main.domain.corporate.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seegene.main.domain.corporate.entity.TusCorp;

@Repository
public interface TusCorpRepository extends JpaRepository<TusCorp, Long>, TusCorpRepositoryCustom {

	Optional<TusCorp> findTusCorpByDomnNm(String donmNm);

	Optional<TusCorp> findById(Long corpNm);

	Optional<TusCorp> findByCorpNm(String corpName);

	Optional<TusCorp> findByCorpLvlCd(String LvlCd);
}
