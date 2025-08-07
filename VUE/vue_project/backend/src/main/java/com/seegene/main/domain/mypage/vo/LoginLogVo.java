package com.seegene.main.domain.mypage.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LoginLogVo {

    private String loginDt;
    private String ipAddr;
    private String engCntryNm;

}
