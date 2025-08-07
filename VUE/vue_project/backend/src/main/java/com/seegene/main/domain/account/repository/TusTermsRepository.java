package com.seegene.main.domain.account.repository;

import com.seegene.main.domain.account.entity.AccountTusTerms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TusTermsRepository extends JpaRepository<AccountTusTerms, Long>, TusTermsRepositoryCustom {
}