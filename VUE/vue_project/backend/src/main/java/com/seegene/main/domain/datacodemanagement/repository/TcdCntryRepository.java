package com.seegene.main.domain.datacodemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seegene.main.domain.datacodemanagement.entity.TcdCntry;

public interface TcdCntryRepository extends JpaRepository<TcdCntry, String> {
}
