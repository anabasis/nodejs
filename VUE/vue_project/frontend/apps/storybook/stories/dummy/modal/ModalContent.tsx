import React from 'react'
import { ButtonMui } from 'ui'
type termType = {
  text: string
  essential: boolean
}

type ModalContentType = {
  currentIndex: number
  signUpTerms: termType[]
  setCurrentStep: (type: number) => void
  setUpate: (prev: any) => void
  setCurrentState: (type: string) => void
  getNextStep: () => number
  isNext: () => boolean
}

const ModalContent = ({ currentIndex, signUpTerms, setCurrentStep, setUpate, setCurrentState, getNextStep, isNext }: ModalContentType) => {
  const onChangeModalCheckBoxHandler = (index: number, type) => {
    setCurrentStep(index)
    setCurrentState(type)
    setUpate((prev) => !prev)
  }

  const getButtonComponent = () => {
    const nextStep = getNextStep()
    const lastStep = currentIndex === signUpTerms.length - 1

    if (-1 < nextStep) {
      return (
        <>
          {lastStep && (
            <ButtonMui size="xlarge" type="outlined" onClick={() => onChangeModalCheckBoxHandler(currentIndex, 'disagree')}>
              Disgree
            </ButtonMui>
          )}
          {/* 'Agree And Next' */}
          <ButtonMui size="xlarge" onClick={() => onChangeModalCheckBoxHandler(currentIndex + 1, 'next')}>
            {lastStep ? 'Agree' : isNext() ? 'Agree And Next' : 'Agree'}
          </ButtonMui>
        </>
      )
    }
    return (
      <>
        {lastStep && (
          <ButtonMui size="xlarge" type="outlined" onClick={() => onChangeModalCheckBoxHandler(currentIndex, 'disagree')}>
            Disgree
          </ButtonMui>
        )}
        <ButtonMui size="xlarge" onClick={() => onChangeModalCheckBoxHandler(currentIndex + 1, 'next')}>
          Agree
        </ButtonMui>
      </>
    )
  }

  return (
    <>
      <div className="mt_20">
        <span className="title2">Language&nbsp;</span>
        {/* <SelectMui options={dummyList} /> */}
      </div>
      <p>{signUpTerms[currentIndex].text}</p>
      <div className="align center mt_30">
        <ButtonMui size="xlarge" disabled={currentIndex === 0} type="outlined" onClick={() => onChangeModalCheckBoxHandler(currentIndex, 'prev')}>
          Back
        </ButtonMui>
        {getButtonComponent()}
      </div>
    </>
  )
}
export default ModalContent
