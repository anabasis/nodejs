package com.seegene.main.domain.notice.contant;

public enum OpenLvlCd {
    PUB( "PUB"),
    PRV("PRV"),
    PTL("PTL");


    private final String code;

    OpenLvlCd(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
