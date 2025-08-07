package com.seegene.main.domain.notice.contant;

public enum NoticeCodeGroup {

    CATEGORY("Notice Category Code", "PFM001"),
    EXPOSUREPOSITION("Exposure Position Code", "PFM002"),
    EXPOSUREPERIODTYPE("Exposure Period Type Code", "PFM003"),
    EXPOSUREFREQUENCY("Exposure Frequency Code", "PFM004"),
    TYPE("Notice Type Code", "PFM005"),
    OPENLEVEL("Open Level Code", "PFM013");

    private final String name;
    private final String code;

    NoticeCodeGroup(String name, String code) {
        this.name = name;
        this.code = code;
    }

    public String getName() {
        return name;
    }
    public String getCode() {
        return code;
    }
}
