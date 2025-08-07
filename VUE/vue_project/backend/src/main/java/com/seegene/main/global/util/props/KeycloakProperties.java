package com.seegene.main.global.util.props;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

/**
 * <PRE>
 * KeycloakProperties
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
@ConfigurationProperties(prefix = "keycloak.auth.converter")
@Getter
@Setter
public class KeycloakProperties {

	private String principleAttribute;
}
