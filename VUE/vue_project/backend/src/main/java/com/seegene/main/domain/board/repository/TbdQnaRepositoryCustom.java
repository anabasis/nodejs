package com.seegene.main.domain.board.repository;


import com.seegene.main.domain.board.dto.QnaResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface TbdQnaRepositoryCustom {

    QnaResponse findByQnaNum(Long qnaNum);
}
