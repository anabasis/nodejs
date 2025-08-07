package com.seegene.main.domain.account.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;


import com.seegene.main.domain.account.dto.*;
import com.seegene.main.global.function.ExceptionInterface;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import static com.seegene.main.domain.account.entity.QTswLicn.tswLicn;
import static com.seegene.main.domain.datacodemanagement.entity.QTcdCdItm.tcdCdItm;
import static com.seegene.main.domain.datacodemanagement.entity.QTcdCdItmMlg.tcdCdItmMlg;



@RequiredArgsConstructor
public class TswLicnRepositoryCustomImpl implements TswLicnRepositoryCustom, ExceptionInterface {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<LicenseListResponse> findLicnList(String langCd) {
        return jpaQueryFactory
                .select(
                        new QLicenseListResponse(
                                tswLicn.id,
                                tcdCdItmMlg.cdNm.coalesce(tcdCdItm.dftcdNm)

                        )
                )
                .from(tswLicn)
                .leftJoin(tcdCdItm).on(tcdCdItm.cd.eq(tswLicn.systCd))
                .leftJoin(tcdCdItm.tcdCdItmMlgList, tcdCdItmMlg).on(tcdCdItmMlg.langCd.eq(langCd))
                .orderBy(tswLicn.crtDt.desc())
                .fetch();
    }

    @Override
    public Optional<LicenseDetailResponse> findByLicnId(Long id, String langCd) {
        LicenseDetailResponse result = jpaQueryFactory
                .select(
                        new QLicenseDetailResponse(
                                tswLicn.id,
                                tswLicn.systCd,
                                tcdCdItmMlg.cdNm.coalesce(tcdCdItm.dftcdNm),
                                tswLicn.cont,
                                tswLicn.crtrUid,
                                tswLicn.crtDt,
                                tswLicn.mdfrUid,
                                tswLicn.mdfDt
                        )
                )
                .from(tswLicn)
                .leftJoin(tcdCdItm).on(tcdCdItm.cd.eq(tswLicn.systCd))
                .leftJoin(tcdCdItm.tcdCdItmMlgList, tcdCdItmMlg).on(tcdCdItmMlg.langCd.eq(langCd))
                .where(tswLicn.id.eq(id))
                .fetchOne();

        return Optional.ofNullable(result);
    }
}
