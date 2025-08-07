package com.seegene.main.domain.notice.repository;

import com.seegene.main.domain.notice.dto.DashboardNoticeListResponse;
import com.seegene.main.domain.notice.dto.NoticeListResponse;

import java.util.List;

public interface TbdNtcRepositoryCustom {
    List<DashboardNoticeListResponse> findHomeNotice(String langCd, String userUid);

}
