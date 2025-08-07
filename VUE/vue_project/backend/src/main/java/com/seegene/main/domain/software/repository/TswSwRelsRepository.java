package com.seegene.main.domain.software.repository;


import com.seegene.main.domain.software.entity.TswSwRels;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface TswSwRelsRepository extends JpaRepository<TswSwRels, Long> {

    @EntityGraph(attributePaths = "swfile")
    Page<TswSwRels> findByTswSw_IdOrderByCrtDtDesc(long softwareNumber, Pageable pageable);

    @EntityGraph(attributePaths = "swfile")
    Optional<TswSwRels> findTswSwRelsById(long releaseNumber);
}
