'use client'

/**
 * seegene 회원가입 화면
 */

import { addAgreemnet, addUserInfo, getInviteValid, getTermsLangaugeList, getTermsListForSignUp } from '@api/signup'
import AcceptTerms from '@components/signup/body/AcceptTerms'
import { SignUpSeegeneHeader } from '@constant/signUp'
import { checkListAtom, temrsListAtom, termsAgreementListAtom } from '@store/client/signup'
import { TermsListType } from '@type/signup/SignUpType'
import { useAtom } from 'jotai'
import { AlertType, useAlert } from 'library/hook/useAlert'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ButtonMui, ContentBox, HeaderStepper, Icons, LoginLayout } from 'ui'

const SignUp = () => {
  const searchParams = useSearchParams()
  const invite = searchParams.get('invite') === 'true' // 초대 가입 or 직접 가입.
  const email = searchParams.get('email') // 이메일
  const stepContent = SignUpSeegeneHeader // steppper 내용. (Seegene, Newco), (초대 가입, 직접 가입) 기준으로 stepper 내용이 달라짐. constant/signup에 해당 내용 있음.

  const [disabled, isDisabled] = useState(true) // 다음 단계 버튼 활성화 여부
  const [termsLanguageList, setTermsLanguageList] = useState([]) // 약관 언어 리스트

  const [termsList, setTermsList] = useAtom(temrsListAtom) // 약관 조회 목록
  const [checkList, setCheckList] = useAtom(checkListAtom) // 약관 체크리스트 ()
  const [termsAgreementList, setTermsAgreementList] = useAtom(termsAgreementListAtom) // 사용자의 약관 동의 리스트 (DB 저장 형태로)
  const [isNewbie, setIsNewbie] = useState(false)

  const route = useRouter()

  const { alertOpen, alertClose } = useAlert()

  // handleAlertSuccessButton: 회원가입 성공 alert에서 버튼 클릭 시 동작하는 함수.
  //alert을 닫고 로그인 화면으로 넘어간다.
  const handleAlertSuccessButton = () => {
    alertClose()
    window.authKc.doLogout('/')
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

  /**
   * getContent: 현재 step(currentStep)과 초대 가입인지(invite), seegene회원인지(seegene) 세 가지의 조건으로 인하여 어떠한 component를 부를 것인지 결정.
   * - seegene: 약관 동의
   * - newco 직접 가입: 이메일 입력 - 약관 동의 - 패스워드 입력 - 회원 정보 입력
   * - newco 초대 가입: 이메일 확인 - 약관 동의 - 패스워드 입력 - 회원 정보 입력
   * @returns step에 해당하는 component
   */
  const getContent = () => {
    return (
      <AcceptTerms
        isDisabled={isDisabled}
        email={email}
        languageList={termsLanguageList}
        setLanguageList={setTermsLanguageList}
        desc="In order to link the groupware account to the system, you must agree to the terms below."
      />
    ) // seegene 회원은 약관 동의가 첫번쨰이자 마지막 내용이다.
  }

  /**
   * handlePrevious: 이전 버튼을 클릭 시 일어나는 동작을 정의하는 함수.
   * 1. 현재 step에 있던 정보들 초기화.
   * 2. 만약 현재 step이 첫번째인 경우, 로그인 패이지로 이동
   * 3. 현재 step이 첫번쨰가 아닌 경우, 이전 step으로 이동하고 현재 step head는 비활성화, 이전 step head의 완료 처리는 해제
   */
  const handlePrevious = () => {
    window.authKc.doLogout('/')
    // 현재 step이 첫번쨰가 아닌 경우, 이전 step으로 이동. stepper의 상태도 변화.
  }

  /**
   * handleNext: 다음 버튼을 클릭하면 일어나는 동작을 정의하는 함수. 조건에 따라 동작이 다르다.
   * - 직접 가입의 이메일 입력 화면일 경우: 도메인 체크 API. 만약 에러일 경우, 이메일 실패 alert
   * - 마지막 step일 경우: 회원가입 형태에 따른 API 호출 후 성공하면 alert을 노출. -> 로그인 화면으로 이동.
   * - 마지막 step이 아닌 경우: 다음 step으로 이동하고 현재 step head는 완료 처리, 다음 step head는 활성화
   */
  const handleNext = () => {
    let param = {
      emailId: email,
      password: 'fake',
      userName: window.authKc.getPToken()?.family_name || ' ',
      organization: '',
      jobTitle: '',
      joinTypeCode: invite ? 'IVT' : 'SLF',
    }

    // 개인정보 저장 API
    addUserInfo(param).then(() => {
      let list = termsAgreementList
      checkList.forEach((item, index) => {
        list[index] = { ...list[index], agrYn: item ? 'Y' : 'N', emailId: email }
      })
      setTermsAgreementList(list)
      // 약관 동의 리스트 저장 API
      addAgreemnet(termsAgreementList).then((res) => {
        if (res.ok) {
          sessionStorage.setItem('firstLogin', 'true')
          alertOpen(alertSignUpSuccess)
        } else {
          alert(`error code [${res.status}] \n ${res.statusText}`)
        }
      })
    })
  }

  // 회원가입을 위한 약관 정보와 약관 언어 리스트 조회
  useEffect(() => {
    history.pushState(null, null, location.href)
    addEventListener('popstate', handlePrevious)

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

    return () => {
      removeEventListener('popstate', handlePrevious)
    }
  }, [])

  // 초대 링크를 타고 온 경우, 유효한 메일인지 확인하기 위함.
  useEffect(() => {
    if (invite) {
      getInviteValid(email)
        .then((res) => {
          if (res.isJoin || !res.isInvite) {
            window.authKc.doLogin('/')
          } else {
            setIsNewbie(true)
          }
        })
        .catch(() => {
          route.push('/error/404')
        })
    } else {
      setIsNewbie(true)
    }
  }, [])

  return (
    <LoginLayout>
      {!!isNewbie ? (
        <>
          {/* 헤더 부분 */}
          <ContentBox type="auto">
            <div className="align start mb_20">
              <Icons.LoginLogo width={357} height={40} fill="#657496" />
              <h1 className="headline1 ml_16">Sign Up</h1>
            </div>
            <HeaderStepper color="primary" data={stepContent} />
          </ContentBox>
          <ContentBox>
            {/* 컨텐츠 부분 */}
            {getContent()}
            <div className="cont_bottom_box">
              <div className="align">
                {/* 버튼 부분 */}
                <ButtonMui type="outlined" size="xlarge" onClick={() => handlePrevious()}>
                  Previous
                </ButtonMui>
                <ButtonMui type="contained" size="xlarge" disabled={disabled} onClick={() => handleNext()}>
                  Request Sign Up
                </ButtonMui>
              </div>
            </div>
          </ContentBox>
        </>
      ) : null}
    </LoginLayout>
  )
}

// 버튼을 해당 page에 작성. handlePrevious를 두고 step에 따라 data 안의 property를 초기화하는 방향으로 할 것.
export default SignUp
