'use client'

import { EllipsisTypo, Badge, Icons } from '@ui/components'
import { GuideItem } from 'library/type/common'
import { viewPdf } from 'library/util'

interface GuidePopProps {
  onClick: () => void
  guides: GuideItem
}

export const GuidePop = ({ onClick, guides }: GuidePopProps) => (
  <div className="floating_pop">
    <div className="floating_pop_header">
      <div className="align start">
        <p className="title1">Guidelines</p>
        <Badge uiType="solid" color="blue" style="count" size="sm" className="ml_10">
          {guides.guideAttachmentRequestList.length}
        </Badge>
      </div>
      <button onClick={onClick} className="close_btn">
        <Icons.XIcon width={24} height={24} fill={'#C6CDDA'} />
      </button>
    </div>

    <ul className="guide_list mt_20">
      {guides.guideAttachmentRequestList.map((v, i) => (
        <li key={`guides-${i}`} onClick={() => viewPdf(v)}>
          <p className="capH navy300 mb_4">{guides.title}</p>
          <EllipsisTypo className="body1 typo900">{v.displayFileName}</EllipsisTypo>
        </li>
      ))}
    </ul>
  </div>
)
