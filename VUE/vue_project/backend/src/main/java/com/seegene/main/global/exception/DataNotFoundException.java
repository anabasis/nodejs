package com.seegene.main.global.exception;

import com.seegene.main.global.constant.ErrorCode;

public class DataNotFoundException extends BusinessException {

  public DataNotFoundException() { super(ErrorCode.NO_SUCH_ENTITY_ERROR); }

  public DataNotFoundException(ErrorCode errorCode) {
    super(errorCode);
  }

  public DataNotFoundException(String message) {
    super(message);
  }

  public DataNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }
}
