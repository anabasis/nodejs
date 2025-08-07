'use client'

/**
 * 계정 상태에 따른 alert 창 분기. 미완
 * 정상 회원인 경우 CompleteLogin component 활성화
 */

import { useAlert, AlertType, useModal, ModalType, api } from 'library'
import { ButtonMui } from '@ui/index'
import TermsPopupHeader from '@ui/components/auth//TermsPopupHeader'
import TermsPopupContent from '@ui/components/auth//TermsPopupContent'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TypeUserInfo } from './WrapAuth'
import { getRootUrl } from 'library'
import { mapKeys, orderBy } from 'lodash-es'

type UpdateTermsType = {
  termsCategoryCode: string
  termsVersionId: number
  countryGrpId: string
  termsVersionNum: string
  termsCategoryName: string
  cont: string
  agrYn: string
  essential: string
  langCode: string
  applyDate: string
  langName: string
}
type AuthStatus = 'NRM' | 'JNN' | 'APW' | 'RJT' | 'WDR' | 'DMT' | 'RNV' | 'EMPTY'

const AuthCheck = ({ userInfo }: { userInfo: TypeUserInfo }) => {
  const { userStatusCode, corpStsCd, emailId, denyReasonCode, corporateName } = userInfo
  const { alertOpen } = useAlert()
  const { modalOpen, modalClose, modalAllClose } = useModal()
  const [updateTermsData, setUpdateTermsData] = useState<UpdateTermsType[]>([])
  const route = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  /**
   * ApprovalInProgressAlert: 가입 승인 진행 중
   */
  const ApprovalInProgressAlert: AlertType = {
    title: 'Approval in progress',
    isLogin: true,
    maxWidth: 's',
    textTitle: `We will notify you via email about sign up status.
    If you have any questions, please use 'Inquiry'.`,
    content: (
      <div className="align center mt_30">
        <ButtonMui type="outlined" size="xlarge" onClick={() => route.replace('/login/inquiry')}>
          Inquiry
        </ButtonMui>
        <ButtonMui size="xlarge" onClick={() => window.authKc.doLogout('/')}>
          OK
        </ButtonMui>
      </div>
    ),
  }

  /**
   * ApprovalDeniedAlert: 가입 승인 거절
   */
  const ApprovalDeniedAlert: AlertType = {
    icon: 'warning',
    isLogin: true,
    title: 'Approval denied',
    textTitle: `Approval was denied for '${
      denyReasonCode === 'UNC' ? 'User job unclear' : 'Unfit for role'
    }'.\n If you wish to re-approval, please use 'Inquiry'.`,
    content: (
      <div className="align center mt_30">
        <ButtonMui type="outlined" size="xlarge" onClick={() => route.replace('/login/inquiry')}>
          Inquiry
        </ButtonMui>
        <ButtonMui size="xlarge" onClick={() => window.authKc.doLogout('/')}>
          OK
        </ButtonMui>
      </div>
    ),
  }

  /**
   * MemberNotFoundAlert: 회원 정보 없음
   */
  const MemberNotFoundAlert: AlertType = {
    icon: 'info',
    isLogin: true,
    title: 'Member information not found',
    textTitle: `Login information is incorrect.
    Please check Email or password again`,
    content: (
      <div className="align center mt_30">
        <ButtonMui size="xlarge" onClick={() => window.authKc.doLogout('/')}>
          OK
        </ButtonMui>
      </div>
    ),
  }

  /**
   * CorporateDisabledAlert: 기업 비활성화
   */
  const CorporateDisabledAlert: AlertType = {
    icon: 'info',
    isLogin: true,
    title: 'Service is unavailable',
    textTitle: `${corporateName || 'Unknown'} has been transitioned to an inactive condition.
    If you have any questions, please click 'Inquiry'.`,
    content: (
      <div className="align center mt_30">
        <ButtonMui type="outlined" size="xlarge" onClick={() => route.replace('/login/inquiry')}>
          Inquiry
        </ButtonMui>
        <ButtonMui size="xlarge" onClick={() => window.authKc.doLogout('/')}>
          OK
        </ButtonMui>
      </div>
    ),
  }

  /* 약관 데이터 sort함수 - sortList순서대로 약관데이터 순서 정렬 */
  const getSortTermsData = (termsData: UpdateTermsType[]) => {
    const sortList = ['TM01', 'TM02', 'TM03']

    const termsSortRes = orderBy(termsData, (item) => {
      const index = sortList.indexOf(item.termsCategoryCode)
      // sortList에 없는 항목은 맨 뒤로 보냄
      return index === -1 ? Infinity : index
    })
    /* TM01, TM02, TM03에 해당하는 데이터끼리만 묶어서 이차 배열로 만드는 로직 */
    const groupedByCode = termsSortRes?.reduce((acc, item) => {
      const code = item.termsCategoryCode
      if (!acc[code]) {
        acc[code] = []
      }
      acc[code].push(item)
      return acc
    }, {} as { [key in string]: UpdateTermsType[] })
    return Object.values(groupedByCode)
  }

  const getTermsContentInfo = (termsData: UpdateTermsType[]) => {
    const termTitleInfo: { [key in string]: string } = {
      TM01: 'Confidential information agreement',
      TM02: 'Privacy policy',
      TM03: 'Terms of service',
    }

    const termsSortData = getSortTermsData(termsData)

    const termsLanguageList = termsSortData[currentStep]?.map(({ langCode, langName, ...rest }) =>
      mapKeys({ langCode, langName }, (_, key) => (key === 'langCode' ? 'value' : key === 'langName' ? 'name' : key))
    ) as { name: string; value: string }[]

    return {
      termsLanguageList,
      termsSortData,
      termsTitle: termTitleInfo[termsSortData[currentStep][0]?.termsCategoryCode],
      termsContent: termsSortData[currentStep],
    }
  }
  const agreeTerms = async (termsVerNum: number, termsSortData: UpdateTermsType[][]) => {
    const parmas = [
      {
        termsVerNum,
        agrYn: 'Y',
      },
    ]
    try {
      await api.post('/login/terms/agreement/add', parmas)
      if (termsSortData.length <= currentStep + 1) {
        /* 최종 save 로직 */
        window.authKc.updateToken()
        window.authKc.doLogin()
      } else {
        setCurrentStep((prev) => prev + 1)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const termsUpdateModalHandler = (currentIndex: number, termsData = updateTermsData) => {
    const { termsLanguageList, termsTitle, termsContent, termsSortData } = getTermsContentInfo(termsData)
    if (!termsContent) return

    const modalState: ModalType = {
      title: <TermsPopupHeader essential="Y" currentIndex={currentIndex} length={termsSortData?.length} title={termsTitle} />,
      textTitle: `Terms have changed. After review please click 'Agree' button.`,
      deleteKey: currentIndex,
      maxWidth: 'm',
      isAllClose: true,
      content: (
        <>
          <TermsPopupContent content={termsContent} key={currentIndex} languageSelectList={termsLanguageList}>
            {/* 버튼 구역 */}
            <div className="align center mt_30">
              <ButtonMui size="xlarge" onClick={() => agreeTerms(termsContent?.[0].termsVersionId, termsSortData)}>
                {currentStep + 1 === termsSortData.length ? 'Agree' : 'Agree And Next'}
              </ButtonMui>
            </div>
          </TermsPopupContent>
        </>
      ),
    }
    modalOpen(modalState)
  }

  const nextStepHandler = (currentStep: number) => {
    modalClose(currentStep - 1)
    termsUpdateModalHandler(currentStep)
  }

  const checkAnotherStatus = () => {
    if (corpStsCd !== 'ACT') return alertOpen(CorporateDisabledAlert)
    return alertOpen(MemberNotFoundAlert)
  }

  const reInvitation = () => {
    if (emailId.split('@')[1] !== 'seegene.com') {
      route.replace(`${getRootUrl()}/signup/newco/?invite=true&email=${emailId}`)
      return
    }
    route.replace(`${getRootUrl()}/signup/seegene/?invite=true&email=${emailId}`)
  }

  const empty = () => {
    if (emailId.split('@')[1] !== 'seegene.com') {
      route.replace(getRootUrl())
      return
    }
    route.replace(`${getRootUrl()}/signup/seegene/?email=${emailId}`)
  }

  const initTermsUpdateApi = async (): Promise<void> => {
    try {
      const { data }: { data: UpdateTermsType[] } = await api.get('/login/terms-no-agr/list')
      if (data) {
        setUpdateTermsData(data)
        getTermsContentInfo(data)
        termsUpdateModalHandler(0, data)
        return
      }
    } catch (error) {
      console.error(error)
    } finally {
      window.pageLoading({ show: false })
    }
  }

  const checkAuthStatusRendering = (): void | Promise<void> | string => {
    const authStatusActions: Record<AuthStatus, () => void | Promise<void> | string> = {
      NRM: () => initTermsUpdateApi(), // 정상 && 약관 업데이트가 필요한경우
      JNN: () => route.replace(`${getRootUrl()}/signup/seegene/?email=${emailId}`), // AD 직접가입
      APW: () => alertOpen(ApprovalInProgressAlert), // 가입 승인
      RJT: () => alertOpen(ApprovalDeniedAlert), // 가입 거절
      WDR: () => alertOpen(MemberNotFoundAlert), // 탈퇴 회원
      DMT: () => route.replace('/login/account-deactivated'), // 휴먼
      RNV: () => reInvitation(), // 재초대
      EMPTY: () => empty(), // 회원 아님 (Seegene 약관으로 이동)
    }

    const action = authStatusActions?.[userStatusCode as AuthStatus]

    if (action) {
      action()
      window.pageLoading({ show: false })
    } else {
      checkAnotherStatus()
      window.pageLoading({ show: false })
    }
  }

  useEffect(() => {
    /* 약관 업데이트시 onClickOutside 로직 */
    if (modalAllClose) {
      window.authKc.doLogout('/')
    }
  }, [modalAllClose])

  useEffect(() => {
    /* 인증 상태에 따른 랜더링 */
    /* 기업 비활성화의 경우 userStatusCode === '' */
    if (userStatusCode || userStatusCode === '') {
      checkAuthStatusRendering()
    }
  }, [userStatusCode])

  useEffect(() => {
    /* 약관 업데이트 팝업 -> 다음 팝업으로 가는 핸들러 */
    if (currentStep > 0) {
      nextStepHandler(currentStep)
    }
  }, [currentStep])

  return null
}

export default AuthCheck
