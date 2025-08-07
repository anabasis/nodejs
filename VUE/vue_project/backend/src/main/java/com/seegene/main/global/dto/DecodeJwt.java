package com.seegene.main.global.dto;

import java.util.Base64;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.google.gson.Gson;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 *
 * @author : khhong@mz.co.kr
 * @History <PRE>
 * No  Date           Author            Desc
 * ---- ------------ ---------------- ------------------------------------
 * 1 2023-05-22        khhong        최초작성
 * </PRE>
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record DecodeJwt(String exp, String iat, String jti, String iss, String aud, String sub, String typ, String azp, String session_state,
                        String acr, Object realm_access, Object resource_access, String scope, String sid, String email_verified, String lang_code, String user_uid,
                        String name, String preferred_username, String given_name, String family_name, String email) {

    public static DecodeJwt decode(String token) {
        String[] pieces = token.split("\\.");
        String b64payload = pieces[1];
        String decodedPayload = new String(Base64.getDecoder().decode(b64payload.replace('-','+').replace('-','/')));
        return new Gson().fromJson(decodedPayload, DecodeJwt.class);
    }
}
