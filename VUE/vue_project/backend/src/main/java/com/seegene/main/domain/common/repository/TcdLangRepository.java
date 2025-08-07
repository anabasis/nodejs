package com.seegene.main.domain.common.repository;

import com.seegene.main.domain.common.entity.TcdLang;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TcdLangRepository extends JpaRepository<TcdLang, String> {
    List<TcdLang> findTcdLangByUseYn(String UseYn);
}
