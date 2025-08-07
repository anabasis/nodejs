package com.seegene.main.domain.user.repository;

import com.seegene.main.domain.authority.entity.TrlAdmRol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrlAdmRolRepository extends JpaRepository<TrlAdmRol, Long> {
}
