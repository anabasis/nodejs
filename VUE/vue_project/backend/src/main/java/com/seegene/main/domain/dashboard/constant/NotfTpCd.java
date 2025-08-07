package com.seegene.main.domain.dashboard.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NotfTpCd {
    NT01("My Page")
    , NT02("Notice")
    , NT03("Help Desk(inquiries)")
    , NT04("Project")
    , NT05("SeegeneHQ")
    , NT06("NewCo")
    , NT07("Help Desk(in charge)")
    , NT08("Request");
    private final String code;
}
