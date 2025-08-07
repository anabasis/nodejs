// 작업자 : 김수연
import type { Meta, StoryObj } from '@storybook/react'
import { RadioBox } from '@ui/components'
import { useState, ChangeEvent } from 'react'
import 'ui/styles/global.scss'

const meta = {
  title: 'Guide/Spacing',
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const Padding = () => {
  const [type, setType] = useState('pd')
  const [value, setValue] = useState(100)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value))
  }

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value)
  }

  return (
    <>
      <p className="title1">padding을 조정하는 global Class</p>
      <p className="body2">• spacing은 1px 단위로 정의합니다. 0px ~ 200px까지 정의되어 있습니다.</p>
      <br />
      <div className="align start gap_10">
        <p className="body1 grid1_3">padding :</p>
        <div className="align start gap_4">
          <RadioBox size="sm" onChange={onChangeRadio} defaultChecked id="pd" value="pd" text="전체" name="padding" />
          <RadioBox size="sm" onChange={onChangeRadio} id="prl" value="prl" text="좌우" name="padding" />
          <RadioBox size="sm" onChange={onChangeRadio} id="ptb" value="ptb" text="상하" name="padding" />
          <RadioBox size="sm" onChange={onChangeRadio} id="pt" value="pt" text="상" name="padding" />
          <RadioBox size="sm" onChange={onChangeRadio} id="pb" value="pb" text="하" name="padding" />
          <RadioBox size="sm" onChange={onChangeRadio} id="pl" value="pl" text="좌" name="padding" />
          <RadioBox size="sm" onChange={onChangeRadio} id="pr" value="pr" text="우" name="padding" />
        </div>
      </div>
      <br />
      <div className="align start gap_10">
        <p className="body1 grid1_2">value :</p>
        <input type="number" max={200} min={0} value={value} onChange={handleChange} />
      </div>
      <br />
      <br />
      <div className={`bg_blue400 white tc title1 ${type}_${value}`}>className : {`${type}_${value}`}</div>
    </>
  )
}

export const Margin = () => {
  const [type, setType] = useState('mt')
  const [value, setValue] = useState(10)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value))
  }

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value)
  }

  return (
    <>
      <p className="title1">Margin 조정하는 global Class</p>
      <p className="body2">• spacing은 1px 단위로 정의합니다. 0px ~ 200px까지 정의되어 있습니다.</p>
      <br />
      <div className="align start gap_10">
        <p className="body1 grid1_3">Margin :</p>
        <div className="align start gap_4">
          <RadioBox size="sm" onChange={onChangeRadio} defaultChecked id="mt" value="mt" text="상" name="margin" />
          <RadioBox size="sm" onChange={onChangeRadio} id="mb" value="mb" text="하" name="margin" />
          <RadioBox size="sm" onChange={onChangeRadio} id="ml" value="ml" text="좌" name="margin" />
          <RadioBox size="sm" onChange={onChangeRadio} id="mr" value="mr" text="우" name="margin" />
          <RadioBox size="sm" onChange={onChangeRadio} id="mtb" value="mtb" text="상하" name="margin" />
          <RadioBox size="sm" onChange={onChangeRadio} id="mlr" value="mlr" text="좌우" name="margin" />
          <RadioBox size="sm" onChange={onChangeRadio} id="mg" value="mg" text="전체" name="margin" />
        </div>
      </div>
      <br />
      <div className="align start gap_10">
        <p className="body1 grid1_2">value :</p>
        <input className="sty_ipt" type="number" min={0} max={200} value={value} onChange={handleChange} />
      </div>
      <br />
      <br />
      <div className={`item bg_blue400 white pd_20 tc title1`}>Item</div>
      <div className={`item bg_blue300 white pd_20 tc title1 ${type}_${value}`}>className : {`${type}_${value}`}</div>
      <div className={`item bg_blue200 white pd_20 tc title1`}>Item</div>
    </>
  )
}

export const Gap = () => {
  const [value, setValue] = useState(0)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value))
  }
  return (
    <>
      <p className="title1">Gap 조정하는 global Class</p>
      <p className="body2">• Gap은 '.align' 클래스를 가진 HTML에서만 동작합니다.</p>
      <p className="body2">• Gap은 1px 단위로 정의합니다. 0px ~ 200px까지 정의되어 있습니다.</p>
      <br />
      <div className="align start gap_10">
        <p className="body1 grid1_4">className :</p>
        <p className="body1">{`gap_${value}`}</p>
      </div>
      <br />
      <div className="align start gap_10">
        <p className="body1 grid1_4">value :</p>
        <input className="sty_ipt" type="number" value={value} min={0} max={200} onChange={handleChange} />
      </div>
      <br />
      <br />
      <div className={`align start gap_${value}`}>
        <div className={`item bg_blue400 white pd_20 tc title1`}>Item</div>
        <div className={`item bg_blue300 white pd_20 tc title1`}>Item</div>
        <div className={`item bg_blue200 white pd_20 tc title1`}>Item</div>
      </div>
    </>
  )
}
