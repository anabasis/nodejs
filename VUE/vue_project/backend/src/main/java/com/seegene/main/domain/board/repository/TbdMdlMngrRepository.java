package com.seegene.main.domain.board.repository;

import com.seegene.main.domain.board.entity.TbdMdlMngr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TbdMdlMngrRepository extends JpaRepository<TbdMdlMngr, Long> {
    List<TbdMdlMngr> findByTusUsr_Id(String userUid);
    Long countByQnaCatCdAndMdlTpCd(String category, String module);

    List<TbdMdlMngr> findByQnaCatCdAndMdlTpCd(String category, String module);
}
