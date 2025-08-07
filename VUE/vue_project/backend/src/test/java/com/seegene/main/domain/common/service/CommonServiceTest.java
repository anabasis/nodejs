package com.seegene.main.domain.common.service;

import com.seegene.main.domain.authority.constant.MnuLoctCode;
import com.seegene.main.domain.authority.entity.TrlAdmRolApl;
import com.seegene.main.domain.authority.entity.TrlUsrRol;
import com.seegene.main.domain.authority.entity.TrlUsrRolApl;
import com.seegene.main.domain.common.constant.MnuType;
import com.seegene.main.domain.common.dto.AuthorityRoleMenuResponse;
import com.seegene.main.domain.common.dto.CommonCountryResponse;
import com.seegene.main.domain.common.dto.UserDetailResponse;
import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.domain.common.repository.TsyFlRepository;
import com.seegene.main.domain.common.repository.mapper.CommonMapper;
import com.seegene.main.domain.common.vo.CommonLnbMenuVo;
import com.seegene.main.domain.datacodemanagement.repository.TcdCntryRepository;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.domain.user.repository.TrlAdmRolAplRepository;
import com.seegene.main.domain.user.repository.TrlUsrRolAplRepository;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.config.annotation.WithMockCustomUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Example;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@WithMockCustomUser //JPA Auditting을 위해 커스텀 어노테이션 사용
@ActiveProfiles("test")
@Transactional
@Rollback(value = true)
@DisplayName("조회 통합테스트")
class CommonServiceTest {
    @Autowired
    TcdCntryRepository tcdCntryRepository;
    @Autowired
    TsyFlRepository tsyFlRepository;

    @Autowired
    TrlAdmRolAplRepository trlAdmRolAplRepository;

    @Autowired
    TrlUsrRolAplRepository trlUsrRolAplRepository;
    @Autowired
    CommonService commonService;
    @Autowired
    CommonMapper commonMapper;

    @Test
    @DisplayName("조회 테스트")
    void getCountryList() {
        assertEquals(commonService.getCountryList(), tcdCntryRepository.findAll().stream().map(CommonCountryResponse::of).toList());
    }
    @Test
    @DisplayName("COMMON lnb 테스트")
    void getUsrLnbList(){
        String usruid = "5F1AAF13537C11EE857102D5D06DD9EE"   ;
        String langCd = "ko";

        List<CommonLnbMenuVo> voList = commonMapper.getUsrLnbMenuInfo(Map.of(
                "langCd"    , langCd,
                "mnuTpCd"   , MnuType.MDV,
                "mnuLoctCd" , MnuLoctCode.LNB,
                "usrUid"    , usruid)
        );
        List<AuthorityRoleMenuResponse> lnblist = commonService.getUsrLnbList(langCd, usruid);
        Long mnuNum  = 0L;
        Long mnuNum2 = 0L;
        if(voList != null && voList.size() > 0)
            mnuNum = voList.get(0).getMnuNum();
        if(lnblist != null && lnblist.size() > 0)
            mnuNum2 = lnblist.get(0).mnuNum();
        assertNotEquals(null, mnuNum);
        assertNotEquals(null, mnuNum2);
        //
        assertEquals(mnuNum, mnuNum2);
        // null case
        assertEquals(Collections.EMPTY_LIST, commonService.getUsrLnbList(langCd, null));
    }
    @Test
    @DisplayName("COMMON GNB 테스트")
    void getUsrGnbList(){
        String usruid = "5F1AAF13537C11EE857102D5D06DD9EE"   ;
        String langCd = "ko";
        List<CommonLnbMenuVo> voList            = commonMapper.getUsrGnbMenuInfo(Map.of("langCd"    , langCd,"mnuTpCd"   , MnuType.MDV,"mnuLoctCd" , MnuLoctCode.GNB));
        List<AuthorityRoleMenuResponse> gnblist = commonService.getUsrGnbList(langCd, usruid);
        // 데이터
        assertEquals(voList.get(0).getMnuNum(), gnblist.get(0).mnuNum());
        // null case
        assertEquals(Collections.EMPTY_LIST, commonService.getUsrGnbList(langCd, null));
    }
    @Test
    @DisplayName("[IFM142] 로그인 사용자 정보 조회 API")
    void getUserDetailTest(){
        String usruid = "5F1AAF13537C11EE857102D5D06DD9EE"   ;
        UserDetailResponse userDetailResponse = commonService.getUserDetail(usruid);
        assertNotEquals(null, userDetailResponse);
        Optional<TrlUsrRolApl> optionalTrlUsrRolApl = trlUsrRolAplRepository.findById(usruid);
        if(optionalTrlUsrRolApl.isEmpty())
            assertNull(optionalTrlUsrRolApl);
        else
            assertEquals(userDetailResponse.userRolInfo().id(), optionalTrlUsrRolApl.get().getTrlUsrRol().getId());
        assertNotEquals(null, trlUsrRolAplRepository.findById("unknow_user"));
        List<TrlAdmRolApl> list = trlAdmRolAplRepository.findAll(Example.of(
            TrlAdmRolApl.builder().tusUsr(TusUsr.builder().id(usruid).build()).build()
        ));
        assertNotNull(list);
    }

}