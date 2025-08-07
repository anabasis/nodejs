package com.seegene.main.domain.board.repository.mapper;

import com.seegene.main.domain.board.dto.QnaCommentResultResponse;
import com.seegene.main.domain.board.dto.QnaListResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface BoardMapper {
	List<QnaCommentResultResponse> getCommentList(@Param("qnaNumber") long qnaNumber);

	List<QnaListResponse> findAllQna(String user, LocalDateTime startDt, LocalDateTime endDt, String type, String category, String module, String status, int pageSize, long offset);

	Long findAllQnaCount(String user, LocalDateTime startDt, LocalDateTime endDt, String type, String category, String module, String status);
}
