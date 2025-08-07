package com.seegene.main.domain.common.repository.mapper;


import com.seegene.main.domain.common.vo.CommonLnbMenuVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface CommonMapper {
    List<CommonLnbMenuVo> getUsrLnbMenuInfo(Map<String, Object> map);
    List<CommonLnbMenuVo> getUsrGnbMenuInfo(Map<String, Object> map);
}
