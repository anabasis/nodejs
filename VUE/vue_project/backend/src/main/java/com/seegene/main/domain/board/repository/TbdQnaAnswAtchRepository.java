package com.seegene.main.domain.board.repository;


import com.seegene.main.domain.board.entity.TbdQnaAnswAtch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TbdQnaAnswAtchRepository extends JpaRepository<TbdQnaAnswAtch, Long> {
    List<TbdQnaAnswAtch> findByTbdQnaAnsw_Id(Long id);
}
