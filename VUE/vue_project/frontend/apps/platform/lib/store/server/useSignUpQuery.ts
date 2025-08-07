import { getTermsDetailForSignup } from '@api/signup'
import { useQuery } from '@tanstack/react-query'
import { TermsDetailType } from '@type/signup/SignUpType'

/* ------------useQuery--------------- */

// 약관 내용 조회
export const useTermsDetailForSignUp = ({ termsVerNum, langCd }) => {
  const response = useQuery<TermsDetailType>(['termsDetailForSignUp', termsVerNum, langCd], () => getTermsDetailForSignup({ termsVerNum, langCd }), {})
  if (response.isSuccess) {
    return response.data
  }
  return {
    termsConditNum: '0',
    termsVerNum: '0',
    langCd: 'en',
    cont: ' ',
  }
}
