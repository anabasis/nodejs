package com.seegene.main.global.util.props;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

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
 *   1 2023-07-21        khhong        최초작성
 * </PRE>
 */
@Configuration
@ConfigurationProperties(prefix = "swagger")
@Getter
@Setter
public class SwaggerProperties {

	private String url;
	private String description;
}
