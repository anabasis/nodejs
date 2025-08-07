package com.seegene.main.domain.account.repository;

import com.seegene.main.domain.account.entity.TusUsrNotfSetg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TusUsrNotfSetgRepository extends JpaRepository<TusUsrNotfSetg, Long> {
    List<TusUsrNotfSetg> findByUsrUidOrderByNotfTpCd(String userUid);

    boolean existsByNotfTpCdAndUsrUid(String notfTpCd, String UserUid);
    Optional<TusUsrNotfSetg> findByNotfTpCdAndUsrUid(String notfTpCd, String UserUid);

    Optional<TusUsrNotfSetg> findByUsrUid(String userUid);
}
