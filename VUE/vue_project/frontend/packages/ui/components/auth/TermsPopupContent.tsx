/**
 * 약관 모달의 content
 */

import { PreTypo, SelectChangeEventType, SelectMui } from '@ui/index'
import { createMarkup } from 'library'
import { useEffect, useRef, useState } from 'react'
import styles from '@ui/styles/components/typo/_Typo.module.scss'
type UpdateTermsType = {
  termsCategoryCode: string
  termsVersionId: number
  countryGrpId: string
  termsVersionNum: string
  termsCategoryName: string
  cont: string
  agrYn: string
  essential: string
  langCode: string
  applyDate: string
  langName: string
}[]

interface TermsPopupProps {
  content: UpdateTermsType

  languageSelectList: { name: string; value: string }[]
  children: React.ReactNode
}

const TermsPopupContent = ({ content, languageSelectList, children }: TermsPopupProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [languageContent, setLanguageContent] = useState(content.find((item) => item.langCode === 'en')?.cont)
  const [lanuageValue, setLanuageValue] = useState('en')
  const onChangeLanguageList = (e: SelectChangeEventType) => {
    setLanguageContent(content.find((item) => item.langCode === e.target.value)?.cont)
    setLanuageValue(e.target.value)
  }
  useEffect(() => {
    lanuageValue && scrollRef.current && scrollRef.current.scrollTo(0, 0)
  }, [lanuageValue])
  return (
    <>
      <hr />
      {/* 언어 선택 구역 */}
      <div className="mt_20 align gap_10 start">
        <span className="title2">Language&nbsp;</span>
        <SelectMui options={languageSelectList} onChange={onChangeLanguageList} value={lanuageValue} />
      </div>

      {/* 약관 본문 내용 */}

      <div ref={scrollRef} className={`${styles.pre} h459 ovf_a typo800 body1 mt_30`} dangerouslySetInnerHTML={createMarkup(languageContent || '-')} />

      {/* 버튼 구역 */}
      <div className="align center mt_30">{children}</div>
    </>
  )
}

export default TermsPopupContent
