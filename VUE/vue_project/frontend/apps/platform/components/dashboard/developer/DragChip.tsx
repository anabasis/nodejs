import { forwardRef, memo } from 'react'
import { Icons } from 'ui/components/Icons'
import type { DraggableSyntheticListeners } from '@dnd-kit/core'
import styles from 'ui/styles/components/labels/_label.module.scss'

interface ChipProps {
  children?: React.ReactNode
  className?: string // 예외 케이스 글로벌로 규정
  dragging?: boolean
  onClick?: () => void
  handleProps?: any
  listeners?: DraggableSyntheticListeners
  style?: React.CSSProperties
}

// export const DragChip2 = ({ children, drag, ...others }: ChipProps) => {
//   const { className, onClick } = others

//   return (
//     <div
//       ref={(ref) => provided.innerRef(ref)}
//       className={`${styles.drag_chip} ${drag ? styles.drag : ''} ${!!className ? `${className}` : ``}`}
//       {...provided.draggableProps}
//     >
//       <div className={styles.move} {...provided.dragHandleProps}>
//         드래그영역
//       </div>
//       <div className={`ellipsis ${styles.name}`}>{children}</div>
//       <button className={`${styles.delete_btn}`} onClick={onClick}>
//         <Icons.XIcon fill="var(--bg-f)" />
//       </button>
//     </div>
//   )
// }

export const DragChip = memo(
  forwardRef<HTMLDivElement, ChipProps>(({ children, dragging, className, onClick, handleProps, listeners, style }, ref) => {
    return (
      <div ref={ref} style={{ ...style }}>
        <div className={`${styles.drag_chip} ${dragging ? styles.drag : ''} ${!!className ? `${className}` : ``}`}>
          <div className={styles.move} {...handleProps} {...listeners}>
            드래그영역
          </div>
          <div className={`ellipsis ${styles.name}`}>{children}</div>
          <button className={`${styles.delete_btn}`} onClick={onClick}>
            <Icons.XIcon fill="var(--bg-f)" />
          </button>
        </div>
      </div>
    )
  })
)
