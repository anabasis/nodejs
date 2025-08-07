package com.seegene.main.domain.mypage.vo;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class TusUsrVo {
    String usrUid;
    Long corpNum;
    String emlId;
    String loginPwd;
    String usrNm;
    String orgnNm;
    String jobTitl;
    String jobNm;
    Long prflFlNum;
    String joinTpCd;
    String cntryCd;
    String langCd;
    String usrStsCd;
    String otpAuthYn;
    String emlAuthYn;
    String adSynYn;
    LocalDateTime lstAlmInqrDt;
    String crtrUid;
    LocalDateTime crtDt;
    String mdfrUid;
    LocalDateTime mdfDt;
}
