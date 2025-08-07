/*
    author: 김찬영
    description: 공통 popup hooks

    1. Create : 사용하고자 하는 곳에서 ModalType 기반으로 popupState 데이터 정의
    =>        const popupState: ModalType = {
                   title: 'InquriyModalInputTwo',
                   content: <InquriyModalInputTwo />,
                }
    => 사용하고자하는 곳의 최상단에서 한번만 AlertComponenet를 호출합니다 (컴포넌트 마다 임포트할 필요가없음)
    2. Read : ui폴더에서 사용하는 공통 Modal 컴포넌트에서 usePopup 호출하여 open, close데이터 바인딩 (이미되어있음)
    3. Update : usePopup에서 modalOpen 함수로 modalDataState 업데이트
    4. Delete : usePopup에서 modalClose 함수로  modalDataState 제거
    => 삭제 로직 2가지
    (1). 한개의 모달이 실행될 때  - 나머지 모달을 고려안해도 되므로 빈배열로 초기화
    (2). 두개이상 모달이 실행될 때 - 나머지 모달을 고려해야하니 필터링처리

*/

import { useCallback, useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import { getInfoRender, InfoAlertType } from '../constant/alert'

export type AlertType = {
  isOpen?: boolean
  isLogin?: boolean // 로그인 알럿용 이벤트 추가
  title?: JSX.Element | string // 타입 추가
  content: JSX.Element | string
  textTitle?: JSX.Element | string // 타입 추가
  maxWidth?: 'xs' | 's'
  icon?: 'success' | 'info' | 'warning'
  InfoType?: InfoAlertType
  isAllClose?: boolean // close 버튼외에 X Icon & Out Close control
  handleCloseIcon?: () => void
  isDimNotClose?: boolean // dim 화면 클릭시 close 처리 여부 타입 추가
}

const alertState: AlertType = { title: '', content: '' }

const alertAtom = atom(alertState)
const alertAllCloseAtom = atom(false)
export const useAlert = () => {
  const [alertDataState, setAlertDataState] = useAtom(alertAtom)
  const [alertAllClose, setAlertAllClose] = useAtom(alertAllCloseAtom)
  const initAlertDate = () =>
    setAlertDataState({
      title: '',
      content: '',
    })

  useEffect(() => {
    /* init Modal Date */

    return () => {
      initAlertDate()
      setAlertAllClose(false)
    }
  }, [])

  const alertOpen = useCallback(
    ({ ...alertState }: AlertType) => {
      const infoType = alertState?.InfoType || ''

      if (infoType) {
        setAlertDataState({
          isOpen: true,
          icon: 'info',
          ...alertState,
          ...getInfoRender(infoType),
        })
        return
      }

      setAlertDataState({
        isOpen: true,
        ...alertState,
      })
    },
    [setAlertDataState]
  )

  const alertClose = useCallback(
    (isAllClose?: boolean) => {
      setAlertDataState((prev) => {
        return {
          ...prev,
          isOpen: false,
        }
      })

      if (isAllClose) {
        setAlertAllClose(isAllClose)
      }
    },
    [setAlertDataState]
  )

  return {
    alertDataState,
    alertAllClose,
    setAlertAllClose,
    alertOpen,
    alertClose,
  }
}
