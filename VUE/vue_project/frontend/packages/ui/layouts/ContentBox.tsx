'use client'
import { useState, useRef, useEffect } from 'react'
import styles from '@ui/styles/common/_contentbox.module.scss'
import { Icons } from '@ui/components/Icons'

interface ContentboxProps {
  children?: React.ReactNode
  type?: 'top_content' | 'dashboard' | 'dashboard_home' | 'login' | 'auto'
  className?: string
}

export const ContentBox = ({ ...others }: ContentboxProps) => {
  const { children, type, className } = others

  const divRef = useRef<HTMLDivElement>(null)
  const [expand, setExpand] = useState(true)

  const onClickExpand = () => {
    setExpand((prevExpand) => !prevExpand)
  }

  useEffect(() => {
    if (divRef.current && type === 'top_content') {
      if (divRef.current.classList.contains('active')) {
        // 263 -> 247
        document.documentElement.style.setProperty('--contentbox-height', 232 + 'px') //264가 정상수치
      } else {
        document.documentElement.style.setProperty('--contentbox-height', 151 + 'px') //183가 정상수치
      }
    }
  }, [expand, type])

  return (
    <div
      className={`${styles.content} isc ${type === 'top_content' ? 'top_content' : ''} ${type ? `${styles[type]} wrap_toggle` : ''} ${className || ''} ${
        expand ? 'active' : 'ptb_15'
      } rtl`}
      ref={divRef}
    >
      {type === 'top_content' && (
        <button onClick={onClickExpand} className={`btn folding ${styles.folding}`}>
          <i className={`ico_angle  ${expand ? '' : 'right'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21" fill="none">
              <path d="M15 12L10 7L5 12" stroke="#354165" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </i>
        </button>
      )}
      {type === 'top_content' ? <>{children}</> : <div className={styles.inner}>{children}</div>}
    </div>
  )
}
