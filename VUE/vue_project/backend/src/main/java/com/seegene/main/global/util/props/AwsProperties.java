package com.seegene.main.global.util.props;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

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
@ConfigurationProperties(prefix = "aws")
@Getter
@Setter
public class AwsProperties {

	private String prvBucket;
	private String pubBucket;
	private String fromEmail;
	private String accessKeyId;
	private String secretAccessKey;
	private String endPoint;
	private String kmsKeyId;
	private String cfPrvUrl;
	private String cfPubUrl;
}
