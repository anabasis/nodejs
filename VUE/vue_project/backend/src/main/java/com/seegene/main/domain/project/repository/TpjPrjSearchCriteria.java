package com.seegene.main.domain.project.repository;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TpjPrjSearchCriteria {
    private String key; // 필드 이름
//    private String operation; // 연산 (같음, 보다 작음 등)
    private Object value; // 값

}
