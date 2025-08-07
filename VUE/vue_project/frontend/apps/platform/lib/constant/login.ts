import { ToastType } from 'library'

// IDV01: 휴면회원 복원 인증, IDV02: 탈퇴인증, IDV03: 비밀번호 재설정 인증
export const idtfVerfCodeList = ['IDV01', 'IDV02', 'IDV03']

// 로그인_비밀번호 재설정 step
export const PasswordResetStepper = [
  {
    title: 'Email Authentification',
    active: true,
    completed: false,
  },
  {
    title: 'Set New Password',
    active: false,
    completed: false,
  },
]

// 휴면계정 해제 step
export const AccountDeactivatedStepper = [
  {
    title: 'Deactivated Account Information',
    active: true,
    completed: false,
  },
  {
    title: 'Authentification',
    active: false,
    completed: false,
  },
]

// 인증번호 관련 toast Popup 정보
export const SendCodeToastList: ToastType[] = [
  // 인증번호 전송 성공
  {
    autoHideDuration: 3000,
    icon: 'success',
    content: 'Authentification code has been send.',
  },
  // 인증번호 재전송 성공
  {
    autoHideDuration: 3000,
    icon: 'success',
    content: 'Authentification code has been re-send.',
  },
  // 인증번호 검증 횟수 초과
  {
    autoHideDuration: 3000,
    icon: 'error',
    content: 'Authentication code transmissions has been exceeded. Please refresh or log in again.',
  },
]

// 문의하기 유형에 관한 select의 옵션들
export const InquriySelectOption = [
  { name: 'Log-in', value: 'Log-in' },
  { name: 'Sign up', value: 'Sign up' },
  { name: 'OTP authentification', value: 'OTP authentification' },
  { name: 'Etc.', value: 'Etc.' },
]

// 문의하기 전용 이메일
export const InquriyEmail = 'isp@seegene.com'

export const RecaptchaStdScore = 0.5
