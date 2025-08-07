package com.seegene.main.global.external.api.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.seegene.main.global.config.feign.FeignConfiguration;

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
 *   1 2023-09-20        khhong        최초작성
 * </PRE>
 */
@FeignClient(
	name = "insilico-api",
	url = "${external.api.insilicoUrl}",
	configuration = {FeignConfiguration.class})
public interface InsilicoApiClient {

}
