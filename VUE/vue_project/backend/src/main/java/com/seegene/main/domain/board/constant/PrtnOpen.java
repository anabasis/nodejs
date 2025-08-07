package com.seegene.main.domain.board.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PrtnOpen {
    PRIVATE("PRV"),
    PARTIALLY_OPEN("PTL");
    private final String code;
}
