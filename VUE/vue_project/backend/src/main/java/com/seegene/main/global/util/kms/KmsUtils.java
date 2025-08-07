package com.seegene.main.global.util.kms;

import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.crypto.codec.Hex;
import org.springframework.stereotype.Component;

import com.seegene.main.global.util.props.AwsProperties;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.awscore.exception.AwsServiceException;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.services.kms.KmsClient;
import software.amazon.awssdk.services.kms.model.DataKeySpec;
import software.amazon.awssdk.services.kms.model.DecryptRequest;
import software.amazon.awssdk.services.kms.model.DecryptResponse;
import software.amazon.awssdk.services.kms.model.EncryptRequest;
import software.amazon.awssdk.services.kms.model.EncryptResponse;
import software.amazon.awssdk.services.kms.model.GenerateDataKeyRequest;
import software.amazon.awssdk.services.kms.model.KmsException;

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
 *   1 2023-09-01        khhong        최초작성
 * </PRE>
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class KmsUtils {

	private final KmsClient kmsClient;
	private final AwsProperties awsProperties;

	public String encrypt(String text) {

		EncryptResponse encryptResponse = null;
		String encrypt = "";
		try {
			EncryptRequest encryptRequest = EncryptRequest.builder()
				.keyId(awsProperties.getKmsKeyId())
				.plaintext(SdkBytes.fromString(text, StandardCharsets.UTF_8))
				.build();
			encryptResponse = kmsClient.encrypt(encryptRequest);
			encrypt = new String(Hex.encode(encryptResponse.ciphertextBlob().asByteArray()));
			log.info(String.format("[KmsUtils] encryptResponse : %s", encrypt));

		} catch (KmsException e) {
			e.printStackTrace();
		} catch (SdkClientException e) {
			e.printStackTrace();
		} catch (UncheckedIOException e) {
			e.printStackTrace();
		}
		return encrypt;
	}

	public String decrypt(String encryptedText) {
		DecryptResponse decryptResponse = null;
		String decode = "";
		try {
			DecryptRequest decryptRequest = DecryptRequest.builder()
				.keyId(awsProperties.getKmsKeyId())
				.ciphertextBlob(SdkBytes.fromByteArray(Hex.decode(encryptedText)))
				.build();
			decryptResponse = kmsClient.decrypt(decryptRequest);
			decode = decryptResponse.plaintext().asUtf8String();
			log.info(String.format("[KmsUtils] decryptResponse : %s", decode));
		} catch (AwsServiceException e) {
			e.printStackTrace();
		} catch (SdkClientException e) {
			e.printStackTrace();
		} catch (UncheckedIOException e) {
			e.printStackTrace();
		}
		return decode;
	}

	public String encryptDataKey(String plainText) {
		String encrypt = "";
		String decode = "";
		try {
			GenerateDataKeyRequest generateDataKeyRequest = GenerateDataKeyRequest.builder()
				.keyId(awsProperties.getKmsKeyId())
				.keySpec(DataKeySpec.AES_256)
				.build();
			var generateDataKeyResponse = kmsClient.generateDataKey(generateDataKeyRequest);
			var sdkBytes = this.decryptDataKey(generateDataKeyResponse.ciphertextBlob());
			//			log.info(String.format("[KmsUtils] encryptResponse  :%s", new String(sdkBytes)));
			SecretKeySpec keySpec = new SecretKeySpec(sdkBytes, "AES");

			// String key = "MyTestCode-32Character-TestAPIKey";
			// log.info(String.format("[KmsUtils] encryptResponse s : %s", key));
			// String iv = key.substring(0,16);
			// log.info(String.format("[KmsUtils] encryptResponse iv : %s", iv));
			// var ivParameterSpec = new IvParameterSpec(iv.getBytes());
			Cipher cipher = Cipher.getInstance("AES");
			cipher.init(Cipher.ENCRYPT_MODE, keySpec);
			encrypt = Base64.getUrlEncoder().encodeToString(cipher.doFinal(plainText.getBytes()));
			log.info(String.format("[KmsUtils] encryptResponse plaintext : %s", plainText));
			log.info(String.format("[KmsUtils] encryptResponse encrypt : %s", encrypt));


			// SecretKeySpec keySpec = new SecretKeySpec(sdkBytes, "AES");
			// Cipher cipher = Cipher.getInstance("AES");
			cipher.init(Cipher.DECRYPT_MODE, keySpec);
			byte[] decodeBase64 = Base64.getUrlDecoder().decode(encrypt.replace(' ', '+').replace('+', '-').replace('/', '_'));
			decode = new String(cipher.doFinal(decodeBase64), StandardCharsets.UTF_8);
			log.info(String.format("[KmsUtils] encryptResponse decode : %s", decode));

		} catch (KmsException e) {
			e.printStackTrace();
		} catch (SdkClientException e) {
			e.printStackTrace();
		} catch (UncheckedIOException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
			// } catch (InvalidAlgorithmParameterException e) {
			// 	e.printStackTrace();
		}
		return encrypt;
	}

	public String decryptDataKey(String encryptedText) {
		String decode = "";
		try {
			log.info(String.format("[KmsUtils] decryptDataKey - encryptedText : %s", encryptedText));
			GenerateDataKeyRequest generateDataKeyRequest = GenerateDataKeyRequest.builder()
				.keyId(awsProperties.getKmsKeyId())
				.keySpec(DataKeySpec.AES_256)
				.build();
			var generateDataKeyResponse = kmsClient.generateDataKey(generateDataKeyRequest);

			// String key = "MyTestCode-32Character-TestAPIKey";
			// log.info(String.format("[KmsUtils] encryptResponse s : %s", key));
			// String iv = key.substring(0,16);
			// log.info(String.format("[KmsUtils] encryptResponse iv : %s", iv));
			// var ivParameterSpec = new IvParameterSpec(iv.getBytes());

			var sdkBytes = this.decryptDataKey(generateDataKeyResponse.ciphertextBlob());
			byte[] decodeBase64 = Base64.getUrlDecoder().decode(encryptedText.replace(' ', '+').replace('+', '-').replace('/', '_'));
			SecretKeySpec keySpec = new SecretKeySpec(sdkBytes, "AES");
			Cipher cipher = Cipher.getInstance("AES");
			cipher.init(Cipher.DECRYPT_MODE, keySpec);
			decode = new String(cipher.doFinal(decodeBase64), StandardCharsets.UTF_8);
			log.info(String.format("[KmsUtils] decryptDataKey : %s", decode));
			decode = new String(decodeBase64);
		} catch (AwsServiceException e) {
			e.printStackTrace();
		} catch (SdkClientException e) {
			e.printStackTrace();
		} catch (UncheckedIOException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
			// } catch (InvalidAlgorithmParameterException e) {
			// 	e.printStackTrace();
		}
		return decode;
	}

	public byte[] decryptDataKey(SdkBytes dataKey) {
		DecryptRequest decryptRequest = DecryptRequest.builder().ciphertextBlob(dataKey).build();
		DecryptResponse decrypt = kmsClient.decrypt(decryptRequest);
		return decrypt.plaintext().asByteArray();
	}
}
