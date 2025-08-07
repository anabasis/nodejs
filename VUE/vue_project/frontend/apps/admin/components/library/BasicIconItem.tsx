import React from 'react'
import { IconButtonPropsType } from '@type/library'

const BasicIconItem = ({ componenet, changeIcon, ...others }: IconButtonPropsType) => {
  const { fill, id, active } = others
  const className = `bg_icon_box ${active ? 'active' : 'gray'}`

  // active 되었을때 아이콘 색상 변경
  const activeFill = active ? '#9D9FFE' : '#A2ADC1'

  return (
    <>
      <button className={className} onClick={() => changeIcon(id)}>
        {componenet && React.createElement(componenet, { width: 32, height: 32, fill: activeFill, icofill: activeFill })}
      </button>
    </>
  )
}

export default BasicIconItem
