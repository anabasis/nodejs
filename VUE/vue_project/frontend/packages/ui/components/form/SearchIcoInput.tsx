// 작업자 : 최유희

import styles from '@ui/styles/components/form/_input.module.scss'
import { Icons } from '@ui/components/Icons'
import { HTMLInputTypeAttribute } from 'react'

interface InputProps {
  /**
   *  비활성 상태 표시
   */
  disabled?: boolean
  children?: React.ReactNode
  /**
   *  플레이스홀더 표시
   */
  placeholder?: string
  /**
   * className : 글로벌 클래스만 받습니다
   */
  className?: string
  /*
   * uiType : 커스텀 UI 스타일
   */
  uiType?: 'no_line' | 'addSelect' | undefined
  /*
   * uiType : 커스텀 UI 스타일
   */
  inputType?: HTMLInputTypeAttribute
  id?: string
  width?: number
  value?: string
  name?: string
  min?: number
  //style?: string
  onChangeSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onSearchClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  clearValue?: Function
  searchDisabled?: boolean
}

export const SearchIcoInput = ({ onSearch, onChangeSearch, onSearchClick, ...others }: InputProps) => {
  const { disabled, id, placeholder, width, value, className, uiType, children, name, inputType, min, clearValue, searchDisabled } = others
  const fill = searchDisabled ? !searchDisabled : value !== ''

  return (
    <div style={{ minWidth: width }} className={`${styles.multi_ipt} ${uiType ? styles[uiType] : ''} ${className}`}>
      {/* [isc] select 결합된 검색일 시 사용 */}
      {uiType == 'addSelect' && <div className={styles.multi_ipt_inner}>{children}</div>}
      <input
        className={styles.ipt_field}
        type={inputType ? inputType : 'text'}
        id={id}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChangeSearch}
        onKeyUp={onSearch}
        value={value}
        min={min}
      />
      {/* 클리어버튼 확정시 추가 */}
      {clearValue && (value || '').length > 0 && (
        <button className={styles.ico_clear_btn} onClick={() => clearValue()}>
          <Icons.XIcon width={18} height={18} fill="#fff" />
        </button>
      )}
      <button className={styles.ico_search_btn} onClick={onSearchClick} disabled={searchDisabled}>
        <Icons.SearchIcon width={22} height={22} fill={fill ? 'var(--navy800)' : 'var(--navy100)'} />
      </button>
    </div>
  )
}
