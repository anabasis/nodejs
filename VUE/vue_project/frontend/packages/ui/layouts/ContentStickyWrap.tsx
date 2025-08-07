import { useRef, useEffect, useState } from 'react'

interface ContentBoxWrapProps {
  children?: React.ReactNode
  className?: string

  position?: number
}

export const ContentStickyWrap = ({ children, position }: ContentBoxWrapProps) => {
  return <div className="sticky_wrap">{children}</div>
}
