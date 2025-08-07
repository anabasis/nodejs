// 작업자 : 김병기 (공통 수정 : 최유희)

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { AlertComponenet } from 'ui'
import { ButtonMui } from 'ui'
import { useAlert, AlertType } from 'library/hook/useAlert'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Mui/Popup/AlertComponenet',
  component: AlertComponenet,
  tags: ['autodocs'],
  parameters: {
    position: {
      default: 'bg',
      values: [{ name: 'bg', value: 'relative' }],
    },
  },
  argTypes: {
    maxWidth: {
      description: '사이즈 기준 (xs: default) <br/> xs: 460px <br/> s: 570px ',
      control: {
        type: 'select',
      },
      options: ['xs', 's'],
    },
    icon: {
      description: '팝업 내 아이콘 영역에 들어갈 아이콘',
      control: {
        type: 'select',
      },
      options: ['success', 'info', 'warning'],
    },
    InfoType: {
      description: '공통 Info 알럿 props',
      control: {
        type: 'select',
      },
      options: ['cancel', 'writing', 'delete'],
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
} satisfies Meta<typeof AlertComponenet>

export default meta

type Story = StoryObj<typeof meta>

export const Default = (arg: any) => {
  const { alertOpen, alertClose } = useAlert()
  const modalState: AlertType = {
    title: '팝업 타이틀이 있을경우',
    textTitle: '텍스트의 타이틀이 있을경우',
    maxWidth: '', // maxwidth 없을 시 기본값 적용 (xs)
    icon: 'info',
    content: (
      // 버튼 센터 정렬 및 마진 class 입니다.
      <div className="align center mt_30">
        {/* 팝업의 버튼은 xlarge 사이즈 입니다.  */}
        <ButtonMui type="outlined" size="xlarge" onClick={alertClose}>
          취소
        </ButtonMui>
        <ButtonMui size="xlarge">버튼</ButtonMui>
      </div>
    ),
    ...arg,
  }
  return (
    <>
      <button onClick={() => alertOpen(modalState)}>Open dialog</button>
      <AlertComponenet />
    </>
  )
}

export const TitleOnly = () => {
  const { alertOpen } = useAlert()
  const modalState: AlertType = {
    title: '팝업 타이틀만 있을경우',
    //isLogin: true,
    content: <></>,
  }
  return (
    <>
      <button onClick={() => alertOpen(modalState)}>Open dialog</button>
      <AlertComponenet />
    </>
  )
}

export const TextTitle = () => {
  const { alertOpen } = useAlert()
  const modalState: AlertType = {
    title: '팝업 타이틀 + 서브타이틀',
    textTitle: '나는 서브타이틀',
    content: <></>,
  }
  return (
    <>
      <button onClick={() => alertOpen(modalState)}>Open dialog</button>
      <AlertComponenet />
    </>
  )
}

export const AlertInButton = () => {
  const { alertOpen } = useAlert()
  const modalState: AlertType = {
    title: '팝업 타이틀이 있을경우',
    textTitle: '텍스트의 타이틀이 있을경우',
    content: (
      <>
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge">
            취소
          </ButtonMui>
          <ButtonMui size="xlarge">버튼</ButtonMui>
        </div>
      </>
    ),
  }
  return (
    <>
      <button onClick={() => alertOpen(modalState)}>Open dialog</button>
      <AlertComponenet />
    </>
  )
}

export const IconSuccess = () => {
  const { alertOpen } = useAlert()
  const modalState: AlertType = {
    icon: 'success',
    title: '완료 및 저장',
    textTitle: '뭐시기를 완료했슴당',
    content: <>{/* 팝업 컨텐츠 영역 */}</>,
  }

  return (
    <>
      <button onClick={() => alertOpen(modalState)}>Open dialog</button>
      <AlertComponenet />
    </>
  )
}

export const IconInfo = () => {
  const { alertOpen } = useAlert()
  const modalState: AlertType = {
    icon: 'info',
    title: '액션 및 정보 재확인',
    textTitle: (
      <>
        {/* 아래처럼 사용 가능 */}
        <span>
          탈퇴하시면, 개발 시스템에서 진행했던 <br />
          개발 프로젝트와 개발 문서를 확인할 수 없습니다.
        </span>
      </>
    ),
    content: <></>,
  }

  return (
    <>
      <button onClick={() => alertOpen(modalState)}>Open dialog</button>
      <AlertComponenet />
    </>
  )
}

export const IconWarning = () => {
  const { alertOpen } = useAlert()
  const modalState: AlertType = {
    icon: 'warning',
    title: '문제 발생 or 실패',
    textTitle: '뭐시기를 실패했습니당',
    content: <></>,
  }

  return (
    <>
      <button onClick={() => alertOpen(modalState)}>Open dialog</button>
      <AlertComponenet />
    </>
  )
}

export const SizeSmall = () => {
  const { alertOpen, alertClose } = useAlert()
  const modalState: AlertType = {
    title: '팝업 타이틀이 있을경우',
    textTitle: '타이틀 하단의 텍스트가 존재시 사용합니다.',
    icon: 'info',
    maxWidth: 's', // xs 보다 조금 커요
    content: (
      <>
        <div>{/* 컨텐츠 필요시 적용 */}</div>
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            취소
          </ButtonMui>
          <ButtonMui size="xlarge">버튼</ButtonMui>
        </div>
      </>
    ),
  }
  return (
    <>
      <button onClick={() => alertOpen(modalState)}>Open dialog</button>
      <AlertComponenet />
    </>
  )
}

export const CommonAlert = (arg: any) => {
  const { alertOpen, alertClose } = useAlert()
  const test = () => {}
  const cancel = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => test()}>
            OK
          </ButtonMui>
        </div>
      ),
      ...arg,
    }
    alertOpen(alertState)
  }
  return (
    <>
      <ButtonMui type="outlined" size="small" onClick={cancel}>
        Cancel
      </ButtonMui>
      <AlertComponenet />
    </>
  )
}
