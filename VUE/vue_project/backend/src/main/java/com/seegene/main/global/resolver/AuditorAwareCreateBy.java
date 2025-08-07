package com.seegene.main.global.resolver;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.seegene.main.global.auth.PlatformUserInfo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AuditorAwareCreateBy implements AuditorAware<String> {
    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        Object principal = authentication.getPrincipal();
        String usrUid = null;

        if (authentication instanceof PlatformUserInfo) {
            var platformUserInfo = (PlatformUserInfo) SecurityContextHolder.getContext().getAuthentication();
            if (platformUserInfo.getUsrUid() != null) {
                usrUid = platformUserInfo.getUsrUid();
                log.info("Found Authentication USER : {}", usrUid);
                return Optional.of(usrUid);
            }
        }
        String principalNm = (String)principal;
        if(principalNm.equals("anonymousUser")) {
            principalNm = "systemUser";
        }
        return Optional.of(principalNm);
    }
}
