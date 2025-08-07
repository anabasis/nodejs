package com.seegene.main.domain.board.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DelYn {
    Y("Y")
    , N("N");
    private final String code;
}
