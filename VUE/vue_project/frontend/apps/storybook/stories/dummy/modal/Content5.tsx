import React, { useState } from 'react'
import { BaseInput, ButtonMui } from 'ui'

export const Content7 = ({ setCurrentIndex, setUpdate }: { setCurrentIndex?; setUpdate }) => {
  const [value, setValue] = useState('')
  const back = () => {
    setUpdate((prev) => !prev)
    setCurrentIndex((prev) => prev - 1)
  }
  return (
    <>
      <ButtonMui size="xlarge" onClick={() => back()}>
        Back
      </ButtonMui>
      <BaseInput onChange={(e) => setValue(e.target.value)} />
    </>
  )
}

export const Content6 = ({ setCurrentIndex, setUpdate }: { setCurrentIndex?; setUpdate }) => {
  const [value, setValue] = useState('')
  const back = () => {
    setUpdate((prev) => !prev)
    setCurrentIndex((prev) => prev - 1)
  }
  return (
    <>
      <BaseInput onChange={(e) => setValue(e.target.value)} />
      <ButtonMui size="xlarge" onClick={() => back()}>
        Back
      </ButtonMui>
      <ButtonMui size="xlarge" onClick={() => setCurrentIndex((prev) => prev + 1)}>
        Next
      </ButtonMui>
    </>
  )
}

export const Content5 = ({ setCurrentIndex }: { setCurrentIndex? }) => {
  const [value, setValue] = useState('')

  return (
    <>
      <BaseInput onChange={(e) => setValue(e.target.value)} />
      <ButtonMui size="xlarge" onClick={() => setCurrentIndex((prev) => prev + 1)}>
        Next
      </ButtonMui>
    </>
  )
}
