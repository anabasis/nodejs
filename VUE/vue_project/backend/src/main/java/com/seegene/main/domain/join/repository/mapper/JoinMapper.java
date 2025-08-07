package com.seegene.main.domain.join.repository.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.seegene.main.domain.join.vo.JoinAgreementVo;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-10-11        khhong        최초작성
 * </PRE>
 */
@Mapper
public interface JoinMapper {
	List<JoinAgreementVo> findByJoinInvite(Map<String, Object> map);
}
