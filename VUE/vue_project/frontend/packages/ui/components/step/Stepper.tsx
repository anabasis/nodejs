// 작업자 : 김병기
// 수정자 : 김수연

import React from 'react'
import Steps from '@ui/components/step/Steps'
import styles from '@ui/styles/components/step/_stepper.module.scss'

interface StepperProps {
  color?: 'primary' | 'secondary'
  uiType?: 'ver' | 'hor'
  current: number
  data: { component: React.ReactNode; title: string }[]
}

export const Stepper = ({ color, uiType = 'hor', current, data }: StepperProps) => {
  return (
    <>
      <div className={`${styles.stepper} ${uiType === 'ver' ? styles.vertical : styles.horizontal}`}>
        {data.map((item, index) => (
          <Steps color={color} current={current} title={item.title} index={index + 1} uiType={uiType} key={item.title}>
            {uiType === 'ver' && current === index + 1 && <div className={`${styles.body} flex1`}>{item.component}</div>}
          </Steps>
        ))}
      </div>
      {/* 가로버전 */}
      {uiType === 'hor' && (
        <>
          {data.map((item, index) =>
            current === index + 1 ? (
              <div className={`${styles.body}`} key={item.title}>
                {item.component}
              </div>
            ) : null
          )}
        </>
      )}
    </>
  )
}

export default Stepper
