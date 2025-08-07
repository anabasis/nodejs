package com.seegene.main.domain.notice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seegene.main.domain.notice.entity.TbdNtc;
import com.seegene.main.domain.notice.entity.TbdNtcPrtlyOpen;

public interface TbdNtcPrtlyOpenRepository extends JpaRepository<TbdNtcPrtlyOpen, Long> {

	boolean existsByTbdNtc_IdAndTusCorp_Id (Long ntcNum, Long corpNum);

}