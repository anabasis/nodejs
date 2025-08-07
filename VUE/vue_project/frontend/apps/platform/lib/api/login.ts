import { api } from 'library/util'

// 문의하기 등록 파라미터
interface SendInquiryParam {
  accountType: string
  inquiryType: string
  inquirySubject: string
  inquiryContent: string
  emailId: string
}

// 인증번호 보내기 파라미터
interface SendCodeToEmailParam {
  emailId: string
  authType?: string // eml: email, sns: sns
  idtfVerfCode: string // IDV01: 휴면회원 복원 인증, IDV02: 탈퇴인증, IDV03: 비밀번호 재설정 인증
}

// 인증번호 검증 파라미터
interface VerifyCodeParam {
  emailId: string
  idtfVerfCode: string // IDV01: 휴면회원 복원 인증, IDV02: 탈퇴인증, IDV03: 비밀번호 재설정 인증
  authKey: string // 인증번호
}

// 비밀번호 재설정 파라미터
interface ModifyPasswordParam {
  emailId: string
  password: string
}

const baseUrl = '/login'

// --------------------------------GET--------------------------------------------

/**
 * getDeactivatedAccount: 해당 휴면 계정의 정보 가져오기 (GET)
 * @param email : 휴면 이메일
 * @returns 유저 uid, 이메일, 최근 접속일, 게정 휴면일
 */
export const getDeactivatedAccount = async (email: string) => {
  let param = {
    emailId: email,
  }
  const { data } = await api.get(`${baseUrl}/inactive-account/user`, {
    params: param,
  })

  return data
}
export const getCorpLanguageCode = async (email: string) => {
  const { data } = await api.get(`${baseUrl}/corp/langCd?emailId=${email}`)
  return data
}

// --------------------------------POST--------------------------------------------

/**
 * activateAccount: 해당 휴면 계정의 휴면 해제(POST)
 */
export const activateAccount = async (params: VerifyCodeParam) => {
  return api.post(`${baseUrl}/inactive-account/verify`, params)
}

/**
 * sendInquriy: 로그인 문의 등록 (POST)
 */
export const sendInquiry = async (params: SendInquiryParam, language: string) => {
  let lang = language.split('-')[0] || 'en'
  const { data } = await api.post(`${baseUrl}/login-inquiry/send?lang=${lang}`, params)
  return data
}

/**
 * sendCodeToEmail: 해당 이메일로 코드 보내기 (POST)
 */
export const sendCodeToEmail = async (params: SendCodeToEmailParam, language: string) => {
  let lang = language.split('-')[0] || 'en'
  if (params.idtfVerfCode === 'IDV01') {
    const { data } = await api.post(`${baseUrl}/inactive-account/${params.emailId}/send?lang=${lang}`)
    return data
  } else if (params.idtfVerfCode === 'IDV03') {
    const { data } = await api.post(`${baseUrl}/find-password/send?lang=${lang}`, params)
    return data
  }
}

/**
 * verifyCode: 인증코드 검증 (POST)
 */
export const verifyCode = async (params: VerifyCodeParam) => {
  const { data } = await api.post(`${baseUrl}/verify-number`, params)
  return data
}

/**
 * modifyPassword: 비밀번호 재설정(POST)
 */
export const modifyPassword = async (params: ModifyPasswordParam) => {
  return await api.post(`${baseUrl}/reset-password/modify`, params)
}
