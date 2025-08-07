package com.seegene.main.global.exception;

import com.seegene.main.global.constant.ErrorCode;

public class TokenExpiredException extends BusinessException {

  public TokenExpiredException(ErrorCode errorCode) {
    super(errorCode, errorCode.getDefaultMessage());
  }

  public TokenExpiredException(String message) {
    super(message);
  }

  public TokenExpiredException(String message, Throwable cause) {
    super(message, cause);
  }
}
