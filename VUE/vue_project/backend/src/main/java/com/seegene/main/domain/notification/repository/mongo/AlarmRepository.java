package com.seegene.main.domain.notification.repository.mongo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.seegene.main.domain.external.entity.mongo.Alarm;
import org.springframework.stereotype.Repository;

import java.util.List;

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
@Repository
public interface AlarmRepository extends MongoRepository<Alarm, String> {
        Long countByToUsrUidAndNotfTpCdIn(String userUid, List<String> notfTpCd);

        Page<Alarm> findByToUsrUidAndNotfTpCdIn(String crtrUid, List<String> notfTpCd, Pageable pageable);
        List<Alarm> findByToUsrUidOrderByCrtDtDesc(String userUid);

}
