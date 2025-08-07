import { RadioBox } from '@ui/components'
import { SelectMui } from '@ui/mui'
import React, { ChangeEvent, useState } from 'react'

export default {
  title: 'Guide/Border',
  tags: ['autodocs'],
}

export const Default = () => {
  const [type, setType] = useState('solid')
  const [value, setValue] = useState(1)
  const [color, setColor] = useState('')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value))
  }
  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value)
  }

  const options = [
    { name: 'blue400', value: 'blue400' },
    { name: 'blue300', value: 'blue300' },
    { name: 'blue200', value: 'blue200' },
    { name: 'blue100', value: 'blue100' },
    { name: 'blue50', value: 'blue50' },
    { name: 'blue10', value: 'blue10' },
    { name: 'navy800', value: 'navy800' },
    { name: 'navy600', value: 'navy600' },
    { name: 'navy400', value: 'navy400' },
    { name: 'navy300', value: 'navy300' },
    { name: 'navy200', value: 'navy200' },
    { name: 'navy100', value: 'navy100' },
    { name: 'navy50', value: 'navy50' },
    { name: 'bg', value: 'bg' },
    { name: 'bg200', value: 'bg200' },
    // Add other color options here...
    { name: 'planning', value: 'planning' },
    { name: 'ordering', value: 'ordering' },
    { name: 'prototype', value: 'prototype' },
    { name: 'validation', value: 'validation' },
    { name: 'followup', value: 'followup' },

    { name: 'saved', value: 'saved' },
    { name: 'unsaved', value: 'unsaved' },
    { name: 'auto', value: 'auto' },
  ]

  return (
    <>
      <p className="title1">외곽선을 조정하는 global Class</p>
      <p className="body2">• Border는 1px 단위로 정의합니다. 1px ~ 10px까지 정의되어 있습니다.</p>
      <p className="body2">• Border는 기본 1px로 설정 기본색상은 검정색입니다.</p>
      <br />
      <div className="align start gap_10">
        <p className="body1 grid1_3">Type :</p>
        <div className="align start gap_4">
          <RadioBox size="sm" onChange={onChangeRadio} defaultChecked id="solid" value="solid" text="solid" name="type" />
          <RadioBox size="sm" onChange={onChangeRadio} id="dashed" value="dashed" text="dashed" name="type" />
          <RadioBox size="sm" onChange={onChangeRadio} id="dotted" value="dotted" text="dotted" name="type" />
          <RadioBox size="sm" onChange={onChangeRadio} id="none" value="none" text="none" name="type" />
        </div>
      </div>
      <br />
      <div className="align start gap_10">
        <p className="body1 grid1_2">Weight :</p>
        <input type="number" className="sty_ipt" min={0} max={10} value={value} onChange={handleChange} />
      </div>
      <br />
      <div className="align start gap_10">
        <p className="body1 grid1_2">Color :</p>
        <SelectMui options={options} value={color} onChange={(e) => setColor(e.target.value)} placeholder="선색" />
      </div>
      <br />
      <div className={`bg_blue100 pd_20 title1 b_${type}${value > 1 ? value : ''} ${color ? `bc_${color}` : ''}`}>
        <p className="white">className: {`b_${type}${value > 1 ? value : ''} ${color ? `bc_${color}` : ''}`}</p>
      </div>
    </>
  )
}
