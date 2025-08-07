package com.seegene.main.domain.board.constant;

import com.seegene.main.global.util.s3.constant.Bucket;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

@Getter
@RequiredArgsConstructor
public enum QnaSts {
    WAIT_FOR_RESPONSE("WFR")
    , ASSIGNED("ASN")
    , RESPONSE_COMPLETE("newCo");
    private final String code;
}
