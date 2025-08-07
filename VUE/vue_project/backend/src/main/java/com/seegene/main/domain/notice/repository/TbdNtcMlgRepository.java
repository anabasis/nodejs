package com.seegene.main.domain.notice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seegene.main.domain.notice.entity.TbdNtc;
import com.seegene.main.domain.notice.entity.TbdNtcMlg;

public interface TbdNtcMlgRepository extends JpaRepository<TbdNtcMlg, Long> {

	Optional<TbdNtcMlg> findByTbdNtc_IdAndLangCd(Long ntcNum, String langCd);

}