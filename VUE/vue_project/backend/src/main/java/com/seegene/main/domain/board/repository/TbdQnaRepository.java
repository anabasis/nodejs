package com.seegene.main.domain.board.repository;

import com.seegene.main.domain.board.entity.TbdQna;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TbdQnaRepository extends JpaRepository<TbdQna, Long>, TbdQnaRepositoryCustom {
    @EntityGraph(value = "TbdQna")
    Optional<TbdQna> findTbdQnaById(Long id);
}
