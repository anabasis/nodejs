package com.seegene.main.domain.dashboard.repository.mongo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.seegene.main.domain.external.entity.mongo.VistPage;

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
 *   1 2023/09/22   송주헌(juhun.song)   최초작성
 * </PRE>
 */
public interface VistPageRepository extends MongoRepository<VistPage, String> {
	List<VistPage> findByMdfrUidOrderByMdfDtDesc(String mdfrUid);
}
