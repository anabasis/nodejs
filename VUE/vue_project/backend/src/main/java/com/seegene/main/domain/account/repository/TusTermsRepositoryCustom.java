package com.seegene.main.domain.account.repository;


import com.seegene.main.domain.account.dto.AccountTermsListResponse;
import com.seegene.main.domain.account.dto.TermsCountryGroupListResponse;
import com.seegene.main.domain.account.dto.TermsFilterResponse;
import com.seegene.main.domain.account.dto.TermsResponse;

import java.util.List;
import java.util.Optional;


public interface TusTermsRepositoryCustom {

    List<AccountTermsListResponse> getTermsList(List<String> cntryCdList, String langCode);

    Optional<TermsResponse> getTermsDetail(String categoryCd, String countryGroupId, String ver, String lnagCd, String userLangCd);

    List<TermsFilterResponse> getTermsFilter(String categoryCd, String countryGroupId, String ver);

    List<TermsCountryGroupListResponse> getTermsCountryGroupList(String categoryCd);

    Optional<TermsResponse> getTermsLoginDetail(String categoryCd, String countryGroupId, String version, String lnagCd);

}
