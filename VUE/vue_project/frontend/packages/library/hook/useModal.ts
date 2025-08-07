/*
    author: 김찬영
    description: 공통 modal hooks
    1. Create : 사용하고자 하는 곳에서 ModalType 기반으로 modalState 데이터 정의
    =>        const modalState: ModalType = {
                   title: 'InquriyModalInputTwo',
                   content: <InquriyModalInputTwo />,
                }
    => 사용하고자하는 곳의 최상단에서 한번만 ModalComponenet를 호출합니다 (컴포넌트 마다 임포트할 필요가없음)
    2. Read : ui폴더에서 사용하는 공통 Modal 컴포넌트에서 usePopup 호출하여 open, close데이터 바인딩 (이미되어있음)
    3. Update : usePopup에서 modalOpen 함수로 modalDataState 업데이트
    4. Delete : usePopup에서 modalClose 함수로  modalDataState 제거
    => 삭제 로직 2가지
    (1). 한개의 모달이 실행될 때  - 나머지 모달을 고려안해도 되므로 빈배열로 초기화
    (2). 두개이상 모달이 실행될 때 - 나머지 모달을 고려해야하니 필터링처리

    => 자세한건 ModalComponenet.stories.tsx 스토리북에 가이드 정의됨
*/

import { useCallback, useEffect, useState } from 'react'
import { atom, useAtom, useSetAtom } from 'jotai'

export type DeleteKeyType = number | string

export type ModalType = {
  key?: string
  isOpen?: boolean
  title?: JSX.Element | string // 타입 추가
  content: JSX.Element | string
  contentProps?: any
  textTitle?: JSX.Element | string // 타입 추가
  maxWidth?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'hero' // 사이즈 기준 추가
  preview?: boolean
  linetitle?: boolean
  deleteKey?: DeleteKeyType
  isSubtitle?: boolean | false
  isPrevButton?: boolean | false
  isAllClose?: boolean // close 버튼외에 X Icon & Out Close control
  hideDim?: boolean
  onPrev?: Function
}
const modalState: ModalType[] = []
const modalAtom = atom(modalState)
const modalAllCloseAtom = atom(false)
const historyAtom = atom('')

export const useModal = () => {
  const [locationState, setLocation] = useAtom(historyAtom)
  const [modalDataState, setModalDataState] = useAtom(modalAtom)
  const [modalAllClose, setModalAllClose] = useAtom(modalAllCloseAtom)
  const initModalDate = () => setModalDataState([])

  useEffect(() => {
    setLocation(window.location.href)
    setModalAllClose(false)
    return () => {
      if (window.location.href !== locationState) {
        /* init Modal Date */
        initModalDate()
        setLocation('')
      }
    }
  }, [])

  const modalOpen = useCallback(
    ({ ...modalState }: ModalType) => {
      setModalDataState((prev) => {
        return [...prev, { isOpen: true, ...modalState }]
      })
    },
    [setModalDataState]
  )

  const modalClose = useCallback(
    (deleteKey?: DeleteKeyType, isAllClose?: boolean) => {
      if (!deleteKey || modalDataState.length === 1) {
        initModalDate()
      } else {
        setModalDataState((prev) => prev.filter((modal: ModalType) => modal.deleteKey !== deleteKey))
      }
      if (isAllClose) {
        setModalAllClose(isAllClose)
      } else {
        setModalAllClose(false)
      }
    },

    [modalDataState, setModalDataState]
  )

  const modalUpdate = useCallback(
    (deleteKey: DeleteKeyType, options: { title?: JSX.Element | string; textTitle?: JSX.Element | string }) => {
      setModalDataState((prev) => prev.map((modal: ModalType) => (modal.deleteKey === deleteKey ? { ...modal, ...options } : modal)))
    },
    [setModalDataState]
  )

  return {
    modalAllClose,
    modalDataState,
    modalOpen,
    modalClose,
    modalUpdate,
  }
}
