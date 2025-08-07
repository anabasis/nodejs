package com.seegene.main.global.encrypt;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Service;

@Service
public class AestoService {
	private static final String AES_ALGORITHM = "AES";

	// AES 키
	private static final String AES_KEY = "0123456789abcdef"; // 16바이트(128비트) 키

	public static String encrypt(String data) throws Exception {
		SecretKeySpec keySpec = new SecretKeySpec(AES_KEY.getBytes(StandardCharsets.UTF_8), AES_ALGORITHM);
		Cipher cipher = Cipher.getInstance(AES_ALGORITHM);
		cipher.init(Cipher.ENCRYPT_MODE, keySpec);

		byte[] encryptedBytes = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
		return Base64.getEncoder().encodeToString(encryptedBytes);
	}

	public static String decrypt(String encryptedData) throws Exception {
		SecretKeySpec keySpec = new SecretKeySpec(AES_KEY.getBytes(StandardCharsets.UTF_8), AES_ALGORITHM);
		Cipher cipher = Cipher.getInstance(AES_ALGORITHM);
		cipher.init(Cipher.DECRYPT_MODE, keySpec);

		byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
		return new String(decryptedBytes, StandardCharsets.UTF_8);
	}

}
