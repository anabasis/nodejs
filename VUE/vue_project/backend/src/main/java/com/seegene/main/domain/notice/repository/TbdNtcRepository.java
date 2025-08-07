package com.seegene.main.domain.notice.repository;

import com.seegene.main.domain.notice.entity.TbdNtc;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TbdNtcRepository extends JpaRepository<TbdNtc, Long>, TbdNtcRepositoryCustom {


}