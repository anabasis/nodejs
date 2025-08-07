package com.seegene.main.domain.demo.service;

import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Locale;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seegene.main.domain.demo.dto.LoginValidTResponse;
import com.seegene.main.domain.demo.repository.mapper.DemoXmlMapper;
import com.seegene.main.global.external.api.service.ApiClientService;
import com.seegene.main.global.util.kms.KmsUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 *
 * @author : @mz.co.kr
 * @History <PRE>
 * No  Date           Author            Desc
 * ---- ------------ ---------------- ------------------------------------
 * 1                 최초작성
 * </PRE>
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DemoService {

	private final MessageSource messageSource;
	private final DemoXmlMapper demoXmlMapper;
	private final KmsUtils kmsUtils;
	private final ApiClientService apiClientService;

	@Value("${secret.auth-key}")
	private String authKey;

	public String getAnonymousUser() {
		return String.format("[Seegene-platform-mvc-example]\n Hello Anonymous");
	}

	public String getAdminUser(Authentication authentication) {
		log.info(String.format("[getAdminUser] admin: %s, role:%s ", authentication.getName(), authentication.getAuthorities().toString()));
		String name = authentication.getName();
		String role = authentication.getAuthorities().toString();
		return String.format("[Seegene-platform-mvc-example] Hello Admin: %s, Role: %s", name, role);
	}

	public String getUser(Authentication authentication) {
		log.info(String.format("[getUser] user: %s, role:%s, ", authentication.getName(), authentication.getAuthorities().toString()));
		String name = authentication.getName();
		String role = authentication.getAuthorities().toString();
		return String.format("[Seegene-platform-mvc-example] Hello User: %s, Role: %s", name, role);
	}

	public String getLocaleMessage(Locale locale) {
		return messageSource.getMessage("hello", null, locale);
	}

	@Transactional(readOnly = true)
	public String demoData() {
		return demoXmlMapper.findByName();
	}

	public String kmsEncrypt(String plainText) {
		return kmsUtils.encrypt(plainText);
	}

	public String kmsDecrypt(String encryptedText) {
		return kmsUtils.decrypt(encryptedText);// .getBytes(StandardCharsets.UTF_8))));
	}

	public String kmsDataKeyEncrypt(String plainText) {
		return kmsUtils.encryptDataKey(plainText);
	}

	public String kmsDataKeyDecrypt(String encryptedText) {
		return kmsUtils.decryptDataKey(encryptedText);
	}

	public String encryptText(String plainText) {
		String encrypt = "";
		try {
			SecretKeySpec keySpec = new SecretKeySpec(authKey.getBytes(), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

			var ivParameterSpec = new IvParameterSpec(new byte[16]);
			cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivParameterSpec);

			log.info(String.format("[DemoService] encryptText s : %s", authKey));
			encrypt = Base64.getUrlEncoder().encodeToString(cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8)));
			log.info(String.format("[DemoService] encryptText plaintext : %s", plainText));
			log.info(String.format("[DemoService] encryptText encrypt : %s", encrypt));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (InvalidAlgorithmParameterException e) {
			e.printStackTrace();
		}

		return encrypt;
	}

	public String decryptText(String encryptedText) {
		String decode = "";
		try {
			SecretKeySpec keySpec = new SecretKeySpec(authKey.getBytes(), "AES");
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			log.info(String.format("[DemoService] decryptText s : %s", authKey));

			var ivParameterSpec = new IvParameterSpec(new byte[16]);

			cipher.init(Cipher.DECRYPT_MODE, keySpec, ivParameterSpec);
			decode = new String(cipher.doFinal(Base64.getUrlDecoder().decode(encryptedText)), StandardCharsets.UTF_8); // encryptedText.replace(' ', '+').replace('+', '-').replace('/', '_'));
			log.info(String.format("[DemoService] decryptText : %s", decode));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		} catch (InvalidAlgorithmParameterException e) {
			e.printStackTrace();
		}
		return decode;
	}

	public String externalAdminAnonymous() {
		return apiClientService.getAnonymous();
	}

	public String externalAdminLocale(Locale lang) {
		return apiClientService.getLocale(lang);
	}

	public LoginValidTResponse externalCreateAdminHistory(String token) {
		return apiClientService.findByloginValid("Bearer " + token);
	}
}
