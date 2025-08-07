// 작업자 : 김병기 (공통 수정 : 최유희)

import type { Meta, StoryObj } from '@storybook/react'
import React, { useEffect, useState } from 'react'
import { BoardTable, DetailTable, Badge, TooltipHover, ModalComponenet, SelectMui } from 'ui'
import { ButtonMui } from 'ui'
import { useModal, ModalType } from 'library/hook/useModal'
import NextStpeModal from '../dummy/modal/NextStepModal'
import Content from '../dummy/modal/Content'
import Content3 from '../dummy/modal/Content3'
import { Content5, Content6, Content7 } from '../dummy/modal/Content5'
import { Header1, Header2 } from '../dummy/modal/Header'

const meta = {
  title: 'Mui/Popup/ModalComponenet',
  component: ModalComponenet,
  tags: ['autodocs'],
  parameters: {
    position: {
      default: 'bg',
      values: [{ name: 'bg', value: 'relative' }],
    },
  },
  argTypes: {
    maxWidth: {
      description: '사이즈 기준 <br/> m: 700px <br/> l: 770px (default) <br/> xl: 1100px',
      control: {
        type: 'select',
      },
      options: ['m', 'l', 'xl'],
    },
    preview: {
      description: '미리보기 팝업 케이스 일 때',
      control: {
        type: 'boolean',
      },
    },
    linetitle: {
      description: '타이틀 영역 하단에 라인이 필요할 때',
      control: {
        type: 'boolean',
      },
    },
    title: {
      description: '팝업 내 대타이틀 영역에 들어갈 텍스트',
      control: {
        type: 'text',
      },
    },
    textTitle: {
      description: '팝업 내 타이틀 영역 하단에 들어갈 텍스트',
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof ModalComponenet>

export default meta
type Story = StoryObj<typeof meta>

export const Default = (args) => {
  const { modalOpen, modalClose } = useModal()
  const modalState: ModalType = {
    title: '팝업 타이틀이 있을경우',
    textTitle: '타이틀 하단의 텍스트가 존재시 사용합니다.',
    icon: 'info',
    maxWidth: '', // default: 'l' (etc: m, l, xl)
    content: (
      <>
        <div>molecules 및 팝업 컨텐츠가 들어가는 공간입니다.</div>

        {/* 하단 버튼 예제 */}
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose()}>
            취소
          </ButtonMui>
          <ButtonMui size="xlarge">버튼</ButtonMui>
        </div>
      </>
    ),
    ...args, // 페이지 작업시에는 빼주세요
  }

  return (
    <>
      <button onClick={() => modalOpen(modalState)}>Open dialog</button>
      <ModalComponenet />
    </>
  )
}

// 미리보기형 팝업 케이스
export const Preview = () => {
  const { modalOpen, modalClose } = useModal()
  const modalState: ModalType = {
    title: '팝업 타이틀이 있을경우',
    textTitle: '타이틀 하단의 텍스트가 존재시 사용합니다.',
    maxWidth: 'xl',
    preview: true,
    content: <div style={{ height: '700px' }}>Preview가 들어가는 공간입니다.</div>,
  }

  return (
    <>
      <button onClick={() => modalOpen(modalState)}>Open dialog</button>
      <ModalComponenet />
    </>
  )
}

export const FormPopup = () => {
  const { modalOpen, modalClose } = useModal()
  const modalState: ModalType = {
    title: '폼 타입 팝업',
    textTitle: '팝업 내 폼요소가 들어갈 경우에 사용합니다.',
    maxWidth: 'm',
    content: (
      <>
        <p className="title1 mb_20">나는 타이틀입니다.</p>
        <DetailTable
          colgroup={
            <colgroup>
              <col width="30%" />
              <col width="70%" />
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
          <ButtonMui size="xlarge">버튼</ButtonMui>
        </div>
      </>
    ),
  }

  return (
    <>
      <button onClick={() => modalOpen(modalState)}>Open dialog</button>
      <ModalComponenet />
    </>
  )
}

export const ListPopup = () => {
  const { modalOpen, modalClose } = useModal()
  const modalState: ModalType = {
    title: '리스트 타입 팝업',
    textTitle: '리스트 테이블이 들어갈 경우에는 이렇게...',
    content: (
      <>
        <p className="title1 mb_20">나는 타이틀입니다.</p>
        <BoardTable>
          <colgroup>
            <col width="30%" />
            <col width="30%" />
            <col width="30%" />
          </colgroup>
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

        {/* 하단 버튼 예제 */}
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose()}>
            취소
          </ButtonMui>
          <ButtonMui size="xlarge">버튼</ButtonMui>
        </div>
      </>
    ),
  }

  return (
    <>
      <button onClick={() => modalOpen(modalState)}>Open dialog</button>
      <ModalComponenet />
    </>
  )
}

export const BottomSticky = () => {
  const { modalOpen, modalClose } = useModal()
  const modalState: ModalType = {
    title: '하단 고정',
    content: (
      <>
        <p className="title1 mb_20">나는 타이틀입니다.</p>
        <BoardTable>
          <colgroup>
            <col width="30%" />
            <col width="30%" />
            <col width="30%" />
          </colgroup>
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
        <BoardTable>
          <colgroup>
            <col width="30%" />
            <col width="30%" />
            <col width="30%" />
          </colgroup>
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

        {/* 하단 버튼 예제 */}
        <div className={`align center pt_30 ${styles.modal_bottom_sticky}`}>
          <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose()}>
            취소
          </ButtonMui>
          <ButtonMui size="xlarge">버튼</ButtonMui>
        </div>
      </>
    ),
  }

  return (
    <>
      <button onClick={() => modalOpen(modalState)}>Open dialog</button>
      <ModalComponenet />
    </>
  )
}

export const TitleCustomCase = () => {
  const { modalOpen, modalClose } = useModal()
  const modalState: ModalType = {
    title: (
      <>
        <span className="align start">
          <span className="mr_8">타이틀 이렇게도 됩니더</span>
          <Badge uiType="solid" color="blue" style="count">
            10
          </Badge>
        </span>
      </>
    ),
    textTitle: (
      <>
        <span className="align start">
          <span className="body1 typo500">서브타이틀도 이렇게 됩니더</span>
          <TooltipHover>툴팁 가져오는 케이스..</TooltipHover>
        </span>
      </>
    ),
    content: (
      <>
        {/* 하단 버튼 예제 */}
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose()}>
            취소
          </ButtonMui>
          <ButtonMui size="xlarge">버튼</ButtonMui>
        </div>
      </>
    ),
  }

  return (
    <>
      <button onClick={() => modalOpen(modalState)}>Open dialog</button>
      <ModalComponenet />
    </>
  )
}

