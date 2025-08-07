package com.seegene.main.domain.mypage.repository.mapper;

import com.seegene.main.domain.mypage.vo.LoginLogVo;
import com.seegene.main.domain.mypage.vo.MypageVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MypageMapper {

    List<MypageVo> getMypage(Map map);

    List<LoginLogVo> getLoginLog(Map map);

}
