// 작업자 : 김수연

import { memo } from 'react'
import { Icons } from '@ui/components/Icons'
import styles from '@ui/styles/components/pagination/_pagination.module.scss'

export const Pagination = memo(
  ({ pages = 5, currPage = 0, onChange = () => {} }: { pages?: number; currPage?: number; onChange?: (page: number) => void }) => {
    return (
      <div className={styles['pagination_wrap']}>
        <button className={styles['prev']}>
          <Icons.AngleIcon fill={'#354165'} />
        </button>

        <ul className={styles['pagination']}>
          {Array.from({ length: pages }, (el: any, index) => {
            return (
              <li key={index} className={currPage === index ? styles.active : ''} onClick={() => onChange(index + 1)}>
                {index + 1}
              </li>
            )
          })}
        </ul>

        {/* disabled */}
        <button className={styles['next']}>
          <Icons.AngleIcon fill={'#E9EBF0'} />
        </button>
      </div>
    )
  },
  (prev, next) => prev.currPage === next.currPage && prev.pages === next.pages
)