export const MutilModalCase = () => {
  const { modalOpen, modalClose } = useModal()

  const modalState: ModalType = {
    title: '폼 타입 팝업',
    textTitle: '2번 팝업 내 폼요소가 들어갈 경우에 사용합니다.!!!!!',
    maxWidth: 'm',
    content: <Content modalClose={modalClose} modalOpen={modalOpen} />,
  }

  return (
    <>
      <ButtonMui onClick={() => modalOpen(modalState)}>button</ButtonMui>
      <ModalComponenet />
    </>
  )
}

export const NextModalCase = () => {
  const { modalOpen, modalClose } = useModal()

  const modalState: ModalType = {
    deleteKey: 0,
    title: '폼 타입 팝업',
    textTitle: '팝업 내 폼요소가 들어갈 경우에 사용합니다.',
    maxWidth: 'm',
    content: <Content3 modalClose={modalClose} modalOpen={modalOpen} />,
  }

  return (
    <>
      <ButtonMui onClick={() => modalOpen(modalState)}>button</ButtonMui>
      <ModalComponenet />
    </>
  )
}

export const NextModalMappingCase = () => {
  const { modalOpen, modalClose } = useModal()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [update, setUpdate] = useState(false)

  const contentObj = {
    header: {
      1: <Header1 currentIndex={currentIndex} />,
      2: <Header2 currentIndex={currentIndex} />,
      3: <Header1 currentIndex={currentIndex} />,
    },
    content: {
      1: <Content5 setCurrentIndex={setCurrentIndex} />,
      2: <Content6 setCurrentIndex={setCurrentIndex} setUpdate={setUpdate} />,
      3: <Content7 setCurrentIndex={setCurrentIndex} setUpdate={setUpdate} />,
    },
  }

  const getModalHandler = () => {
    modalClose(currentIndex)
    const modalState = getModalState(currentIndex)
    modalOpen(modalState)
  }

  const getModalState = (currentStep) => {
    const modalState: ModalType = {
      deleteKey: currentStep,
      title: contentObj.header[currentStep],
      content: contentObj.content[currentStep],
    }
    return modalState
  }

  useEffect(() => {
    if (currentIndex > 0) {
      getModalHandler()
    }
  }, [currentIndex, update])

  return (
    <>
      <ButtonMui onClick={() => modalOpen(getModalState(1))}>button</ButtonMui>
      <ModalComponenet />
    </>
  )
}

export const NextModalMappingCaseTwo = () => {
  return (
    <>
      <NextStpeModal />
      <ModalComponenet />
    </>
  )
}
