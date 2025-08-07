package com.seegene.main.domain.software.constant;

public enum IvdRuoCode {
    All("All"),
    IVD("IVD"),
    RUO("RUO");

    final String value;
    IvdRuoCode(String value) { this.value = value; }
    public String value() { return value; }
}
