package com.seegene.main.domain.board.repository;


import com.seegene.main.domain.board.entity.TbdQnaAnsw;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TbdQnaAnswRepository extends JpaRepository<TbdQnaAnsw, Long> {

    List<TbdQnaAnsw> findByTbdQna_Id(Long qnaNum);
    void deleteByTbdQna_Id(Long id);
}
