package com.seegene.main.domain.project.repository;

import com.seegene.main.domain.project.entity.TpjPrjPrcsMbrHst;
import org.springframework.data.jpa.repository.JpaRepository;

import com.seegene.main.domain.project.model.TpjPrjPrcsMbrHstId;
import org.springframework.stereotype.Repository;

@Repository
public interface TpjPrjPrcsMbrHstRepository extends JpaRepository<TpjPrjPrcsMbrHst, TpjPrjPrcsMbrHstId> {
}
