import { SetStateAction } from 'jotai'
import { Dispatch, useEffect, useRef, useState } from 'react'

/*
  이 영역은 timer를 구현한 곳으로 제한 시간을 주면 내림차순으로 카운트되는 형식의 timer.
  custom hook을 만들어 구현하고자 하였으나 사용하는 곳이 로그인 쪽에만 있어 따로 만들지 않음.
  공통으로 뺄 일이 생기면 custom hook을 만들어 사용할 것.
 */

interface AuthTimerProps {
  activeTimer: boolean
  isActiveTimer: Dispatch<SetStateAction<boolean>>
  isTimeError: Dispatch<SetStateAction<boolean>>
  customTime?: number
}

const defaultTime = 180 // 제한 시간(초 단위)

const AuthTimer = (props: AuthTimerProps) => {
  const { activeTimer, isActiveTimer, isTimeError, customTime } = props
  const countTime = customTime || defaultTime
  const [minute, setMinute] = useState(Math.floor(countTime / 60)) // 분
  const [second, setSecond] = useState(Math.floor(countTime % 60)) // 초
  const [time, setTime] = useState<number>(countTime - 1) // 시간
  const timerId = useRef(null)

  // Timer 작동
  useEffect(() => {
    if (activeTimer) {
      timerId.current = setInterval(() => {
        setMinute(Math.floor(time / 60))
        setSecond(time % 60)
        setTime(time - 1)
      }, 1000)
    } else {
      setTime(countTime - 1)
    }
    return () => {
      clearInterval(timerId.current)
      timerId.current = null
    }
  }, [minute, second, activeTimer, time, setMinute, setTime, setSecond])

  // 제한 시간 초과 시 timer 초기화
  useEffect(() => {
    if (time < 0) {
      isActiveTimer(false)
      isTimeError(true)
      setTime(countTime - 1)
    }
  }, [second, isActiveTimer, minute, time])

  return (
    <>
      {minute.toString().padStart(2, '0')}:{second.toString().padStart(2, '0')}
    </>
  )
}

export default AuthTimer
