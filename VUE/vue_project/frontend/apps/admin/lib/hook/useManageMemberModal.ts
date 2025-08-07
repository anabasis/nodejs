import { useModal, useToastPopup } from 'library'
import { useSetAtom } from 'jotai'
import { getQnaCateModuleManager } from '@api/qna'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { checkedAtom } from '@store/client/qna'
import { QnaManageMeberListType } from '@type/qna'
import { useQnaMuate } from '@store/server/useQnaQuery'

export const useManageMemberModal = () => {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const moduleVal = searchParams.get('module')
  const { modalClose } = useModal()
  const setCheckedItem = useSetAtom(checkedAtom)
  const [checkedManagerMember, setCheckedManagerMember] = useState<QnaManageMeberListType[]>([])
  const [qnaUserMemeberList, setQnaUserMemeberList] = useState<QnaManageMeberListType[]>()
  const [keyword, setKeyWord] = useState('')
  const { toastOpen, getToastState } = useToastPopup()
  const { addQnaManagerMutate } = useQnaMuate()

  const checkedOnChange = (event: React.ChangeEvent<HTMLInputElement>, item: QnaManageMeberListType) => {
    const checked = event.target.checked
    if (checked) {
      setCheckedManagerMember((prev) => [...prev, { ...item }])
    } else {
      setCheckedManagerMember((prev) => prev.filter((data) => data.usrUid !== item.usrUid))
    }
  }

  const getQnaPartiallyMember = async () => {
    try {
      const res = await getQnaCateModuleManager({ keyword, category, module: moduleVal })
      if (res) {
        setQnaUserMemeberList(res)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onChangeEnter = (event: React.KeyboardEvent<HTMLInputElement>, key?: string) => {
    if (event.key === 'Enter') {
      getQnaPartiallyMember()
    }
  }

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.target.value)
  }

  const cancel = () => {
    setCheckedManagerMember([])
    modalClose()
  }

  const removeChecked = (usrUid: string) => {
    setCheckedManagerMember((prev) => prev.filter((check) => check?.usrUid !== usrUid))
  }

  const addQnaManager = () => {
    addQnaManagerMutate(
      {
        category,
        module: moduleVal,
        usrUid: checkedManagerMember.map((user) => {
          return {
            usrUid: user.usrUid,
          }
        }),
      },
      {
        onSuccess: () => {
          toastOpen(getToastState({ content: 'Successfully Saved.', icon: 'success' }))
          setCheckedItem([])
          modalClose()
        },
      }
    )
  }

  const save = async () => {
    addQnaManager()
  }

  useEffect(() => {
    getQnaPartiallyMember()
  }, [])

  return {
    keyword,
    qnaUserMemeberList,
    checkedManagerMember,
    getQnaPartiallyMember,
    checkedOnChange,
    onChangeEnter,
    onChangeSearch,
    cancel,
    removeChecked,
    save,
  }
}
