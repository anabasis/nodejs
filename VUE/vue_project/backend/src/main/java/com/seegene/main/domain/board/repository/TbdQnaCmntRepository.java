package com.seegene.main.domain.board.repository;

import com.seegene.main.domain.board.entity.TbdQnaCmnt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TbdQnaCmntRepository extends JpaRepository<TbdQnaCmnt, Long> {
//    Optional<QnaCommentEntity> findByQnaNum(Long qnaNum);
    Optional<TbdQnaCmnt> findById(long commentNum);

    Optional<TbdQnaCmnt> findByCmnt(String cmnt);
    Optional<TbdQnaCmnt> findByPrntQnaCmntNumAndId(long parentCommentNum, long commentNum);

    void deleteByTbdQna_Id(Long id);

    List<TbdQnaCmnt> findByTbdQna_Id(Long id);
    boolean existsByPrntQnaCmntNum(Long id);

    void deleteByPrntQnaCmntNum(Integer id);
}
