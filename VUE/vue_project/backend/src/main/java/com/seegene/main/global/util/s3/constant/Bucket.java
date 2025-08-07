package com.seegene.main.global.util.s3.constant;

import com.seegene.main.global.constant.WorkCode;

public enum Bucket {
  PLATFORM_LOCAL("sg-dev-labide-file-s3"),
  PLATFORM_STG("sg-dev-labide-file-s3"),
  PLATFORM_PROD("sg-dev-labide-file-s3");

  private final String name;

  Bucket(String name) {
    this.name = name;
  }

  public static String getBucketCode(Bucket bucket) {
    switch (bucket) {
      case PLATFORM_LOCAL:
        return PLATFORM_LOCAL.name;
      case PLATFORM_STG:
        return PLATFORM_STG.name;
      case PLATFORM_PROD:
        return PLATFORM_PROD.name;
    }
    return PLATFORM_LOCAL.name;
  }
}