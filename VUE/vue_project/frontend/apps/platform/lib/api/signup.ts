import { SignUpTermsAgreementType, SignUpType } from '@type/signup/SignUpType'
import { api } from 'library/util'

// 약관 내용 조회 조건
interface TermsDetailParam {
  termsVerNum: string
  langCd: string
}

const baseUrl = '/join'

// --------------------------------GET--------------------------------------------

// 이메일 중복여부, 도메인 등록 여부 체크
export const getEmailStatusInfo = async (email: string) => {
  const { data } = await api.get(`${baseUrl}/user-email?emailId=${email}`)
  return data
}

// 초대 이메일 여부 체크
export const getInviteValid = async (email: string) => {
  let param = { emailId: email }
  const { data } = await api.get(`/external/invite-valid-check`, {
    params: param,
  })
  return data
}

// 약관 목록 조회
export const getTermsListForSignUp = async (email: string, langCd: string) => {
  let param = {
    emailId: email,
    langCode: langCd,
  }

  const { data } = await api.get(`${baseUrl}/agreement-info/list`, {
    params: param,
  })

  return data
}

// 약관 내용 조회 - 성공
export const getTermsDetailForSignup = async (params: TermsDetailParam) => {
  let param = {
    termsVerNum: params.termsVerNum,
    langCd: params.langCd,
  }

  const { data } = await api.get(`${baseUrl}/agreement/detail`, {
    params: param,
  })

  return data
}

export const getTermsLangaugeList = async (terms: string, country: string, version: string) => {
  let param = {
    categoryCd: terms,
    countryGroupId: country,
    version: version,
  }
  const { data } = await api.get(`/account/terms/filter`, {
    params: param,
  })

  return data
}

// --------------------------------POST--------------------------------------------

// 약관 정보 동의 등록 - 성공
export const addAgreemnet = async (list: SignUpTermsAgreementType[]) => {
  const res = await fetch(`${process.env['NEXT_PUBLIC_URL_API_PLATFORM']}${baseUrl}/agreement/add`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(list),
  })
  return res
}

// 회원 정보 등록
export const addUserInfo = async (param: SignUpType) => {
  const res = await fetch(`${process.env['NEXT_PUBLIC_URL_API_PLATFORM']}${baseUrl}/user-signup/add`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(param),
  })

  return res
}
