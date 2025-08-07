package com.seegene.main.domain.board.constant;

public enum QnaCdGrpCode {
    TYPE("Qna Type Code", "PFM006"),
    CATEGORY("Qna Category Code", "PFM008"),
    MODULE("Qna Module Code", "PFM009"),
    STATUS("Qna Status Code", "PFM007"),
    OPENLEVEL("Qna Open Level Code", "PFM013");

    private final String name;
    private final String code;

    QnaCdGrpCode(String name, String code) {
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
