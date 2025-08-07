import { useState } from 'react'
import { useToastPopup } from './useToastPopup'

export const useMosueHoverCopy = () => {
  const [isHovering, setIsHovering] = useState(false)
  const { toastOpen, getToastState } = useToastPopup()
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toastOpen(getToastState({ content: 'URL has been copied.', icon: 'success' }))
    } catch (e) {
      toastOpen(getToastState({ content: 'Failed', icon: 'error' }))
    }
  }

  return {
    handleCopyClipBoard,
    isHovering,
    handleMouseEnter,
    handleMouseLeave,
  }
}
