package com.seegene.main.global.exception;

public class FileStoreException extends RuntimeException {

  public static final String COULD_NOT_SAVE_FILE = "파일을 저장할 수 없습니다.";
  public static final String COULD_NOT_MOVE_FILE = "파일을 이동할 수 없습니다.";
  public static final String COULD_NOT_COPY_FILE = "파일을 복사할 수 없습니다.";
  public static final String COULD_NOT_DOWNLOAD_FILE = "파일을 다운로드 할 수 없습니다.";
  public static final String NOT_SUPPORTED_CONTENT_TYPE = "저장할 수 없는 파일 형식입니다.";
  public static final String MAXIMUM_SIZE_EXCEEDED = "파일 용량을 확인해 주세요.";
  public static final String NOT_FOUND_FILE = "찾을 수 없는 파일입니다.";

  public FileStoreException(String message) {
    super(message);
  }

  public FileStoreException(String message, Throwable cause) {
    super(message, cause);
  }
}
