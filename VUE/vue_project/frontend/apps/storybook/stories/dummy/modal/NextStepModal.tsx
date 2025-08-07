import ModalContent from './ModalContent'
import { ModalType, useModal } from 'library/hook/useModal'
import React from 'react'
import { useEffect, useState } from 'react'
import { Checkbox, Badge, Icons, LabelTag } from 'ui'
const signUpHeader = [
  {
    title: 'Terms & Conditions',
    color: 'primary',
    active: true,
    completed: false,
  },
]
const signUpTerms = [
  {
    text: 'Information confidentail agreement',
    essential: true,
  },
  {
    text: 'Privacy policy',
    essential: true,
  },
  {
    text: 'Terms of service',
    essential: true,
  },
  {
    text: '쿠키 사용 방침',
    essential: false,
  },
]
const initCheckArray = () => new Array(signUpTerms.length).fill(false)

const NextStpeModal = () => {
  const [disabled, isDisabled] = useState(true) // 다음 단계 버튼 활성화
  const [checkList, setCheckList] = useState(initCheckArray)
  const [update, setUpate] = useState(false)
  const { modalOpen, modalClose } = useModal()
  const [currentStep, setCurrentStep] = useState(-1)
  const [currentState, setCurrentState] = useState('')

  // 다음 스텝 Index 구하는 함수
  const getNextStep = () => checkList.findIndex((checked, i) => currentStep - 1 < i && !checked)
  // 다음 스텝이 있는지 유무를 구하는 함수
  const isNext = () => checkList.filter((isStep, i) => i > currentStep && !isStep).length > 0

  const ModalHeader = (index: number) => {
    return (
      <p className="align start">
        {/* 약관이 필수인지 선택인지 */}
        <Badge uiType="solid" style="round" size="md" color={signUpTerms[index].essential ? 'blue' : 'navy50'}>
          {signUpTerms[index].essential ? '필수' : '선택'}
        </Badge>
        {/* 약관의 이름 */}
        <span className="mlr_8">{signUpTerms[index].text}</span>
        {/* 약관의 번호 / 약관의 개수 */}
        <span className="typo500">
          {index + 1}/{signUpTerms.length}
        </span>
      </p>
    )
  }

  // next 버튼이 실행될때 next 버튼에 대한 핸들러함수
  const nextStepHandler = () => {
    const nextStep = getNextStep()

    // 다음스텝이 없을경우 모달창을 초기화시킨다
    if (nextStep === -1) {
      modalClose()
      return
    }
    // 다음스텝이 있고, 현재 스텝과 다음스텝이 불일치할 경우
    if (0 < nextStep && currentStep !== nextStep) {
      modalClose(Math.max(currentStep - 1, 0))
      const modalState = getModalState(nextStep)
      modalOpen(modalState)
      return
    }
    // 다음스텝이 있고, 현재 스텝과 다음스텝이 일치할 경우 => 일반적인 로직일 경우
    if (0 < nextStep && currentStep === nextStep) {
      modalClose(Math.max(currentStep - 1, 0))
      const modalState = getModalState(currentStep)
      modalOpen(modalState)
      return
    }
  }
  // prev 버튼이 실행될 때 prev버튼에 대한 핸들러 함수
  // 현재 모달창을 닫고 이전 모달창을 오픈한다
  const prevStepHandler = () => {
    modalClose(currentStep)
    const modalState = getModalState(currentStep - 1)
    modalOpen(modalState)
    return
  }
  // 모달창 버튼에대한 핸들러 => 한곳에서 분기처리하여 유지보수가 원활하게 도와주는 함수
  // prev / disagree / next로 분기처리하여 각각에 맞는 함수실행
  const getModalHandler = () => {
    if (currentState === 'prev') {
      prevStepHandler()
      return
    }
    // 미동의 일 경우 체크박스를 다시 해제하는 함수
    if (currentState === 'disagree') {
      setCheckList((prev) => {
        const checked = [...prev]
        checked.splice(currentStep, 1, false)
        return checked
      })
      modalClose()
      return
    }
    // 체크박스가 선택되어 있지않을 경우 체크박스를 변경하는 경우
    if (!checkList[currentStep - 1]) {
      onChangeHandler(currentStep - 1)
    }
    // next 버튼을 누르고, 현재 스텝이 마지막 스텝과 다를경우
    if (currentState === 'next' && currentStep !== signUpTerms.length) {
      nextStepHandler()
      return
    }
    // prev && disagree 제외 next버튼일경우 마지막 스텝일 경우 창을 닫는다
    modalClose(Math.max(currentStep - 1, 0))
  }
  const getModalState = (currentIndex: number) => {
    const modalState: ModalType = {
      deleteKey: currentIndex,
      title: ModalHeader(currentIndex),
      content: ModalContent({ currentIndex, signUpTerms, setCurrentStep, setUpate, setCurrentState, getNextStep, isNext }),
    }
    return modalState
  }
  /*
   */
  const onChangeHandler = (index: number) => {
    setCheckList((prev) => {
      const checked = [...prev]
      checked.splice(index, 1, !checked[index])
      return checked
    })
  }
  const onChange = (currentIndex: number) => {
    if (checkList[currentIndex]) {
      onChangeHandler(currentIndex)
      return
    }
    modalOpen(getModalState(currentIndex))
  }

  useEffect(() => {
    if (currentStep > 0 || currentState) {
      getModalHandler()
    }
  }, [currentState, currentStep, update])
  return (
    <div className="login_terms">
      <ul>
        {signUpTerms.map((data, index: number) => (
          <li className="align" key={index}>
            <Checkbox id={data.text} labelText={data.text} value={checkList[index]} labelHide onChange={() => onChange(index)} />
            <button className="align" onClick={() => modalOpen(getModalState(index))}>
              <div className="lft">
                {/* 현재 선택에 대한 badge는 ㅇ */}
                <Badge uiType="solid" style="round" className="mr_10" color={data.essential ? 'blue' : 'navy50'}>
                  {data.essential ? '필수' : '선택'}
                </Badge>
                <span className="body2">I agree to the&nbsp; {checkList[index]}</span>
                <span className="body3">{data.text}</span>
              </div>
              {/* hover일 경우 약관 보기 텍스트 노출 */}
              <div className="rgt hover_text">
                <span className="body2 typo500">약관 보기 </span>
                <Icons.AngleIcon width={16} height={16} fill="#8A9DBE" />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default NextStpeModal
