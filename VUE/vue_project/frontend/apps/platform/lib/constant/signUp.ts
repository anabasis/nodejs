/**
 * 씨젠 회원가입 step
 * title: 주제
 * color: 필수 or 선택 -> label의 색이 달라짐
 * active: (현재 or 이전) step 혹은 아직 안 온 step -> step의 색이 달라짐.
 * complete: 이미 지난 단계인지 아닌지 -> 이미 지난 단계면 step head에 체크 표시, 아니면 숫자 표시
 */
export const SignUpSeegeneHeader = [
  {
    title: 'Terms',
    color: 'primary',
    active: true,
    completed: false,
  },
]

/**
 * newco 초대 회원가입 step
 * title: 주제
 * color: 필수 or 선택 -> label의 색이 달라짐
 * active: (현재 or 이전) step 혹은 아직 안 온 step -> step의 색이 달라짐.
 * complete: 이미 지난 단계인지 아닌지 -> 이미 지난 단계면 step head에 체크 표시, 아니면 숫자 표시
 *
 * 1. 이메일 확인
 * 2. 약관 동의
 * 3. 패스워드 입력
 * 4. 회원 정보 입력
 */
export const SignUpNewCoInviteHeader = [
  {
    title: 'Check Email',
    color: 'primary',
    active: true,
    completed: false,
  },
  {
    title: 'Terms',
    color: 'primary',
    active: false,
    completed: false,
  },
  {
    title: 'Password Setting',
    color: 'primary',
    active: false,
    completed: false,
  },
  {
    title: 'Enter Member Information',
    color: 'primary',
    active: false,
    completed: false,
  },
]

/**
 * newco 직접 회원가입 step
 * title: 주제
 * color: 필수 or 선택 -> label의 색이 달라짐
 * active: (현재 or 이전) step 혹은 아직 안 온 step -> step의 색이 달라짐.
 * complete: 이미 지난 단계인지 아닌지 -> 이미 지난 단계면 step head에 체크 표시, 아니면 숫자 표시
 *
 * 1. 이메일 입력
 * 2. 약관 동의
 * 3. 패스워드 입력
 * 4. 회원 정보 입력
 */
export const SignUpNewCoDirectHeader = [
  {
    title: 'Enter Email',
    color: 'primary',
    active: true,
    completed: false,
  },
  {
    title: 'Terms',
    color: 'primary',
    active: false,
    completed: false,
  },
  {
    title: 'Password Setting',
    color: 'primary',
    active: false,
    completed: false,
  },
  {
    title: 'Enter Member Information',
    color: 'primary',
    active: false,
    completed: false,
  },
]
