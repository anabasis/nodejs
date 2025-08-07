package com.seegene.main.global.exception;

import com.seegene.main.global.constant.ErrorCode;

public class InvalidValueException extends BusinessException {

  public InvalidValueException(ErrorCode errorCode) {
    super(errorCode);
  }

  public InvalidValueException(String message) {
    super(message);
  }

  public InvalidValueException(String message, Throwable cause) {
    super(message, cause);
  }
}
