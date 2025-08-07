'use client'

/**
 * 화면: JO 1.1 약관 동의, JO 2.2 약관동의
 * 경로: /signup
 */

import { ModalType, useModal } from 'library/hook/useModal'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TermsPopupHeader from '../popup/TermsPopupHeader'
import TermsPopupBody from '../popup/TermsPopupBody'
import { Checkbox, Icons, Badge } from 'ui'
import { checkListAtom, temrsListAtom, termsAgreementListAtom } from '@store/client/signup'
import { useAtom } from 'jotai'
import { getTermsLangaugeList } from '@api/signup'
import { TermsFilterType } from '@type/signup/SignUpType'

type LanguageListType = {
  name: string
  value: TermsFilterType
}

interface AcceptTermsProps {
  email: string
  isDisabled: Dispatch<SetStateAction<boolean>>
  languageList: LanguageListType[]
  setLanguageList: Dispatch<SetStateAction<LanguageListType[]>>
  desc?: string
}

const AcceptTerms = (props: AcceptTermsProps) => {
  const { email, isDisabled, languageList, setLanguageList } = props // 다음 버튼 활성 여부
  const [update, setUpdate] = useState(false) // 약관 모달에서 버튼 클릭 여부 -> 상태가 변화하면 클릭한 것으로 간주
  const [currentIndex, setCurrentIndex] = useState(-1) // 현재 약관 인덱스

  const [termsList, setTermsList] = useAtom(temrsListAtom) // 약관 조회 목록
  const [checkList, setCheckList] = useAtom(checkListAtom) // 약관 체크 리스트
  const [termsAgreementList, setTermsAgreementList] = useAtom(termsAgreementListAtom)

  // 필수 약관 리스트
  const essentialSignUpList = termsList
    .map((terms, index) => {
      if (terms.essential === 'Y') return index
      return -1
    })
    .filter((item) => item !== -1)

  const { modalOpen, modalClose } = useModal()

  // 노출할 약관 modal 상태의 정보를 선언하는 함수
  const makeModalState = (num: number, essential: string, title: string, termsVersionId: string, termsCategoryCode: string): ModalType => {
    setCurrentIndex(num)

    // 다음 열릴 약관의 인덱스. 없으면 -1. 순차적으로 하기에 현재 약관보다 이전 순번의 약관은 확인하지 않는다.
    let nextIndex = checkList.findIndex((flag: boolean, index: number) => index > num && !flag)

    return {
      deleteKey: num, // modal을 닫게 하기 위한 key
      title: <TermsPopupHeader currentIndex={num} essential={essential} title={title} length={termsList.length} />, // modal의 헤더
      content: (
        <TermsPopupBody
          seegeneEmail={email}
          currentIndex={num}
          nextIndex={nextIndex}
          essential={essential}
          termsVersionId={termsVersionId}
          languageList={languageList.find((item) => item.name === termsCategoryCode).value}
          checkList={checkList}
          setCheckList={setCheckList}
          setUpdate={setUpdate}
        />
      ), // modal의 content
    }
  }

  /**
   * handleCheckList: checkbox 클릭 시 동작하는 함수 - checkbox의 상태에 따라 동작이 다름
   * - 체크되어 있는 경우: 체크 해제
   * - 체크되어 있지 않는 경우: 약관 모달을 띄울 것
   * @param index 클릭한 약관의 인덱스
   */
  const handleCheckList = (index: number, essential: string, title: string, termsVersionId: string, termsCategoryCode: string) => {
    // 체크박스에 이미 체크되어 있으면 해제.
    if (checkList[index]) {
      checkList[index] = false
      setCheckList([...checkList])
      setButtonState()
    }
    // 체크박스가 비어있으면 약관 modal을 띄울 것.
    else {
      modalOpen(makeModalState(index, essential, title, termsVersionId, termsCategoryCode))
    }
  }

  // setButtonState: 필수 약관들이 동의가 되었으면 다음 버튼 활성화시키는 함수
  const setButtonState = () => {
    if (essentialSignUpList.filter((index) => checkList[index]).length === essentialSignUpList.length || essentialSignUpList.length === 0) {
      isDisabled(false)
    }
    // 필수 약관들이 전부 동의가 안 되어 있으면 비활성화
    else isDisabled(true)
  }

  /**
   * handleModal: 약관 모달의 버튼 클릭 시 동작하는 함수. 2가지의 동작.
   * 1. 모달을 닫을 것
   * 2. 다음 순번의 약관들 중 체크가 안 된 약관을 열 것
   */
  const handleModal = () => {
    modalClose(currentIndex) // 모달 닫기

    // 체크 안 된 약관을 찾아 열 것
    let nextIndex = checkList.findIndex((flag: boolean, index: number) => index > currentIndex && !flag)
    if (nextIndex !== -1) {
      let nextTerms = termsList[nextIndex]
      modalOpen(makeModalState(nextIndex, nextTerms.essential, nextTerms.termsCategoryName, nextTerms.termsVersionId, nextTerms.termsCategoryCode))
    }
  }

  // 약관 체크리스트 초기 설정
  useEffect(() => {
    setCheckList(new Array(termsList.length).fill(false))
    let list = new Array(termsList.length).fill({ emailId: email })
    termsList.forEach((item, index) => {
      list[index] = { ...list[index], termsVerNum: Number(item.termsVersionId) }
    })
    setTermsAgreementList(list)
    isDisabled(true)
  }, [termsList, isDisabled])

  // 현재 약관의 인덱스가 마지막이 아닌 경우 다음 약관 modal open
  useEffect(() => {
    if (currentIndex > -1) {
      handleModal()
    }

    setButtonState()
  }, [update, isDisabled])

  // 약관 리스트들에 대한 약관 언어 세팅
  useEffect(() => {
    let param = []
    termsList.forEach((item) => {
      getTermsLangaugeList(item.termsCategoryCode, item.countryGrpId, item.termsVersionNum).then((data) => {
        param.push(data.languageCode)
      })
    })
    setLanguageList(param)
  }, [])

  return (
    <>
      <div className="cont_title_box">
        <p className="title1">Terms</p>
        {/* newco와 HQ desc 다름 */}
        {/* new : In order to link the account to the system, you must agree to the terms below.*/}
        {/* HQ :In order to link the groupware account to the system, you must agree to the terms below.*/}
        <p className="body2 typo500">{props.desc}</p>
      </div>

      {/* 약관 리스트 */}
      <div className="login_terms">
        <ul>
          {termsList.map((data, index: number) => (
            <li className="align" key={index}>
              <Checkbox
                id={data?.termsCategoryCode || '-'}
                labelText={data?.termsCategoryName || '-'}
                labelHide
                onChange={() => handleCheckList(index, data.essential, data.termsCategoryName, data.termsVersionId, data.termsCategoryCode)}
                value={checkList[index]}
              />
              {/* checkbox를 제외한 곳을 클릭할 경우, 약관 modal을 띄울 것 */}
              <button
                className="align"
                onClick={() => modalOpen(makeModalState(index, data.essential, data.termsCategoryName, data.termsVersionId, data.termsCategoryCode))}
              >
                <div className="lft">
                  <Badge uiType="solid" style="round" className="mr_10" color={data.essential === 'Y' ? 'blue' : 'navy50'}>
                    {data.essential === 'Y' ? 'Required' : 'Optional'}
                  </Badge>
                  <span className="body2">I agree to the&nbsp; {checkList[index]}</span>
                  <span className="body3">{data.termsCategoryName}</span>
                </div>

                {/* hover일 경우 약관 보기 텍스트 노출 */}
                <div className="rgt hover_text">
                  View Terms
                  <Icons.AngleIcon width={16} height={16} fill="#8A9DBE" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default AcceptTerms
