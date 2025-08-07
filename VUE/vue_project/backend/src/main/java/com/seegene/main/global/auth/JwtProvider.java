package com.seegene.main.global.auth;

import static com.seegene.main.global.dto.RealmAccess.*;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.dto.DecodeJwt;
import com.seegene.main.global.dto.RealmAccess;
import com.seegene.main.global.exception.BusinessException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * JwtProvider
 * <PRE>
 * </PRE>
 *
 * @author : @mz.co.kr
 * @History <PRE>
 * No  Date           Author            Desc
 * ---- ------------ ---------------- ------------------------------------
 *   1   2023-05-31        khhong        최초작성
 *   2   2023-07-21        khhong        keycloak 토큰 유효성 검증 추가
 *   3   2023-07-26        khhong        PlatformUserDetails 내용 추가
 *   4   2023-08-09        khhong        PlatformUserInfo 내용 추가 및 Keycloak 인증 검증 내용 추가.
 *   5   2023-08-16        khhong        Keycloak Role Mapping 추가
 *   6   2023-08-21        khhong        CloudFront 정보 관련 제거, 정보 필요시 추후 반영예정
 * </PRE>
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    public void authenticate(String token, String url) throws AuthenticationException {

        if (StringUtils.isEmpty(token)) {
            throw new BusinessException(ErrorCode.TOKEN_VALUE_ERROR);
        }

        var decodeJwt = DecodeJwt.decode(token);
        if (decodeJwt.azp().equals("insilico-client") && !url.contains("/external") && !url.contains("/demo")) {
            throw new BusinessException(ErrorCode.EXTERNAL_API_ERROR);
        }
        // 2023.09.27 user_uid 없이도 인증가능하도록 조치
        if (StringUtils.isEmpty(decodeJwt.user_uid())) {
            //throw new BusinessException(ErrorCode.SYSTEM_AUTHENTICATION_ERROR);
        }
    }
}
