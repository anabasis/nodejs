package com.seegene.main.global.constant;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum ErrorCode {

  /* 400000 ~ 400999 Business Error */
  NO_SUCH_ENTITY_ERROR(400000, "존재하지 않는 엔티티 오류"),
  NO_SUCH_USR_ROLE_NUM_ERROR(400001, "존재하지 않는 사용자 역할 번호 오류"),
  NO_SUCH_USR_UUID_ERROR(400002, "존재하지 않는 사용자 UUID 오류"),
  NO_SUCH_CORP_NUM_ERROR(400003, "존재하지 않는 기업 번호 오류"),
  NO_SUCH_3DAYS_ERROR(400004, "메일발송일로부터 3일 이내 발송 불가"),
  TERNS_VERSION_ERROR(400005,"약관 버전은 기존 버전 보다 낮거나 같을 수 없습니다."),
  NO_SUCH_ADM_ROLE_NUM_ERROR(400006, "존재하지 않는 어드민 역할 번호 오류"),
  NO_SUCH_USR_ROLE_REQ_NUM_ERROR(400007, "존재하지 않는 사용자 역할 번호 오류"),
  NO_SUCH_CODE_ERROR(400008, "존재하지 않는 코드입력 오류"),
  NO_SUCH_GNB_ERROR(400009, "GNB 데이터 오류"),
  NO_SUCH_LNB_ERROR(400010, "LNB 데이터 오류"),
  NO_SUCH_MENU_LOCATION_ERROR(400011, "메뉴 구분 입력 오류"),
  NO_SUCH_MENU_TYPE_ERROR(400012, "메뉴 분류 입력 오류"),
  NO_SUCH_MENU_MLG_ERROR(400013, "메뉴 다언어 데이터 오류"),
  NO_SUCH_MENU_ICON_ERROR(400014, "메뉴 아이콘 데이터 오류"),
  NO_SUCH_MENU_POSITION_ERROR(400015, "메뉴 포지션 데이터 오류"),
  NO_SUCH_MENU_ROLE_ERROR(400016, "메뉴 역할 데이터 오류"),
  NO_SUCH_NOTICE_NUM_ERROR(400017, "존재하지 않는 공지사항 번호 오류"),
  NO_SUCH_NOTICE_TYPE_ERROR(400018, "존재하지 않는 공지사항 타입 오류"),
  NO_SUCH_NOTICE_EXPOSURE_TYPE_ERROR(400019, "공지사항 노출 코드 오류"),
  NO_SUCH_NOTICE_EXPOSURE_PERIOD_TYPE_ERROR(400020, "공지사항 노출 기간 코드 오류"),
  NO_SUCH_NOTICE_EXPOSURE_FREQUENCY_CODE_ERROR(400021, "공지사항 노출 빈도 코드 오류"),
  NO_SUCH_NOTICE_OPEN_LEVEL_CODE_ERROR(400022, "공지사항 공개 레벨 코드 오류"),
  NO_SUCH_NOTICE_CATEGORY_CODE_ERROR(400023, "공지사항 카테고리 코드 오류"),
  VALIDATE_DOMAIN_ERROR(400024, "잘못된 도메인 주소"),
  NOT_ACCESS_USER_ERROR(400025, "허용되지 않은 사용자 오류"),
  NO_SUCH_USER_ERROR(400026, "존재하지 않는 유저 오류"),
  NO_SUCH_USER_CORP_NUM_ERROR(400027, "존재하지 않는 유저 회사 정보 오류"),
  NO_SUCH_NOTICE_MULTI_ERROR(400028, "잘못된 공지사항 다언어 데이터 오류"),
  NO_SUCH_NOTICE_FILE_ERROR(400029, "잘못된 공지사항 파일 데이터 오류"),
  NO_SUCH_PROJECT_DOCUMENT_TYPE_ERROR(400030, "잘못된 문서 타입 오류"),
  NO_SUCH_PROJECT_PLANNING_DOCUMENT_ERROR(400031, "존재하지 않는 플래닝 문서 번호 오류"),
  NO_SUCH_CAP_FILM_NUM_ERROR(400032, "존재하지 않는 CAP/FILM 번호 오류"),
  NO_SUCH_PLATE_NUM_ERROR(400033, "존재하지 않는 PLATE 번호 오류"),
  NO_SUCH_ENABLE_YN_ERROR(400034, "존재하지 않는 ENABLE_YN 오류"),
  NO_SUCH_NOTIFICATION_NUM_ERROR(400035, "존재하지 않는 알림 번호 오류"),
  NO_SUCH_PROJECT_PROCESS_ERROR(400036, "존재하지 않는 프로젝트 프로세스 오류"),
  NO_SUCH_PROJECT_PROCESS_STATUS_ERROR(400037, "존재하지 않는 프로젝트 프로세스 상태 오류"),
  NO_SUCH_CODE_GROUP_ID_ERROR(400038, "존재하지 않는 코드 그룹 아이디 오류"),
  NO_SUCH_CODE_GROUP_ID_AND_DISS_CODE_ERROR(400039, "존재하지 않는 코드 그룹 아이디 또는 질병 코드 오류"),
  NO_SUCH_CODE_GROUP_ID_AND_PURPOSE_CODE_ERROR(400040, "존재하지 않는 코드 그룹 아이디 또는 목적 코드 오류"),
  NO_SUCH_CODE_GROUP_ID_AND_PROJECT_STATUS_CODE_ERROR(400041, "존재하지 않는 코드 그룹 아이디 또는 프로젝트 상태 코드 오류"),
  NO_SUCH_CENTURY_CODE_ERROR(400042, "존재하지 않는 국가 코드 오류"),
  NO_SUCH_NOTIFICATION_MESSAGE_ERROR(400043, "존재하지 않는 알림 언어 메시지 오류"),
  NO_SUCH_TOOL_TAB_ERROR(400044, "존재하지 않는 툴 검색 탭 오류"),
  NO_SUCH_TOOL_NUMBER_ERROR(400045, "존재하지 않는 툴 오류"),
  NO_SUCH_TOOL_ORDER_ERROR(400046, "잘못된 툴 순서 오류"),
  NO_SUCH_TOOL_FILE_ERROR(400047, "잘못된 툴 파일 오류"),
  NO_SUCH_NOTIFICATION_NUM(400048, "알림 템플릿 번호가 존재하지 않습니다."),
  TERMS_DATA_NOT_EXIST(400049, "약관 동의 정보가 존재하지 않습니다."),
  NO_SUCH_FILE_ERROR(400050, "존재하지 않는 파일 오류"),
  NO_SUCH_PROJECT_DOCUMENT_ERROR(400051, "존재하지 않는 프로젝트 문서 번호 오류"),
  NO_SUCH_PROJECT_ID_ERROR(400052, "존재하지 않는 프로젝트 아이디 오류"),
  NO_SUCH_PROJECT_MEMBER_ERROR(400053, "존재하지 않는 프로젝트 멤버 오류"),
  NO_SUCH_PROJECT_PROCESS_MEMBER_ERROR(400054, "존재하지 않는 프로젝트 프로세스의 멤버 오류"),
  NO_SUCH_PROJECT_PRODUCT_TYPE_ERROR(400055, "존재하지 않는 프로젝트 프로덕트 타입 오류"),
  NO_SUCH_PROJECT_DATA_TYPE_ERROR(400056, "존재하지 않는 프로젝트 데이터 타입 오류"),
  DUPLICATE_FILE_ERROR(400057, "중복되는 파일 오류"),
  NO_SUCH_LIB_OPEN_LEVEL_CODE_ERROR(400058, "자료실 리스트 상세 조회 권한이 없습니다."),
  DOCUMENT_MODIFICATION_NOT_ALLOWED(400059, "허용되지 않은 프로세스 문서의 편집 오류"),
  DOCUMENT_MODIFICATION_MATCH_ERROR(400060, "매칭되지않는 파일 아이디와 프로세스 번호 오류"),
  NO_SUCH_PROJECT_STATUS_ERROR(400061, "존재하지 않는 프로젝트 상태 오류"),
  DUPLICATE_PROJECT_PROCESS_ERROR(400062, "중복되는 프로젝트 프로세스 상태 오류"),
  NO_SUCH_PROJECT_FILE_TYPE_ERROR(400063, "존재하지 않는 프로젝트 파일 타입 오류"),
  NO_SUCH_PROJECT_FILE_STATUS_ERROR(400064, "존재하지 않는 프로젝트 파일 상태 오류"),
  PROJECT_MANAGER_ERROR(400065, "프로젝트 관리자인 경우 회원탈퇴가 불가합니다."),

  CORP_NOT_ACTIVE_ERROR(400068, "해당 도메인 기업의 상태가 활성화 되어 있지 않습니다."),

  EXPIRE_AUTHKEY_ERROR(400098, "인증번호가 잘못되었거나 만료되었습니다."),
  INPUT_VALUE_CHECK(400099, "입력값을 확인해주세요"),
  USER_APPROVAL_DENIEND_ERROR(400100, "가입승인이 거절 되었습니다."),
  USER_EXISTS_IN_PLATFORM(400101, "이미 존재하는 사용자입니다."),
  EXISTS_ON_GOING_PROCESS(400102, "진행중인 프로세스가 존재합니다."),
  NO_SUCH_PROJECT_PROCESS_ROLE_INFO(400105, "존재하지 않는 프로젝트 정보입니다."),
  VALIDATE_EMAIL_REGEX(400400, "이메일 형식오류입니다."),
  ENUM_VALUE_ERROR(400401, "존재하지 않는 코드 값입니다."),

  SEND_ALARM_NOT(500001, "알림발송을 하지 않습니다."),
  SEND_ALARM_REJECT(500002, "알림발송을 거절한 사용자입니다"),
  TOKEN_VALUE_ERROR(999992, "토큰 값이 누락되었습니다."),
  SYSTEM_EXPIRATION_ERROR(999993, "Keycloak 토큰이 만료되었습니다."),
  SYSTEM_AUTHENTICATION_ERROR(999994, "Keycloak 토큰 인증오류입니다."),
  ENTITY_DELETION_ERROR(999995, "데이터 삭제에 실패하였습니다."),
  ENTITY_SAVE_ERROR(999996, "데이터 저장에 실패하였습니다."),
  ENTITY_EXISTS_ERROR(999997, "이패미 존재하는 데이터입니다."),
  INTERNAL_API_ERROR(999998, "내부 API 호출 에러입니다."),
  EXTERNAL_API_ERROR(999999, "외부 API 호출 에러입니다.");

  private final int code;
  private final String defaultMessage;

  ErrorCode(int code, String defaultMessage) {
    this.code = code;
    this.defaultMessage = defaultMessage;
  }
}
