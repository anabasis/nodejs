/*
    author: 김찬영
    description: 공통 토스트팝업 hooks

    자세한 로직은 ToastPopup 스토리북참조
  => 사용하고자하는 곳의 최상단에서 한번만 ToastPopup 호출합니다 (컴포넌트 마다 임포트할 필요가없음)
*/

import { useCallback, useEffect } from 'react'
import { atom, useAtom } from 'jotai'

export type ToastType = {
  isOpen?: boolean
  icon?: 'success' | 'error' | 'warning'
  autoHideDuration?: number
  content?: string
}

const toastState: ToastType = {}

const toastAtom = atom(toastState)

export const useToastPopup = () => {
  const [toastDataState, setToastlDataState] = useAtom(toastAtom)

  const getToastState = ({ ...toastState }: ToastType) => {
    return {
      ...toastState,
    }
  }

  const toastOpen = useCallback(
    ({ ...toastState }: ToastType) => {
      setToastlDataState((prev) => {
        return {
          ...prev,
          isOpen: true,
          ...toastState,
        }
      })
    },
    [setToastlDataState]
  )

  const toastClose = useCallback(() => {
    setToastlDataState((prev) => {
      return {
        ...prev,
        isOpen: false,
      }
    })
  }, [setToastlDataState])

  return {
    toastDataState,
    toastOpen,
    toastClose,
    getToastState,
  }
}
