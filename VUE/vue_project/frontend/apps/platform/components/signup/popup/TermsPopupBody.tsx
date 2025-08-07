/**
 * 약관 모달의 content
 */

import { getCorpLanguageCode } from '@api/login'
import { findCorpDomain } from '@store/client/login'
import { newCoEmailAtom } from '@store/client/signup'
import { useTermsDetailForSignUp } from '@store/server/useSignUpQuery'
import { TermsFilterType } from '@type/signup/SignUpType'
import { useAtom } from 'jotai'
import { createMarkup } from 'library'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ButtonMui, PreTypo, SelectMui } from 'ui'

interface TermsPopupProps {
  seegeneEmail: string
  currentIndex: number
  nextIndex: number
  essential: string
  termsVersionId: string
  languageList: TermsFilterType
  checkList: boolean[]
  setCheckList: Dispatch<SetStateAction<boolean[]>>
  setUpdate: Dispatch<SetStateAction<boolean>>
}

// dangerous html, slash

const TermsPopupBody = (props: TermsPopupProps) => {
  const { seegeneEmail, currentIndex, nextIndex, essential, termsVersionId, languageList, checkList, setCheckList, setUpdate } = props
  const [language, setLanguage] = useState('en')
  const [email, setEmail] = useAtom(newCoEmailAtom)

  const newcoDomain = findCorpDomain(email)
  const seegeneDomain = findCorpDomain(seegeneEmail)

  useEffect(() => {
    //기업 도메인의 언어 확인 (약관 언어 변경을 위함)
    const targetDomain = seegeneDomain === '@seegene.com' ? seegeneDomain : newcoDomain

    getCorpLanguageCode(targetDomain).then((res) => {
      setLanguage(res.languageCode)
    })
  }, [])

  /**
   * handleMoveAndClose: 버튼 동작 정의
   * @param checked: 약관의 동의여부
   */
  const handleMoveAndClose = (checked: boolean) => {
    checkList[currentIndex] = checked // 체크리스트에 저장
    setCheckList([...checkList])
    setUpdate((prev) => !prev) // 버튼을 클릭하였으므로 다음 약관을 체크하기 위한 트리거
    // setLanguage('en')
  }

  const data = useTermsDetailForSignUp({
    termsVerNum: termsVersionId,
    langCd: language,
  })

  const languageSelectList = languageList.languageCode.map((item) => ({ name: item.nativeName, value: item.languageCode }))

  /**
   * getButtonCase: 버튼은 조건에 따라서 동작과 문구가 달라진다.
   *
   * 공통적인 매커니즘은 다음과 같다.
   * - 약관을 탐색할 때에는 현재 약관보다 이전 순서의 약관은 고려하지 않는다.
   * - 다음 약관이 이미 체크되어 있으면 스킵한다.
   *
   * 분기 기준:
   * - 필수 or 선택
   * - 체크 안 된 약관 중 마지막 약관인가
   *
   * 1. 필수, 마지막 약관 X:  버튼(1개) - 'Agree And Next'(클릭 시 체크박스에 체크하고 다음 모달을 노출할 것)
   * 2. 필수, 마지막 약관:    버튼(1개) - 'Agree'(클릭 시 체크박스에 체크하고 모달을 닫을 것)
   * 3. 선택, 마지막 약관 X:  버튼(2개) - 'Disagree And Next'(클릭 시 체크박스를 해제하고 다음 모달을 노출할 것), 'Agree And Next'(클릭 시 체크박스에 체크하고 다음 모달을 노출할 것)
   * 4. 선택, 마지막 약관:    버튼(2개) - 'Disagree'(클릭 시 체크박스를 해제하고 모달을 닫을 것), 'Agree'(클릭 시 체크박스에 체크하고 모달을 닫을 것)
   */
  const getButtonCase = () => {
    // 1번 케이스
    if (essential === 'Y' && nextIndex !== -1) {
      return (
        <ButtonMui size="xlarge" onClick={() => handleMoveAndClose(true)}>
          Agree And Next
        </ButtonMui>
      )
    }
    // 2번 케이스
    else if (essential === 'Y' && nextIndex === -1) {
      return (
        <ButtonMui size="xlarge" onClick={() => handleMoveAndClose(true)}>
          Agree
        </ButtonMui>
      )
    }
    // 3번 케이스
    else if (essential === 'N' && nextIndex !== -1) {
      return (
        <>
          <ButtonMui size="xlarge" type="outlined" onClick={() => handleMoveAndClose(false)}>
            Disagree And Next
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => handleMoveAndClose(true)}>
            Agree And Next
          </ButtonMui>
        </>
      )
    }
    // 4번 케이스
    else {
      return (
        <>
          <ButtonMui size="xlarge" type="outlined" onClick={() => handleMoveAndClose(false)}>
            Disagree
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => handleMoveAndClose(true)}>
            Agree
          </ButtonMui>
        </>
      )
    }
  }

  return (
    <>
      <hr />
      {/* 언어 선택 구역 */}
      <div className="mt_20 align gap_10 start">
        <span className="title2">Language&nbsp;</span>
        <SelectMui options={languageSelectList} onChange={(event) => setLanguage(event.target.value)} defaultValue={'en'} value={language} />
      </div>

      {/* 약관 본문 내용 */}
      <PreTypo className="h459 ovf_a typo800 body1 mt_30">
        <div dangerouslySetInnerHTML={createMarkup(data?.cont || '-')} />
      </PreTypo>

      {/* 버튼 구역 */}
      <div className="align center mt_30">{getButtonCase()}</div>
    </>
  )
}

export default TermsPopupBody
