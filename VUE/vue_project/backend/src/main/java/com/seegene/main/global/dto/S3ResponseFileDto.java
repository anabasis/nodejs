package com.seegene.main.global.dto;

import lombok.Builder;

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
 *   1 2023-06-14        유승엽        최초작성
 * </PRE>
 */
@Builder
public record S3ResponseFileDto(String targetFileName, String lastModified, String message){

}
