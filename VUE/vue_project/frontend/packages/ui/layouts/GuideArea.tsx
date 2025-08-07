//작업자 : 김수연

import { Icons } from '@ui/components'
import { useEffect, useState } from 'react'
import { GuidePop } from '@ui/layouts'
import { PopoverMui } from '@ui/mui'
import { GuideItem } from 'library/type/common'
import { viewPdf } from 'library/util'
import { useSetAtom } from 'jotai'
import { hasGuideFloatingAtom } from 'library/store/client/guideState'
export const GuideArea = ({ guides }: { guides: GuideItem }) => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const setHasGuideFloating = useSetAtom(hasGuideFloatingAtom)
  const handleClick = () => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (guides.guideAttachmentRequestList.length === 1) {
      viewPdf(guides.guideAttachmentRequestList[0])
    } else {
      setAnchorEl(event.currentTarget)
      setOpen(true)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  useEffect(() => {
    setHasGuideFloating(true)
  }, [])

  return (
    <>
      <button className="btn floating" id="guideBtn" onClick={handleClick()}>
        <Icons.FloatingGuideIcon width={20} height={20} />
      </button>
      <PopoverMui
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        shadows="0px 4px 20px 0px #35416533"
        margin="0 0 0 -20px"
        handleClose={handleClose}
      >
        {/* 가이드 팝업 */}
        <GuidePop onClick={handleClose} guides={guides} />
      </PopoverMui>
    </>
  )
}

export default GuideArea
