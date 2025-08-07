package com.seegene.main.global.auth;

import java.util.Collection;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

import com.seegene.main.global.util.props.KeycloakProperties;

import lombok.RequiredArgsConstructor;

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
 *   1 2023-10-04        khhong        최초작성
 * </PRE>
 */
@Component
@RequiredArgsConstructor
public class PlatformUserConverter implements Converter<Jwt, PlatformUserInfo> {

	private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
	private final KeycloakProperties keycloakProperties;

	@Override
	public PlatformUserInfo convert(Jwt jwt) {
		Collection<GrantedAuthority> authoritites = Stream.concat(jwtGrantedAuthoritiesConverter.convert(jwt).stream(), extractResourceRoles(jwt).stream()).collect(Collectors.toSet());
		return new PlatformUserInfo(jwt, authoritites, getPrincipleClaimName(jwt));
	}

	private String getPrincipleClaimName(Jwt jwt) {
		String claimName = JwtClaimNames.SUB;
		if (keycloakProperties.getPrincipleAttribute() != null) {
			claimName = keycloakProperties.getPrincipleAttribute();
		}
		return jwt.getClaim(claimName);
	}

	private Collection<? extends GrantedAuthority> extractResourceRoles(Jwt jwt) {
		Map<String, Object> realmAccess;
		Collection<String> resourceRoles;

		if (jwt.getClaim("realm_access") == null) {
			return Set.of();
		}
		realmAccess = jwt.getClaim("realm_access");
		resourceRoles = (Collection<String>)realmAccess.get("roles");

		return resourceRoles.stream().map(role -> new SimpleGrantedAuthority("ROLE_" + role)).collect(Collectors.toSet());
	}
}
