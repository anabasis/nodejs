package com.seegene.main.domain.project.repository;

import com.seegene.main.domain.project.entity.TpjPrjTgMakt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TpjPrjTgMaktRepository extends JpaRepository<TpjPrjTgMakt, Long> {

    void deleteByTpjPrjId(Long prjId);
}
