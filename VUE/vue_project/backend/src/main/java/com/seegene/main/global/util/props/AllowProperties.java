package com.seegene.main.global.util.props;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : @mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1                 최초작성
 * </PRE>
 */
@Configuration
@ConfigurationProperties(prefix = "allow")
@Getter
@Setter
public class AllowProperties {

	private List<String> apiUrls;
	private List<String> client;
	private List<String> clientExternalApi;
}
