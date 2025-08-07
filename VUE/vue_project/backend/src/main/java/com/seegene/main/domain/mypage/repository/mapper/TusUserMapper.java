package com.seegene.main.domain.mypage.repository.mapper;


import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TusUserMapper {

  	void updateTusUsr(Map<String, Object> param);
}
