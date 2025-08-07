import styles from '@ui/styles/components/step/_stepper.module.scss'
import { Icons } from '@ui/components/Icons'

interface StepProps {
  children?: React.ReactNode
  color?: 'primary' | 'secondary'
  title?: string
  current?: number
  completed?: boolean // current와 index로 처리가능하고 문제없을시 삭제
  active?: boolean // current와 index로 처리가능하고 문제없을시 삭제
  index?: number
  uiType?: 'hor' | 'ver'
  size?: 'sm' | 'md'
}

export const Steps = ({ children, ...other }: StepProps) => {
  const { color, current, title, index, uiType = 'hor', completed, active, size = 'sm' } = other
  // size 초기값 설정 제거
  const iconWidth = uiType === 'ver' ? 20 : 14
  const iconHeight = uiType === 'ver' ? 14 : 10 // iconHeight 수정

  const isCompleted = (current !== undefined && index !== undefined && current > index) || completed
  const isActive = (current !== undefined && index !== undefined && current === index) || active

  return (
    <div
      className={`${styles.step} ${styles[color || 'primary']} ${isCompleted ? styles.completed : ''} ${isActive ? styles.active : ''} ${
        uiType === 'ver' ? styles.vertical : styles.horizontal
      }`}
    >
      <dl>
        <dt>{isCompleted ? <Icons.CompletedIcon width={iconWidth} height={iconHeight} /> : index}</dt>
        <dd>
          <p className={styles.title}>{title}</p>
          {children}
        </dd>
      </dl>
    </div>
  )
}

export default Steps
