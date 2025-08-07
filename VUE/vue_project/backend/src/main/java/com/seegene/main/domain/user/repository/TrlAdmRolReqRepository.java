package com.seegene.main.domain.user.repository;

import com.seegene.main.domain.authority.entity.TrlAdmRolReq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrlAdmRolReqRepository extends JpaRepository<TrlAdmRolReq, Long> {

    TrlAdmRolReq findTop1ByReqUsrUidTusUsr_IdOrderByIdDesc(String id);

}
