package com.seegene.main.domain.user.repository;

import com.seegene.main.domain.authority.entity.TrlAdmRolApl;
import com.seegene.main.domain.user.entity.TusUsr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrlAdmRolAplRepository extends JpaRepository<TrlAdmRolApl, String > {

    List<TrlAdmRolApl> findByTusUsr(TusUsr tusUsr);

    List<TrlAdmRolApl> findByTrlAdmRolAdmRolCd(String adminRplCd);

}
