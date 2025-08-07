import { ModalType } from 'library/hook/useModal'
import React, { useState } from 'react'
import { ButtonMui, BaseInput, SelectMui, DetailTable } from 'ui'

const Content2 = ({ setValue, modalClose }) => {
  return (
    <>
      <p>content1에서 설정한 컴포넌트!</p>
      <BaseInput onChange={(e) => setValue(e.target.value)} />
      <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose(1)}>
        취소
      </ButtonMui>
    </>
  )
}

const Content = ({ modalOpen, modalClose }) => {
  const [value, setValue] = useState('')
  const modalState: ModalType = {
    title: '폼 타입 팝업',
    textTitle: '팝업 내 폼요소가 들어갈 경우에 사용합니다.',
    maxWidth: 'm',
    deleteKey: 1,
    content: <Content2 setValue={setValue} modalClose={modalClose} />,
  }
  return (
    <>
      <p className="title1 mb_20">나는 타이틀입니다.</p>
      {value}
      <DetailTable
        colgroup={
          <colgroup>
            <col width="20%" />
            <col width="*" />
          </colgroup>
        }
      >
        <tr>
          <th>
            {/* 필수값 예시 */}
            <span className="required">타이틀</span>
          </th>
          <td>블라블라 이런건 DetailTable 을 갖다써주세요</td>
        </tr>
        <tr>
          <th>타이틀</th>
          <td>
            {/* 폼요소 예시 */}
            <SelectMui size="full" options={[]} />
          </td>
        </tr>
      </DetailTable>

      {/* 하단 버튼 예제 */}
      <div className="align center mt_30">
        <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose()}>
          취소
        </ButtonMui>
        <ButtonMui size="xlarge" onClick={() => modalOpen(modalState)}>
          버튼
        </ButtonMui>
      </div>
    </>
  )
}

export default Content
