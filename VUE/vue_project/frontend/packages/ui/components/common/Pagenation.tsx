import { Icons } from '@ui/components/Icons'
import styles from '@ui/styles/components/pagination/_pagination.module.scss'
import getPageRangeList from 'library/util/pagenation'

interface PaginationProps {
  currentPage: number
  totalCount: number
  pageSize?: number
  onPageChange: (page: number) => void
  siblingCount?: number
  totalPage?: number
}

export const Pagenation = ({ currentPage = 0, totalPage, totalCount, siblingCount = 2, pageSize = 10, onPageChange }: PaginationProps) => {
  const DOTS = '...'

  const paginationRange = getPageRangeList({
    page: currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })
  const visualPage = currentPage + 1
  const lastPage = paginationRange[paginationRange.length - 1]

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  if (!totalCount || (totalPage && totalPage <= currentPage)) return

  return (
    <div className={styles['pagination_wrap']}>
      <button disabled={0 === currentPage} className={styles['start']} onClick={() => onPageChange(0)}>
        <Icons.DoubleAngleIcon fill={1 === visualPage ? 'var(--navy50)' : 'var(--navy300)'} />
      </button>
      <button className={styles['prev']} onClick={onPrevious} disabled={0 === currentPage}>
        <Icons.AngleIcon fill={1 === visualPage ? 'var(--navy50)' : 'var(--navy300)'} />
      </button>

      <ul className={styles['pagination']}>
        {paginationRange.map((pageNumber, idx) => {
          if (pageNumber === DOTS) {
            return (
              <li key={idx} className="pagination-item dots">
                &#8230;
              </li>
            )
          }
          if (typeof pageNumber === 'number') {
            return (
              <li
                key={idx}
                className={visualPage === pageNumber ? styles.active : ''}
                onClick={() => {
                  onPageChange(pageNumber - 1)
                }}
              >
                {pageNumber}
              </li>
            )
          }
        })}
      </ul>

      <button className={styles['next']} onClick={onNext} disabled={visualPage === lastPage}>
        <Icons.AngleIcon fill={visualPage === lastPage ? 'var(--navy50)' : 'var(--navy300)'} />
      </button>
      <button className={styles['end']} onClick={() => onPageChange(+lastPage - 1)} disabled={visualPage === lastPage}>
        <Icons.DoubleAngleIcon fill={visualPage === lastPage ? 'var(--navy50)' : 'var(--navy300)'} />
      </button>
    </div>
  )
}
export default Pagenation
