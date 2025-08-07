import React, { ChangeEvent, useState } from 'react'

export default {
  title: 'Guide/Round',
  tags: ['autodocs'],
}

export const Default = () => {
  const [value, setValue] = useState(50)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value))
  }

  return (
    <>
      <p className="title1">Radius 조정하는 global Class</p>
      <p className="body2">• Radius는 1px 단위로 정의합니다. 0px ~ 100px까지 정의되어 있습니다.</p>
      <br />
      <div className="align start gap_10">
        <p className="body1 grid1_2">value :</p>
        <input className="sty_ipt" type="number" max={100} value={value} onChange={handleChange} />
      </div>
      <br />
      <br />
      <div
        className={`bg_blue100 white title1 round${value}`}
        style={{ width: '100px', height: '100px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        className:
        <br />
        {`round${value}`}
      </div>
    </>
  )
}
