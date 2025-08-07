package com.seegene.main.domain.account.repository;

import com.seegene.main.domain.account.dto.LicenseDetailResponse;
import com.seegene.main.domain.account.dto.LicenseListResponse;

import java.util.List;
import java.util.Optional;


public interface TswLicnRepositoryCustom {

    List<LicenseListResponse> findLicnList(String langCd);

    Optional<LicenseDetailResponse> findByLicnId(Long id, String langCd);
}
