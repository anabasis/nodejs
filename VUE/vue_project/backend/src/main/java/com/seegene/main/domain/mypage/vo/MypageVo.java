package com.seegene.main.domain.mypage.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MypageVo {

    private String usrUid;
    private String emlId;
    private String prflFlNum;
    private String usrNm;
    private String corpNm;
    private String orgnNm;
    private String jobTitl;
    private LocalDateTime crtDt;
    private String loginDt;
    private String ipAddr;
    private String lastAccessDate;

}
