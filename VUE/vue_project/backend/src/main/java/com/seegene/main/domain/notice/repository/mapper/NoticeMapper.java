package com.seegene.main.domain.notice.repository.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.seegene.main.domain.notice.vo.NoticeListVo;

@Mapper
public interface NoticeMapper {
	List<NoticeListVo> getNoticeList(Map<String, Object> param);

	Long getNoticeListCount(Map<String, Object> param);
}
