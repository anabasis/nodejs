package com.seegene.main.global.util.props;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import com.seegene.main.global.util.s3.constant.Bucket;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Configuration
@ConfigurationProperties(prefix = "s3.bucket")
@Getter
@Setter
@NoArgsConstructor
public class S3BucketProperties {

  private String platform_local="sg-dev-labide-file-s3";
  private String platform_stg="sg-dev-labide-file-s3";
  private String platform_prod="sg-dev-labide-file-s3";

  public String getBucketName(final Bucket bucket) {
    switch (bucket) {
      case PLATFORM_STG:
        return platform_stg;
      case PLATFORM_PROD:
        return platform_prod;
      case PLATFORM_LOCAL:
      default:
        return platform_local;
    }
  }
}
