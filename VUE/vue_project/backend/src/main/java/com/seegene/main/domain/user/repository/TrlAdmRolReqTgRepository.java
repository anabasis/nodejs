package com.seegene.main.domain.user.repository;

import com.seegene.main.domain.authority.entity.TrlAdmRolReqTg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrlAdmRolReqTgRepository extends JpaRepository<TrlAdmRolReqTg, Long> {
}
