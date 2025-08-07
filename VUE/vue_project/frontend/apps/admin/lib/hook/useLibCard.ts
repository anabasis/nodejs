import { useState, useEffect } from 'react'
import { atom, useAtom, useAtomValue } from 'jotai'
import { isPluseEditAtom, getCardIdsIdsAtom } from '@store/client/library'
import { useMenu, checkAllTrim, initDataWithRes } from 'library'
import { usePathname, useRouter } from 'next/navigation'
import { LibraryManualAddParamsType, LibraryManualContentType } from '@type/library'
import { useLibraryMuate } from '@store/server/useLibraryQuery'
const initData = {
  titl: '',
  descrp: '',
  imageFileName: '',
}
const initSelectIconData = {
  name: '',
}
const selectAtom = atom<{ name: string; librCatNum?: number }[]>([initSelectIconData])

export const useLibCard = (manual?: LibraryManualContentType) => {
  const router = useRouter()
  const { getPathInfo } = useMenu()
  const pathname = usePathname()
  const isRegister = !manual?.librCatNum
  const [cardParams, setCardParams] = useState(manual ? (initDataWithRes(initData, manual) as LibraryManualAddParamsType) : initData)
  const [editPlus, setEditPlus] = useAtom(isPluseEditAtom)
  const [isEdit, setIsEdit] = useState(false)
  const getCardIds = useAtomValue(getCardIdsIdsAtom)
  const [selectedIcon, setSelectedIcon] = useAtom(selectAtom)
  const { libraryAddMutate, libraryDeleteMutate, libraryEditMutate } = useLibraryMuate()
  const moveListPage = () => {
    if (!isEdit && manual) router.push(`/library/list?manualsId=${manual?.librCatNum}&title=${manual.titl}`)
  }

  const onChangeCardParam = (event, type) => {
    setCardParams((prev) => {
      return {
        ...prev,
        [type]: event.target.value,
      }
    })
  }

  const dragClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (getPathInfo(pathname).crtYn !== 'Y') {
      return
    }
    // setIsEdit(true)
  }

  const editClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (getPathInfo(pathname).crtYn !== 'Y') {
      return
    }
    setIsEdit(true)
  }

  const validationManual = () => {
    return !checkAllTrim({ titl: cardParams.titl, desc: cardParams.descrp })
  }

  const deleteCard = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (getPathInfo(pathname).crtYn !== 'Y') {
      return
    }
    libraryDeleteMutate({ manualsId: manual?.librCatNum })
  }

  const registerCard = () => {
    const params = {
      ...cardParams,
      imageFileName: selectedIcon[0]?.name,
      sortNum: 0,
    }

    libraryAddMutate({ params })
  }

  const editCard = () => {
    const { titl, descrp } = cardParams
    const selectedIconName = selectedIcon?.filter((lib) => lib?.librCatNum === manual?.librCatNum)[0]?.name

    if (manual.titl === titl && manual.descrp === descrp && (!selectedIconName || manual.imageFileName === selectedIconName)) {
      setIsEdit(false)
      return
    }

    const params = {
      ...cardParams,
      imageFileName: selectedIconName || manual?.imageFileName,
      librCatNum: manual.librCatNum,
    }

    libraryEditMutate({ params })
    setIsEdit(false)
  }

  const saveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (getPathInfo(pathname).crtYn !== 'Y') {
      return
    }
    const selectedIconName = selectedIcon?.filter((lib) => lib?.librCatNum === manual?.librCatNum)[0]?.name
    setCardParams((prev) => {
      return {
        ...prev,
        imageFileName: selectedIconName || manual?.imageFileName,
      }
    })

    /* 반 값일땐 초기로 돌아감 */
    if (validationManual()) {
      setCardParams({
        titl: manual?.titl || '',
        descrp: manual?.descrp || '',
        imageFileName: manual?.imageFileName || '',
      })

      isRegister && setSelectedIcon([initSelectIconData])
      isRegister && setEditPlus(false)
      setIsEdit(false)

      return
    }

    /* 최초등록시 저장로직 */
    if (isRegister) {
      registerCard()
      setEditPlus(false)

      return
    }

    /* 수정시 로직 */
    editCard()
  }

  return {
    editPlus,
    selectedIcon,
    isEdit,
    cardParams,
    getCardIds,
    deleteCard,
    setSelectedIcon,
    setEditPlus,
    setCardParams,
    dragClick,
    editClick,
    saveClick,
    moveListPage,
    onChangeCardParam,
  }
}
