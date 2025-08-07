package com.seegene.main.domain.demo.repository.mapper;

import org.apache.ibatis.annotations.Mapper;

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
 *   1 2023-06-29        khhong        최초작성
 * </PRE>
 */
@Mapper
public interface DemoXmlMapper {
	String findByName();
}
