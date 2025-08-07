package com.seegene.main.global.exception;

import com.seegene.main.global.constant.ErrorCode;

public class KeycloakAuthenticationException extends BusinessException {

  public KeycloakAuthenticationException(ErrorCode errorCode) {
    super(errorCode, errorCode.getDefaultMessage());
  }

  public KeycloakAuthenticationException(String message) {
    super(message);
  }

  public KeycloakAuthenticationException(String message, Throwable cause) {
    super(message, cause);
  }
}
