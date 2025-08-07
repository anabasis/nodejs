package com.seegene.main.global.exception;

import com.seegene.main.global.constant.ErrorCode;

public class InvalidStateException extends BusinessException {

  public InvalidStateException(ErrorCode errorCode) {
    super(errorCode);
  }

  public InvalidStateException(String message) {
    super(message);
  }

  public InvalidStateException(String message, Throwable cause) {
    super(message, cause);
  }
}
