package com.seegene.main.global.config.feign;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignFormatterRegistrar;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.datetime.standard.DateTimeFormatterRegistrar;

import feign.Retryer;
import feign.codec.ErrorDecoder;

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
@Configuration
@EnableFeignClients(basePackages = {"com.seegene.main"})
public class FeignConfiguration {

	/**
	 * RequestParam 에서 LocalDate, LocalDateTime, LocalTime 을 사용을 할 때 ISO formatter 로 보내기 위한 설정
	 *
	 * @see org.springframework.web.bind.annotation.RequestParam
	 */
	@Bean
	public FeignFormatterRegistrar localDateFeignFormatterRegister() {
		return registry -> {
			DateTimeFormatterRegistrar registrar = new DateTimeFormatterRegistrar();
			registrar.setUseIsoFormat(true);
			registrar.registerFormatters(registry);
		};
	}

	@Bean
	public Retryer retryer() {
		return new Retryer.Default(1000, 2000, 3);
	}

	@Bean
	ErrorDecoder errorDecoder() {
		return new FeignErrorDecode();
	}


}
