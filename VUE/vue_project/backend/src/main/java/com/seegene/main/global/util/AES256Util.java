package com.seegene.main.global.util;

import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

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
 *   1 2023-09-20        khhong        최초작성
 * </PRE>
 */
@Component
@Slf4j
public class AES256Util {

	@Value("${secret.auth-key}")
	private String authKey;

	public String encryptText(String plainText) {
		String encrypt = "";
		try {
			SecretKeySpec keySpec = new SecretKeySpec(authKey.getBytes(), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

			var ivParameterSpec = new IvParameterSpec(new byte[16]);
			cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivParameterSpec);

			encrypt = Base64.getUrlEncoder().encodeToString(cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8)));
			log.info(String.format("[AES256Util] encryptText authKey : %s", authKey));
			log.info(String.format("[AES256Util] encryptText plaintext : %s", plainText));
			log.info(String.format("[AES256Util] encryptText encrypt : %s", encrypt));
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

			var ivParameterSpec = new IvParameterSpec(new byte[16]);

			cipher.init(Cipher.DECRYPT_MODE, keySpec, ivParameterSpec);
			decode = new String(cipher.doFinal(Base64.getUrlDecoder().decode(encryptedText)), StandardCharsets.UTF_8);
			log.info(String.format("[AES256Util] decryptText authKey : %s", authKey));
			log.info(String.format("[AES256Util] decryptText encryptedText: %s", encryptedText));
			log.info(String.format("[AES256Util] decryptText decode: %s", decode));
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
}
