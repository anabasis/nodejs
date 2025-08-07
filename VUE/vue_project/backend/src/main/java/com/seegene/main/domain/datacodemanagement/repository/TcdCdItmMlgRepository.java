package com.seegene.main.domain.datacodemanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seegene.main.domain.datacodemanagement.entity.TcdCdItm;
import com.seegene.main.domain.datacodemanagement.entity.TcdCdItmMlg;

public interface TcdCdItmMlgRepository extends JpaRepository<TcdCdItmMlg, Long> {

	Optional<TcdCdItmMlg> findByCdItmCdAndLangCd(String cd , String langCd);

	Optional<TcdCdItmMlg> findByCdItmAndLangCd(TcdCdItm cdItm, String langCd);

}
