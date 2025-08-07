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
 *   1 2023-10-13        khhong        최초작성
 * </PRE>
 */
@Configuration
@ConfigurationProperties(prefix = "mail")
@Getter
@Setter
public class FrontUrlProperties {

	private String frontUrl;
}
