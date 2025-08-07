'use client'
import { Badge } from '@ui/components/labels/Badge'
import { StatusLabel } from '@ui/components/labels/StatusLabel'
import { Icons } from '@ui/components/Icons'
import { ButtonMui } from '@ui/index'
import { useMosueHoverCopy } from 'library'

interface DetailHeaderType {
  postNumber?: number
  badgeTitle: string[]
  badgeStatus?: 'nor' | 'done' | 'ongoing' | 'pause'
  isRight?: boolean
  status: string
}

export const DetailHeader = ({ postNumber, badgeTitle, badgeStatus, status, isRight = true }: DetailHeaderType) => {
  const { handleMouseEnter, handleMouseLeave, isHovering, handleCopyClipBoard } = useMosueHoverCopy()

  const fill = isHovering ? '#3357ff' : '#354165'

  return (
    <div className="align">
      <div className="lft gap_10">
        {postNumber && <p className="caption navy400 bold600">No. {postNumber}</p>}
        {badgeTitle && badgeTitle.map((title, index) => <Badge key={index}>{title}</Badge>)}
        <StatusLabel className="body2" status={badgeStatus}>
          {status}
        </StatusLabel>
      </div>
      {/* 오른쪽에 컨포넌트 존재시 해당 태그 사용 */}
      {isRight && (
        <div className="rgt">
          <ButtonMui type="text" size="small">
            <Icons.CopyUrlIcon width={16} height={16} fill={fill} />
            <span onClick={() => handleCopyClipBoard()} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              Copy URL
            </span>
          </ButtonMui>
        </div>
      )}
    </div>
  )
}

export default DetailHeader
