package com.seegene.main.domain.common.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seegene.main.domain.common.entity.TsyFl;

public interface TsyFlRepository extends JpaRepository<TsyFl, Long> {

	// Optional<List<TsyFl>> findAllById (List<Long> flNum);

    boolean existsById(Long id);

}
