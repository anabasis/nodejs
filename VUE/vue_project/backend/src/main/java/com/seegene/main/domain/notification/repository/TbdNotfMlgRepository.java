package com.seegene.main.domain.notification.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seegene.main.domain.notification.entity.TbdNotf;
import com.seegene.main.domain.notification.entity.TbdNotfMlg;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : 송주헌(juhun.song@mz.co.kr)
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023/09/14   송주헌(juhun.song)   최초작성
 * </PRE>
 */
public interface TbdNotfMlgRepository extends JpaRepository<TbdNotfMlg, Long> {

	Optional<TbdNotfMlg> findByNotfNumAndLangCd(TbdNotf notfNum, String langCd);

}
