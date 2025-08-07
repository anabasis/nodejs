package com.seegene.main.domain.common.vo;

import lombok.Data;

@Data
public class CommonLnbMenuVo {
    private Long mnuNum;
    private String mnuNm;
    private Long prntMnuNum;
    private String prntMnuNm;
    private Long mnuDpth;
    private Long sortNum;
    private String redYn;
    private String crtYn;
    private String uptYn;
    private String delYn;
    private String mnuUrl;
    private Long dftIconFlNum;
    private Long acvIconFlNum;
    private Long hovIconFlNum;
}
