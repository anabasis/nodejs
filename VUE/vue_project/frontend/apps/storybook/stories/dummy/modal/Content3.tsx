import { ModalType } from 'library/hook/useModal'
import React, { useState } from 'react'
import { BaseInput, BoardTable, ButtonMui } from 'ui'

const Content4 = ({ modalClose }) => {
  return (
    <>
      <BoardTable>
        <thead>
          <tr>
            <th>타이틀</th>
            <th>타이틀</th>
            <th>타이틀</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>블라블라</td>
            <td>블라블라</td>
            <td>블라블라</td>
          </tr>
          <tr>
            <td>블라블라</td>
            <td>블라블라</td>
            <td>블라블라</td>
          </tr>
        </tbody>
      </BoardTable>
      <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose(1)}>
        취소
      </ButtonMui>
    </>
  )
}

const Content3 = ({ modalClose, modalOpen }) => {
  const getModal = () => {
    modalClose(0)
    const modalState: ModalType = {
      title: '폼 타입 팝업',
      deleteKey: 1,
      textTitle: '팝업 내 폼요소가 들어갈 경우에 사용합니다.',
      maxWidth: 'm',
      content: (
        <>
          <Content4 modalClose={modalClose} />
        </>
      ),
    }

    modalOpen(modalState)
  }

  const [value, setValue] = useState('')
  return (
    <>
      <BaseInput onChange={(e) => setValue(e.target.value)} />
      <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose(0)}>
        취소
      </ButtonMui>
      <ButtonMui type="outlined" size="xlarge" onClick={() => getModal()}>
        확인
      </ButtonMui>
    </>
  )
}

export default Content3
