import { useModal, useParamsData } from 'library'
import { checkedAtom } from '@store/client/qna'
import { useAtom } from 'jotai'
import { QnaAddInitParamsType, OpenLevelType } from '@type/qna'
import { getQnaSearchMember } from '@api/qna'
import { useEffect, useState } from 'react'

export const usePartially = () => {
  const { modalClose } = useModal()
  const { params, setChangeParams } = useParamsData<QnaAddInitParamsType>()
  const [checkedPrtnUser, setCheckedPrtnUser] = useAtom(checkedAtom)
  const [prtnUserSearchList, setPrtnUserSearchList] = useState<OpenLevelType[]>()
  const [tempChecked, setTempChecked] = useState<OpenLevelType[]>([])
  const [keyword, setKeyWord] = useState('')
  const checkedOnChange = (event: React.ChangeEvent<HTMLInputElement>, item: OpenLevelType) => {
    const checked = event.target.checked

    if (checked) {
      setTempChecked((prev) => [...prev, item])
    }
    if (!checked) {
      setTempChecked((prev) => prev.filter((data) => data?.userUid !== item.userUid))
    }
  }

  const getQnaPartiallyMember = async (type?: string) => {
    try {
      const res = await getQnaSearchMember({ keyword })
      if (type === 'init' && checkedPrtnUser.length > 0) {
        const checkedDefault = res.filter((item) => {
          return checkedPrtnUser.map((el) => el?.userUid).includes(item.userUid)
        })
        setCheckedPrtnUser(checkedDefault)
        setTempChecked(checkedDefault)
      }
      if (res) {
        setPrtnUserSearchList(res)
      }
    } catch (err) {
      console.error(31, err)
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

  const removeChecked = (userUid: string) => {
    setTempChecked((prev) => prev.filter((check) => check?.userUid !== userUid))
  }
  const cancelPartially = () => {
    delete params?.prtnUser
    setChangeParams({ openLevel: 'PRV' })
    modalClose()
  }

  const savePartially = async () => {
    const prtnUser = tempChecked?.map((check: any) => {
      return {
        userUid: check.userUid,
      }
    })
    setChangeParams({ openLevel: 'PTL', prtnUser })
    setCheckedPrtnUser(tempChecked)
    modalClose()
  }

  useEffect(() => {
    getQnaPartiallyMember('init')
  }, [])

  return {
    tempChecked,
    keyword,
    checkedPrtnUser,
    prtnUserSearchList,
    removeChecked,
    onChangeSearch,
    onChangeEnter,
    checkedOnChange,
    savePartially,
    cancelPartially,
  }
}
