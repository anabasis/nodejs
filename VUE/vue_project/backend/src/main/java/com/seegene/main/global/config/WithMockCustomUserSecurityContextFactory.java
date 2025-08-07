package com.seegene.main.global.config;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.seegene.main.global.config.annotation.WithMockCustomUser;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

/**
 class 한글 설명(요약)
 <PRE>
 한글 설명(상세)
 </PRE>
 @author   : 오윤복(메가존)(megazone.yboh@seegene.com)
 @History
 <PRE>
  * No  Date           Author            Desc
  *---- ------------ ---------------- ------------------------------------
  *   1 2023/09/05   오윤복(메가존)   최초작성
 </PRE>
 */
public class WithMockCustomUserSecurityContextFactory
	implements WithSecurityContextFactory<WithMockCustomUser> {
	@Override
	public SecurityContext createSecurityContext(WithMockCustomUser customUser) {
		SecurityContext context = SecurityContextHolder.createEmptyContext();

		// PlatformUserInfo principal =
		// 	new PlatformUserInfo(customUser.usrUid(), new ArrayList<>(),"");
		// Authentication auth =
		// 	new UsernamePasswordAuthenticationToken(principal, "password", principal.getAuthorities());
		// context.setAuthentication(auth);

		// 2
		Map<String, Object> attributes = new HashMap<>();
		attributes.put("username", customUser.username());
		attributes.put("name", customUser.name());

		// 3
		OAuth2User principal = new DefaultOAuth2User(
			List.of(new OAuth2UserAuthority(customUser.role(), attributes)),
			attributes,
			customUser.name());

		// 4
		Authentication auth =
			new UsernamePasswordAuthenticationToken(principal, "password", principal.getAuthorities());

		// OAuth2AuthenticationToken token = new OAuth2AuthenticationToken(
		//         principal,
		//         principal.getAuthorities(),
		//         customUser.registrationId());

		// 5
		context.setAuthentication(auth);

		return context;
	}
}
