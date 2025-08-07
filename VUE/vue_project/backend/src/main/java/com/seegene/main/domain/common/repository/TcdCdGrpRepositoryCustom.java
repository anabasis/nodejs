package com.seegene.main.domain.common.repository;


import com.seegene.main.domain.common.dto.DslCommonCodeItemMapResponse;

import java.util.List;

public interface TcdCdGrpRepositoryCustom {

    List<DslCommonCodeItemMapResponse> dslFindBySourceCodeItemNumAndLangCdOrderBySortNum(Long sourceCodeItemNum, String langCd);
}
