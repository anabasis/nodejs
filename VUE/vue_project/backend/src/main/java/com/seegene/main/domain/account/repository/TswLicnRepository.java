package com.seegene.main.domain.account.repository;


import com.seegene.main.domain.account.entity.TswLicn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface TswLicnRepository extends JpaRepository<TswLicn, Long>, TswLicnRepositoryCustom {
}
