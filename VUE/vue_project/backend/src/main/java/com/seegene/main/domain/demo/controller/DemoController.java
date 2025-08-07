package com.seegene.main.domain.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.exception.InvalidValueException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.seegene.main.domain.demo.dto.LoginValidTResponse;
import com.seegene.main.domain.demo.service.DemoService;
import com.seegene.main.global.dto.S3FileDto;
import com.seegene.main.global.dto.S3ResponseFileDto;
import com.seegene.main.global.dto.S3UrlListDto;
import com.seegene.main.global.util.s3.S3Service;
import com.seegene.main.global.util.s3.constant.Bucket;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Tag(name="demo", description = "DemoAPI")
@RequestMapping("/demo")
@RequiredArgsConstructor
@RestController
public class DemoController {

	private final DemoService demoService;
	private final S3Service s3Service;

	@Operation(summary = "[IFA000] anonymous 조회", description = "anonymous 정보를 조회합니다.")
	@GetMapping("/anonymous")
	public String getAnonymous() {
		return demoService.getAnonymousUser();
	}

	@Operation(summary = "[IFA000] admin 조회", description = "admin 권한의 사용자에 정보를 조회합니다.")
	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String getAdmin(Authentication authentication) {
		return demoService.getAdminUser(authentication);
	}

	@Operation(summary = "[IFA000] user, admin 조회", description = "user 또는 admin 권한의 사용자에 정보를 조회합니다.")
	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public String getUser(Authentication authentication) {
		return demoService.getUser(authentication);
	}

	@Operation(summary = "[IFA000] locale 정보 조회", description = "locale 설정된 정보를 조회합니다.")
	@GetMapping("/locale")
	public String getLocale(@RequestParam(value = "lang", defaultValue = "en") Locale lang) {
		return demoService.getLocaleMessage(lang);
	}

	@Operation(summary = "[IFA000] bucket 파일 업로", description = "bucket 파일을 업로드 합니다.")
	@PostMapping("/bucket/upload")
	public S3FileDto uploadFiles(@RequestParam("file") MultipartFile file){
		return s3Service.upload(Bucket.PLATFORM_LOCAL, file);
	}

	@Operation(summary = "[IFA000] bucket 파일 다운로드", description = "bucket 파일을 다운로드 합니다.")
	@PostMapping("/bucket/download")
	public S3ResponseFileDto downloadFiles(@RequestParam("key")String key){
		return s3Service.download(Bucket.PLATFORM_LOCAL, key);
	}

	@Operation(summary = "[IFA000] bucket 파일정보 조회", description = "bucket 파일 정보를 조회합니다.")
	@PostMapping("/bucket/url")
	public S3UrlListDto getFilesUrl(@RequestBody List<Map<String,String>> keyArr){
		List<String> url = new ArrayList<>();
		for (Map<String,String> key : keyArr) {
			url.add(s3Service.getUrl(Bucket.PLATFORM_LOCAL, key.get("key")));
		}
		return S3UrlListDto.form(url);
	}

	@Operation(summary = "[IFA000] bucket 파일 체크", description = "파일 체크 테스트  (테이블 명/파일명.확장자)")
	@GetMapping("/bucket/file-check")
	public boolean fileCheck(
			@RequestParam("key")String key,
			@RequestParam("storageCode") String stogCd
	){

		String directory;
		String fileName;
		String extension;
		String[] parts = key.split("/");
		if (parts.length == 2) {
			directory = parts[0] + "/"; // 디렉토리 부분
			String fileNameWithExtension = parts[1]; // 파일 이름 및 확장자 부분

			// 파일 이름과 확장자를 다시 분리
			String[] fileNameParts = fileNameWithExtension.split("\\.");

			if (fileNameParts.length == 2) {
				 fileName = fileNameParts[0]; // 파일 이름 부분
				 extension = fileNameParts[1]; // 확장자 부분
			}else{
				throw new InvalidValueException("파일 이름 및 확장자 오류");
			}
		}else{
			throw new InvalidValueException("파일 디렉토리 명 오류");
		}

		return s3Service.checkObject(
				TsyFl.builder()
						.flNm(fileName)
						.flPath(directory)
						.flExtn(extension)
						.stogTpCd(stogCd)
						.build()
		);
	}

	@Operation(summary = "[IFA000] Mybatis Sample API ", description = "마이바티스 샘플 API 입니다.")
	@PostMapping(value = "/mybatis", produces = "application/json")
	public String demoMybatis(){
		return demoService.demoData();
	}

	@Operation(summary = "[IFA000] Kms Encrypt Sample API - ", description = "KMS 암호화 샘플 API 입니다.")
	@GetMapping(value = "/kms-encrypt")
	public String demoKmsEncrypt(@RequestParam String plainText){
		return demoService.kmsEncrypt(plainText);
	}

	@Operation(summary = "[IFA000] Kms Decrypt Sample API - ", description = "KMS 복호화 샘플 API 입니다.")
	@GetMapping(value = "/kms-decrypt")
	public String demoKmsDecrypt(@RequestParam String encryptedText){
		return demoService.kmsDecrypt(encryptedText);
	}

	@Operation(summary = "[IFA000] Kms Encrypt Sample API - ", description = "KMS 암호화 Data-key 샘플 API 입니다.")
	@GetMapping(value = "/kms-encrypt-datakey")
	public String demoKmsDataKeyEncrypt(@RequestParam String plainText) {
		return demoService.kmsDataKeyEncrypt(plainText);
	}

	@Operation(summary = "[IFA000] Kms Decrypt Sample API - ", description = "KMS 복호화 Data-key 샘플 API 입니다.")
	@GetMapping(value = "/kms-decrypt-datakey")
	public String demoKmsDataKeyDecrypt(@RequestParam String encryptedText) {
		return demoService.kmsDataKeyDecrypt(encryptedText);
	}

	@Operation(summary = "[IFA000] Encrypt Sample API - ", description = "Data 암호화 샘플 API 입니다.")
	@GetMapping(value = "/encrypt-data")
	public String demoDataEncrypt(@RequestParam String plainText) {
		return demoService.encryptText(plainText);
	}

	@Operation(summary = "[IFA000] Kms Decrypt Sample API - ", description = "복호화 Data 샘플 API 입니다.")
	@GetMapping(value = "/decrypt-data")
	public String demoDataDecrypt(@RequestParam String encryptedText) {
		return demoService.decryptText(encryptedText);
	}


	@Operation(summary = "[IFA000] external Sample API - anonymous ", description = "External 샘플 API 입니다.")
	@GetMapping(value = "/external-admin")
	public String externalSampleAPIGetAnonymous() {
		return demoService.externalAdminAnonymous();
	}

	@Operation(summary = "[IFA000] external Sample API - getLocale", description = "External 샘플 API 입니다.")
	@GetMapping(value = "/external-admin-locale")
	public String externalSampleAPIGetLocale(@RequestParam(value = "lang", defaultValue = "en") Locale lang) {
		return demoService.externalAdminLocale(lang);
	}

	@Operation(summary = "[IFA000] external Sample API - adminLoginLogHistory", description = "External 샘플 API 입니다.")
	@GetMapping(value = "/external-admin-history")
	public LoginValidTResponse externalSampleAPICreateAdminHistory(@RequestParam String token) {
		return demoService.externalCreateAdminHistory(token);
	}

	@GetMapping("/oauth2")
	public String hi(PlatformUserInfo platformUserInfo) {
		log.info(platformUserInfo.getUsrUid());
		log.info(platformUserInfo.getLangCode());
		log.info(platformUserInfo.getRoles().get(0));
		return "hi";
	}
}