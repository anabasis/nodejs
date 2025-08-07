package com.seegene.main.domain.board.repository;

import com.seegene.main.domain.board.entity.TbdQnaPrtlyOpen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbdQnaPrtlyOpenRepository extends JpaRepository<TbdQnaPrtlyOpen, Long> {
}
