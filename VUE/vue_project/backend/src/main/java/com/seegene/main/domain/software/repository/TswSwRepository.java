package com.seegene.main.domain.software.repository;


import com.seegene.main.domain.software.entity.TswSw;
import org.springframework.data.jpa.repository.EntityGraph;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface TswSwRepository extends JpaRepository<TswSw, Long>, TswSwRepositoryCustom {

    @EntityGraph(value = "SoftwareEntity")
    Optional<TswSw> findTswSwsById(long softwareNumber);
}
