package com.seegene.main.domain.login.repository.mapper;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.seegene.main.domain.login.vo.LoginFailedVo;
import com.seegene.main.domain.login.vo.LoginPasswordUpdateUser;

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
 *   1 2023-09-25        khhong        최초작성
 * </PRE>
 */
@Mapper
public interface LoginMapper {

	Optional<LoginPasswordUpdateUser> findLoginPwdUpateUser(String userUid);

	Optional<LoginFailedVo> findLoginPwdCountByUser(String emailId);
}
