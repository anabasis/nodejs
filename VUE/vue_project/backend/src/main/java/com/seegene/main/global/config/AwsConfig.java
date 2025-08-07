package com.seegene.main.global.config;

import java.net.URI;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.seegene.main.global.util.props.AwsProperties;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.kms.KmsClient;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.ses.SesClient;

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
 *   1 2023-06-12        khhong        최초작성
 * </PRE>
 */
@Configuration
@RequiredArgsConstructor
public class AwsConfig {

	@Bean(name = "awsCredentialsProvider")
	@Profile("local")
	public AwsCredentialsProvider localAwsCredentialsProvider(AwsProperties awsProperties) {
		return StaticCredentialsProvider.create(AwsBasicCredentials.create(awsProperties.getAccessKeyId(), awsProperties.getSecretAccessKey()));
	}

	@Bean(name = "awsCredentialsProvider")
	@Profile("!local")
	public AwsCredentialsProvider awsCredentialsProvider() {
		return DefaultCredentialsProvider.create();
	}

	@Bean
	public S3Presigner s3Presigner(AwsCredentialsProvider awsCredentialsProvider, AwsProperties awsProperties) {
		return S3Presigner.builder().region(Region.AP_NORTHEAST_2).credentialsProvider(awsCredentialsProvider).endpointOverride(URI.create(awsProperties.getEndPoint())).build();
	}

	@Bean
	public S3Client s3Client(AwsCredentialsProvider awsCredentialsProvider) {
		return S3Client.builder().region(Region.AP_NORTHEAST_2).credentialsProvider(awsCredentialsProvider).build();
	}

	@Bean
	public SesClient sesClient(AwsCredentialsProvider awsCredentialsProvider) {
		return SesClient.builder().region(Region.AP_NORTHEAST_2).credentialsProvider(awsCredentialsProvider).build();
	}

	@Bean
	public KmsClient kmsClient(AwsCredentialsProvider awsCredentialsProvider) {
		return KmsClient.builder().region(Region.AP_NORTHEAST_2).credentialsProvider(awsCredentialsProvider).build();
	}
}
