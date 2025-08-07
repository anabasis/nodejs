package com.seegene.main.domain.external.repository;

import com.seegene.main.domain.external.entity.TguDtlGud;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TguDtlGudRepository extends JpaRepository<TguDtlGud, Long> {

    @EntityGraph(value = "TguDtlGud")
    List<TguDtlGud> findTguDtlGudByParmVal(String parameterValue);
}
