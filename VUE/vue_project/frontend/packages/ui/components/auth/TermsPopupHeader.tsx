/**
 * 약관 모달의 header
 */

import { Badge } from '@ui/components'

interface PopupHeaderProps {
  currentIndex: number
  essential: string
  title: string
  length: number
}

const TermsPopupHeader = (props: PopupHeaderProps) => {
  const { currentIndex, essential, title, length } = props

  return (
    <p className="align start">
      {/* 약관이 필수인지 선택인지 */}
      <Badge uiType="solid" style="round" size="md" color={essential === 'Y' ? 'blue' : 'navy50'}>
        {essential === 'Y' ? 'Required' : 'Optional'}
      </Badge>
      {/* 약관의 이름 */}
      <span className="mlr_8">{title}</span>
      {/* 약관의 번호 / 약관의 개수 */}
      <span className="typo500">
        {currentIndex + 1}/{length}
      </span>
    </p>
  )
}

export default TermsPopupHeader
