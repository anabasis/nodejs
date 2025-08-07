// 작업자 : 김병기

import { useState } from 'react'
import Step from '@ui/components/step/Steps'
import styles from '@ui/styles/components/step/_stepper.module.scss'

interface StepperProps {
  children?: React.ReactNode
  /**
   * 스텝 색상 설정
   * (추가시에 css설정 추가 필요)
   */
  color?: 'primary' | 'secondary'

  data?: any[]
}

export const HeaderStepper = ({ children, ...others }: StepperProps) => {
  const { data, color } = others
  // const [completed, setCompleted] = useState(false)
  return (
    <div>
      <div className={[styles['stepper'], styles['header']].join(' ')}>
        {data &&
          data.map((stepslist, index) => (
            <Step
              uiType="hor"
              key={(stepslist.id, index)}
              title={stepslist.title}
              color={color}
              completed={stepslist.completed}
              active={stepslist.active}
              index={index + 1}
            ></Step>
          ))}
      </div>
      {children}
    </div>
  )
}
