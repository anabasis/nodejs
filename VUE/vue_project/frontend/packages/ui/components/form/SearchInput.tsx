// 작업자 : 최유희
// 기획 & 디자인 변경으로 더이상 사용하지 않습니다.

import styles from '@ui/styles/components/form/_input.module.scss'

interface InputProps {
  /**
   *  비활성 상태 표시
   */
  disabled?: boolean

  /**
   *  플레이스홀더 표시
   */
  placeholder?: string
  id?: string
}

export const SearchInput = ({ ...others }: InputProps) => {
  const { disabled, id, placeholder } = others
  return (
    <>
      <div className={[styles['multi_ipt']].join(' ')}>
        <i className={[styles['ico_search']].join(' ')}></i>
        <input className={[styles['ipt_field']].join(' ')} type="text" id={id} placeholder={placeholder} disabled={disabled} />
        <button className={[styles['btn_search']].join(' ')}>Search</button>
      </div>
    </>
  )
}
