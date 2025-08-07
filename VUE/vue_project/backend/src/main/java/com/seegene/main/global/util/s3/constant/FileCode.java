package com.seegene.main.global.util.s3.constant;


public enum FileCode {
  PLATFORM_FILE(
      "파일업로드",
      "test/{{name}}.{{extension}}"
  );

  private final String description;
  private final String s3Path;

  FileCode(String description, String s3Path) {
    this.description = description;
    this.s3Path = s3Path;
  }

  public String getDescription() {
    return description;
  }

  public String getS3Path() {
    return s3Path;
  }
}
