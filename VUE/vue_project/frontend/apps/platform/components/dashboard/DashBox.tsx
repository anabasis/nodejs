'use client'

import React from 'react'

interface DashBoxProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export const DashBox = ({ title, children, className }: DashBoxProps) => {
  return (
    <div className={`bg_second50 round8 ptb_24 plr_24 ps_re  ${className || ''}`}>
      <h4 className="title1 navy400">{title}</h4>
      <div className="chart_inner ps_re">{children}</div>
    </div>
  )
}

export default DashBox
