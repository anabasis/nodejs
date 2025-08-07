package com.seegene.main.domain.dashboard.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FavTpCd {
    WEB("WEB")
    , TOOL("TOL");
    private final String code;
}
