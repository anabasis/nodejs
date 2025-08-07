package com.seegene.main.domain.board.repository;

import com.seegene.main.domain.board.entity.TbdQnaAtch;
import com.seegene.main.domain.common.entity.TsyFl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TbdQnaAtchRepository extends JpaRepository<TbdQnaAtch, Long> {

    Optional<List<TbdQnaAtch>> findByTbdQna_Id(Long id);

    void deleteByQnaAttach_Id(Long id);

    void deleteAllByQnaAttachIn(List<TsyFl> file);

    TbdQnaAtch findAllByQnaAttach(TsyFl file);
}
