package com.seegene.main.global.auth;

import static com.seegene.main.global.dto.RealmAccess.*;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import com.seegene.main.global.dto.DecodeJwt;
import com.seegene.main.global.dto.RealmAccess;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

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
@Slf4j
@Setter
@Getter
public class PlatformUserInfo extends JwtAuthenticationToken implements Serializable {

	private String usrUid;
	private String langCode;
	private List<String> roles;

	public PlatformUserInfo(Jwt jwt, Collection<? extends GrantedAuthority> authorities, String name) {
		super(jwt, authorities, name);
		DecodeJwt decode = DecodeJwt.decode(jwt.getTokenValue());
		RealmAccess realmAccessData = getRealmAccessData(decode.realm_access());
		this.usrUid = decode.user_uid();
		this.langCode = decode.lang_code();
		this.roles = realmAccessData.getRoles();
	}
}
