package com.seegene.main.domain.project.repository;

import java.util.List;


import com.seegene.main.domain.dashboard.dto.CountryStatusResponse;
import com.seegene.main.domain.project.dto.CorporateStatusResponse;
import com.seegene.main.domain.project.dto.PurposeStatusResponse;
import com.seegene.main.domain.project.dto.RegionStatusResponse;
import org.springframework.stereotype.Repository;

@Repository
public interface TpjPrjRepositoryCustom {
//	Optional<ProjectInfoResponse> dslFindByIdAndLangCd(Long projectId, String langCd);
//	Optional<ProjectAdditionalInfoResponse> dslFindByIdAndLangCdAddInfo(Long projectId, String langCd);

    List<CorporateStatusResponse> findCorporateStatus(String projectStatusCode);

    List<PurposeStatusResponse> findPurposeStatus(String projectStatusCode);

    List<RegionStatusResponse> findRegionStatus(String projectStatusCode);

    List<CountryStatusResponse> findByCountryStatus(String projectStsCd);
}
