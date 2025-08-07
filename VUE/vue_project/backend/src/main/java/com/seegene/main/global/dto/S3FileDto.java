package com.seegene.main.global.dto;

import lombok.Builder;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-06-06        khhong        최초작성
 * </PRE>
 */
@Builder
public record S3FileDto (String originalFileName, String uploadFileName, String uploadFilePath, String uploadFileUrl){

}
