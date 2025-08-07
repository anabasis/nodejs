import { ButtonMui, ContentBox } from 'ui'
import EnterEmail from './body/EnterEmail'
import CheckEmail from './body/CheckEmail'
import AcceptTerms from './body/AcceptTerms'
import PasswordSetting from './body/PasswordSetting'
import UserInformation from './body/UserInformation'
import { emailRegex } from '@constant/regex'
import { verifyRecaptcha } from '@api/external'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { HeaderType, SignUpType, TermsListType } from '@type/signup/SignUpType'
import { checkListAtom, existedEmailAtom, newCoEmailAtom, passwordAtom, temrsListAtom, termsAgreementListAtom } from '@store/client/signup'
import { useAtom } from 'jotai'
import { AlertType, encodeSHA256, useAlert } from 'library'
import { addAgreemnet, addUserInfo, getEmailStatusInfo, getTermsLangaugeList, getTermsListForSignUp } from '@api/signup'
import { useSearchParams } from 'next/navigation'
import { RecaptchaStdScore } from '@constant/login'

interface SignUpContentProps {
  invite: boolean
  stepContent: HeaderType[]
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
}

const NewCoSignUpContent = (props: SignUpContentProps) => {
  const { invite, stepContent, currentStep, setCurrentStep } = props
  const searchParams = useSearchParams()

  const [recaptchaError, isRecaptchaError] = useState(false)
  const [disabled, isDisabled] = useState(true) // 다음 단계 버튼 활성화 여부
  const [termsLanguageList, setTermsLanguageList] = useState([]) // 약관 언어 리스트

  const [termsList, setTermsList] = useAtom(temrsListAtom) // 약관 조회 목록
  const [email, setEmail] = useAtom(newCoEmailAtom)
  const [password, setPassword] = useAtom(passwordAtom) // password
  const [existedEmail, isExistedEmail] = useAtom(existedEmailAtom) // 이메일 기 가입 여부
  const [checkList, setCheckList] = useAtom(checkListAtom) // 약관 체크리스트
  const [termsAgreementList, setTermsAgreementList] = useAtom(termsAgreementListAtom) // 사용자의 약관 동의 리스트 (DB 저장 형태로)

  const checkEmail = searchParams.get('email')

  // 회원가입 정보. 빈 내용으로 초기화
  const [signUpData, setSignUpData] = useState<SignUpType>({
    emailId: '',
    password: '',
    userName: '',
    organization: '',
    jobTitle: '',
    joinTypeCode: '',
  })

  const { alertOpen, alertClose } = useAlert()

  // handleAlertSuccessButton: 회원가입 성공 alert에서 버튼 클릭 시 동작하는 함수.
  //alert을 닫고 로그인 화면으로 넘어간다.
  const handleAlertSuccessButton = () => {
    resetAtom()
    alertClose()
    window.authKc.doLogin('/')
  }

  // atom 초기화
  const resetAtom = () => {
    setCurrentStep(0)
    setEmail('')
    setPassword('')
    setCheckList([])
    setTermsAgreementList([])
    isExistedEmail(false)
  }

  /**
   * alertSignUpSuccess: 회원가입 성공 alert.
   * 초대가입인지 직접가입인지에 따라 노출되는 내용이 달라진다.
   * alert의 버튼을 클릭하면 로그인 페이지로 이동.
   */
  const alertSignUpSuccess: AlertType = {
    isLogin: true,
    icon: 'success',
    title: invite ? 'Sign up complete' : 'Sign up requested',
    textTitle: invite
      ? 'You can log-in from the main page.'
      : `It takes about one day to process approval. 
      We will notify you via Email about completion of approval.`,
    content: invite ? (
      <div className="align center mt_30">
        <ButtonMui size="xlarge" onClick={() => handleAlertSuccessButton()}>
          Go To Log-in
        </ButtonMui>
      </div>
    ) : (
      <div className="align center mt_30">
        <ButtonMui size="xlarge" onClick={() => handleAlertSuccessButton()}>
          Confirm
        </ButtonMui>
      </div>
    ),
  }

  // alertEmailFail: 이메일 오류 alert. 이메일이 아니거나 등록된 도메인이 아닌 경우 노출. alert 버튼을 클릭하면 닫는다.
  const alertInvalidEmailAlert: AlertType = {
    icon: 'warning',
    title: 'Invalid domain address',
    textTitle: `Domain is not valid. 
    Please double check Email address.`,
    content: (
      <div className="align center mt_30">
        <ButtonMui size="xlarge" onClick={() => alertClose()}>
          Confirm
        </ButtonMui>
      </div>
    ),
  }

  const { executeRecaptcha } = useGoogleReCaptcha()
  /**
   * handlePrevious: 이전 버튼을 클릭 시 일어나는 동작을 정의하는 함수.
   * 1. 현재 step에 있던 정보들 초기화.
   * 2. 만약 현재 step이 첫번째인 경우, 로그인 패이지로 이동
   * 3. 현재 step이 첫번쨰가 아닌 경우, 이전 step으로 이동하고 현재 step head는 비활성화, 이전 step head의 완료 처리는 해제
   */
  const handlePrevious = () => {
    // 현재 step의 정보들 초기화
    switch (currentStep) {
      case 2: {
        setCheckList([])
        setPassword('')
      }
      case 3:
        setPassword('')
        setSignUpData({ ...signUpData, userName: '', organization: '', jobTitle: '' })
    }

    // 현재 step이 첫번째인 경우, 로그인 페이지로 이동
    if (currentStep === 0) {
      window.authKc.doLogin('/')
    }

    // 현재 step이 첫번쨰가 아닌 경우, 이전 step으로 이동. stepper의 상태도 변화.
    else {
      isDisabled(true)
      setCurrentStep(currentStep - 1)
      stepContent[currentStep].active = false
      stepContent[currentStep - 1].completed = false
    }
  }

  /**
   * handleNext: 다음 버튼을 클릭하면 일어나는 동작을 정의하는 함수. 조건에 따라 동작이 다르다.
   * - 직접 가입의 이메일 입력 화면일 경우: 도메인 체크 API. 만약 에러일 경우, 이메일 실패 alert
   * - 마지막 step일 경우: 회원가입 형태에 따른 API 호출 후 성공하면 alert을 노출. -> 로그인 화면으로 이동.
   * - 마지막 step이 아닌 경우: 다음 step으로 이동하고 현재 step head는 완료 처리, 다음 step head는 활성화
   */
  const handleNext = () => {
    if (currentStep === stepContent.length - 1) {
      addUserInfo({ ...signUpData, emailId: email, joinTypeCode: invite ? 'IVT' : 'SLF', password: encodeSHA256(password) }).then(() => {
        let list = termsAgreementList
        checkList.forEach((item, index) => {
          list[index] = { ...list[index], emailId: email, agrYn: item ? 'Y' : 'N' }
        })
        setTermsAgreementList(list)
        addAgreemnet(termsAgreementList).then((res) => {
          if (res.ok) {
            sessionStorage.setItem('firstLogin', 'true')
            alertOpen(alertSignUpSuccess)
          } else {
            alert(`error code [${res.status}] \n ${res.statusText}`)
          }
        })
      })
    } else if (currentStep === 0 && !invite) {
      setEmail(email)
      // 이메일 형식 체크. 실패 시 alert 호출
      if (!emailRegex.test(email)) {
        alertOpen(alertInvalidEmailAlert)
        return
      }

      // recaptcha 토큰 발급
      executeRecaptcha().then((token) => {
        // recaptcha 토큰 검증
        verifyRecaptcha(token)
          .then((res) => {
            if (res.score <= RecaptchaStdScore) {
              isRecaptchaError(true)
              return
            }
            // 해당 이메일 가입 가능 여부
            getEmailStatusInfo(email)
              .then((res) => {
                isRecaptchaError(false)
                // 활성화된 도메인이 아니거나 없는 경우
                if (res.statusCode === 202155) {
                  alertOpen(alertInvalidEmailAlert)
                  return
                }
                // 이미 있는 사용자인 경우
                else if (res.statusCode === 202113) {
                  isExistedEmail(true)
                  return
                }
                isExistedEmail(false)
                isDisabled(true)
                setCurrentStep(currentStep + 1)
                stepContent[currentStep].completed = true
                stepContent[currentStep + 1].active = true
              })
              .catch(() => {
                isExistedEmail(true)
              })
          })
          .catch(() => {
            isRecaptchaError(true)
          })
          .catch(() => {
            isRecaptchaError(true)
          })
      })
    } else if (currentStep === 0 && invite) {
      setEmail(checkEmail)
      isDisabled(true)
      setCurrentStep(currentStep + 1)
      stepContent[currentStep].completed = true
      stepContent[currentStep + 1].active = true
    } else {
      isDisabled(true)
      setCurrentStep(currentStep + 1)
      stepContent[currentStep].completed = true
      stepContent[currentStep + 1].active = true
    }
  }
  /**
   * getContent: 현재 step(currentStep)과 초대 가입인지(invite), seegene회원인지(seegene) 세 가지의 조건으로 인하여 어떠한 component를 부를 것인지 결정.
   * - seegene: 약관 동의
   * - newco 직접 가입: 이메일 입력 - 약관 동의 - 패스워드 입력 - 회원 정보 입력
   * - newco 초대 가입: 이메일 확인 - 약관 동의 - 패스워드 입력 - 회원 정보 입력
   * @returns step에 해당하는 component
   */
  const getContent = () => {
    switch (currentStep) {
      case 0: {
        if (invite) {
          // 이메일 확인 - newco 초대 가입 회원에만 1번째 노출
          return <CheckEmail email={checkEmail} isDisabled={isDisabled} />
        } else {
          // 이메일 입력 - newco 직접 가입 회원에만 1번째 노출
          return <EnterEmail isDisabled={isDisabled} recaptchaError={recaptchaError} />
        }
      }
      case 1:
        // 약관 동의
        return (
          <AcceptTerms
            isDisabled={isDisabled}
            email={email}
            languageList={termsLanguageList}
            setLanguageList={setTermsLanguageList}
            desc=" In order to link the account to the system, you must agree to the terms below."
          />
        )
      case 2:
        // 패스워드 입력
        return <PasswordSetting isDisabled={isDisabled} />
      case 3:
        // 회원 개인 정보
        return <UserInformation data={signUpData} setData={setSignUpData} isDisabled={isDisabled} />
    }
  }

  // 약관 동의 단계 시 약관 리스트 및 약관 언어 리스트 조회
  useEffect(() => {
    if (currentStep === 1) {
      getTermsListForSignUp(email, 'en').then((res) => {
        setTermsList(res)
        let param = []
        res.forEach((item: TermsListType) => {
          getTermsLangaugeList(item.termsCategoryCode, item.countryGrpId, item.termsVersionNum)
            .then((data) => {
              param.push({ name: item.termsCategoryCode, value: data[0] })
            })
            .then(() => setTermsLanguageList(param))
        })
      })
    }
  }, [currentStep])

  useEffect(() => {
    history.pushState(null, null, location.href)
    addEventListener('popstate', handlePrevious)

    return () => {
      removeEventListener('popstate', handlePrevious)
    }
  }, [])

  return (
    <ContentBox>
      {/* 컨텐츠 부분 */}
      {getContent()}
      <div className="cont_bottom_box">
        <div className="align">
          {/* 버튼 부분 */}
          <ButtonMui type="outlined" size="xlarge" onClick={() => handlePrevious()}>
            {/* newco 초대가입 회원은 check mail로 가고 Cancel 문구가 노출 */}
            {invite && currentStep == 0 ? 'Cancel' : 'Previous'}
          </ButtonMui>
          <ButtonMui type="contained" size="xlarge" disabled={disabled} onClick={() => handleNext()}>
            {/* 마지막 단계는 Request Sign Up 문구 노출 */}
            {currentStep == stepContent.length - 1 ? 'Request Sign Up' : 'Next'}
          </ButtonMui>
        </div>
      </div>
    </ContentBox>
  )
}

export default NewCoSignUpContent
