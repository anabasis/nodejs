package com.seegene.main.global.util.props;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import com.seegene.main.global.util.s3.constant.Bucket;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Configuration
@ConfigurationProperties(prefix = "s3.end-point")
@Getter
@Setter
@NoArgsConstructor
public class S3EndPointProperties {

  private String platform_local;
  private String platform_stg;
  private String platform_prod;

  public String getEndPoint(final Bucket bucket) {
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
