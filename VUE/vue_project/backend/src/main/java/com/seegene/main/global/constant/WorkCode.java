package com.seegene.main.global.constant;

/** 사용코드 */
public enum WorkCode {

  // 재직상태 코드
  WORKING("working"),   // 재직
  LEAVE("leave"),   // 휴직
  RETIREMENT("retirement"),   // 퇴직

  // about certificate Select
  ALL("all"),
  APPLY("apply"),
  COMPLETE("complete"),
  FAILED("failed"),

  // about Hide Code TYPE
  // HYPEN
  HYPEN("-"),
  // SLASH
  SLASH("/"),
  // ERROR
  ERROR("ERROR"),
  // ZERO
  ZERO("0");

  private String code;

  WorkCode(String code) {
    this.code = code;
  }

  public static String getWorkCode(WorkCode workCode) {
    switch (workCode) {
      case WORKING:
        return WORKING.code;
      case LEAVE:
        return LEAVE.code;
      case RETIREMENT:
        return RETIREMENT.code;
      case HYPEN:
        return HYPEN.code;
      case SLASH:
        return SLASH.code;
      case ALL:
        return ALL.code;
      case APPLY:
        return APPLY.code;
      case COMPLETE:
        return COMPLETE.code;
      case FAILED:
        return FAILED.code;
      case ZERO:
        return ZERO.code;
    }
    return ERROR.code;
  }
}
