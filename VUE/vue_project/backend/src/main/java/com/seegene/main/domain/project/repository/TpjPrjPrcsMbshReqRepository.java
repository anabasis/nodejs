package com.seegene.main.domain.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seegene.main.domain.project.entity.TpjPrjPrcsMbshReq;

public interface TpjPrjPrcsMbshReqRepository extends JpaRepository<TpjPrjPrcsMbshReq, Long> {

	List<TpjPrjPrcsMbshReq> findByTpjPrjMbshReqId(Long tpjPrjMbshReqId);
}