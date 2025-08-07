package com.seegene.main.global.dto;

import lombok.Builder;

import java.util.List;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : yuseungyeop@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-06-16        유승엽        최초작성
 * </PRE>
 */
@Builder
public record S3UrlListDto(List<String> url) {

    public static S3UrlListDto form(List<String> url) {
        return S3UrlListDto.builder().url(url).build();
    }
}

